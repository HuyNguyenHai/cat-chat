import {pushSocketIdToArray, emitNotifyToArray, removeSocketIdFromArray} from "../../helpers/socketHelper";

/**
 * 
 * @param {*} io from socket.io
 */

let acceptRequestContact = (io) => {
    let clients = {};
    io.on('connection', function(socket) {
        clients = pushSocketIdToArray(clients, socket.request.user._id, socket.id);

        socket.on('accept-request-contact', (data) => {
            let currentUser = {
                user: socket.request.user.user,
                avatar: socket.request.user.avatar,
                id: socket.request.user._id,
                address: socket.request.user.address
            };
            //emit notification to usr
            if(clients[data.contactId]) {
                emitNotifyToArray(clients, data.contactId, io, "response-accept-request-contact", currentUser);
            }
        });

        socket.on('disconnect', () => {
            clients = removeSocketIdFromArray(clients, socket.request.user._id, socket);
        });
    });
}

module.exports = acceptRequestContact;