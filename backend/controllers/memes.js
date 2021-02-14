const Meme = require('../models/Meme');
const {removeSubscriber, addSubscriber, notifySubscribers} = require('../configs/subscribers');

/**
 * Adds a meme to the db ant notifies the subscribers
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @return {Promise<void>}
 */
exports.createMeme = async (req, res) => {
    const {name, url, caption} = req.body;
    try {
        const meme = await Meme.create({name, url, caption});

        // Notify the subscribers
        notifySubscribers(meme);

        res.status(201).json({id: meme.id});
    } catch (e) {
        if (e.name === "SequelizeUniqueConstraintError") {
            res.status(409).json({message: e.errors?.[0].message ?? "Meme already exists"});
            return;
        }
        if (e.name === "SequelizeValidationError") {
            res.status(400).json({message: e.errors?.[0].message ?? "Invalid JSON sent"});
            return;
        }
        console.error(JSON.stringify(e, null, 2));
        res.status(500).json({message: "An unknown error occurred"});
    }
}

/**
 * List all the memes the db
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @return {Promise<void>}
 */
exports.listMemes = async (_, res) => {
    const memes = await Meme.findAll({
        attributes: ['id', 'name', 'caption', 'url'],
        order: [
            ['createdAt', 'DESC'],
        ],
        limit: 100,
    });
    res.json(memes);
}

/**
 * Retrieve a meme from the db
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @return {Promise<void>}
 */
exports.retrieveMeme = async (req, res) => {
    const {id} = req.params;
    const meme = await Meme.findByPk(id, {
        attributes: ['id', 'name', 'caption', 'url'],
    });
    if (meme === null) {
        res.sendStatus(404);
        return;
    }
    res.json(meme);
}

/**
 * Update a meme in the db
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @return {Promise<void>}
 */
exports.updateMeme = async (req, res) => {
    const {id} = req.params;

    // Check if the meme exists: because the update method won't throw error even if the item not found
    const meme = await Meme.findByPk(id);
    if (meme === null) {
        res.sendStatus(404);
        return;
    }

    try {
        await Meme.update(req.body, {
            where: {
                id: id,
            }
        });
        res.sendStatus(204);
    } catch (e) {
        if (e.name === "SequelizeUniqueConstraintError") {
            res.status(409).json({message: e.errors?.[0].message ?? "Meme already exists"});
            return;
        }
        if (e.name === "SequelizeValidationError") {
            res.status(400).json({message: e.errors?.[0].message ?? "Invalid JSON sent"});
            return;
        }
        console.error(JSON.stringify(e, null, 2));
        res.status(500).json({message: "An unknown error occurred"});
    }
}

/**
 * Delete a meme from the db
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @return {Promise<void>}
 */
exports.deleteMeme = async (req, res) => {
    const {id} = req.params;
    await Meme.destroy({
        where: {
            id: id,
        }
    });
    res.sendStatus(204);
}

/**
 * Subscribe to Meme's stream
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @return {Promise<void>}
 */
exports.subscribe = (req, res) => {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache',
        "access-control-allow-origin": req.headers.origin,
    };
    res.writeHead(200, headers);

    // TO send headers right away
    res.write(`data: ${JSON.stringify({})}\n\n`)

    // New client Object
    const clientId = Date.now();
    const newClient = {
        id: clientId,
        res
    };

    // Adding the subscriber
    addSubscriber(newClient);

    // Remove the subscription as soon as the request is closed
    req.on('close', () => {
        removeSubscriber(clientId);
    });
}