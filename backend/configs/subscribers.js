let subscribers = [];

function addSubscriber(client) {
    subscribers.push(client);
}

function removeSubscriber(clientID) {
    subscribers = subscribers.filter(client => client.id !== clientID);
}

function notifySubscribers(data) {
    subscribers.forEach(s => s.res.write(`data: ${JSON.stringify(data)}\n\n`));
}

module.exports = {subscribers, addSubscriber, removeSubscriber, notifySubscribers};