const Meme = require('../models/Meme');
const {removeSubscriber, addSubscriber, notifySubscribers} = require('../configs/subscribers');

exports.createMeme = async (req, res) => {
    const {name, url, caption} = req.body;
    try {
        const meme = await Meme.create({name, url, caption});
        notifySubscribers(meme);
        res.status(201).json({id: meme.id});
    } catch (e) {
        if (e.name === "SequelizeUniqueConstraintError" || e.name === "SequelizeValidationError") {
            res.status(400).json({message: e.errors?.[0].message ?? "Invalid JSON sent"});
            return;
        }
        console.error(JSON.stringify(e, null, 2));
        res.status(500).json({message: "An unknown error occurred"});
    }
}

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

exports.updateMeme = async (req, res) => {
    const {id} = req.params;

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
        if (e.name === "SequelizeUniqueConstraintError" || e.name === "SequelizeValidationError") {
            res.status(400).json({message: e.errors?.[0].message ?? "Invalid JSON sent"});
            return;
        }
        console.error(JSON.stringify(e, null, 2));
        res.status(500).json({message: "An unknown error occurred"});
    }
}

exports.deleteMeme = async (req, res) => {
    const {id} = req.params;
    await Meme.destroy({
        where: {
            id: id,
        }
    });
    res.sendStatus(204);
}

exports.subscribe = (req, res) => {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    res.writeHead(200, headers);

    const clientId = Date.now();
    const newClient = {
        id: clientId,
        res
    };
    addSubscriber(newClient);
    req.on('close', () => {
        console.log(`${clientId} Connection closed`);
        removeSubscriber(clientId);
    });
}