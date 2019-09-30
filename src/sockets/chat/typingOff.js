import {pushSocketIdToArray, emitNotifyToArray, removeSocketIdFromArray} from "../../helpers/socketHelper";

/**
 * 
 * @param {*} io from socket.io
 */

let acceptRequestContact = (io) => {
    let clients = {};
    io.on('connection', function(socket) {
        clients = pushSocketIdToArray(clients, socket.request.user._id, socket.id);

        socket.on('user-is-not-typing', (data) => {
            if(data.groupId) {
                let response = {
                    currentUserId: socket.request.user._id,
                    currentGroupId: data.groupId
                };
                if(clients[data.groupId]) {
                    emitNotifyToArray(clients, data.groupId, io, "response-user-is-not-typing", response);
                }
            } else {
                let response = {
                    currentUserId: socket.request.user._id
                };
                if(clients[data.contactId]) {
                    emitNotifyToArray(clients, data.contactId, io, "response-user-is-not-typing", response);
                }
            }
        });

        socket.on('disconnect', () => {
            clients = removeSocketIdFromArray(clients, socket.request.user._id, socket);
        });
    });
}

module.exports = acceptRequestContact;