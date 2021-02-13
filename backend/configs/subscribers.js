/**
 * Array of connected clients
 * @type {{
 *     id: number,
 *     res: any
 * }[]} - Object representing the client
 */
let subscribers = [];

/**
 * Adds a client to subscribers' array
 * @param {{
 *     id: number,
 *     res: any
 * }} client - The new client object
 * @return {void}
 */
function addSubscriber(client) {
    subscribers.push(client);
}

/**
 * Removes a subscriber from the array
 * @param {number} clientID  - The client to be removed
 * @return {void}
 */
function removeSubscriber(clientID) {
    subscribers = subscribers.filter(client => client.id !== clientID);
}

/**
 * Notify all the subscribers
 * @param {Object<any>} data - Data to be sent to the subscribers
 * @return {void}
 */
function notifySubscribers(data) {
    subscribers.forEach(s => s.res.write(`data: ${JSON.stringify(data)}\n\n`));
}

/**
 * Exporting the variable and functions
 */
module.exports = {subscribers, addSubscriber, removeSubscriber, notifySubscribers};