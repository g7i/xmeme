/**
 * To test if the server is working fine
 * @param {any} req
 * @param {any} res
 */
module.exports = (req, res) => {
    res.json({message: "Pong"});
}