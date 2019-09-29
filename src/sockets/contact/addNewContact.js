import {pushSocketIdToArray, emitNotifyToArray, removeSocketIdFromArray} from "../../helpers/socketHelper";

/**
 * 
 * @param {*} io from socket.io
 */

let addNewContact = (io) => {
    let clients = {};
    io.on('connection', function(socket) {
        clients = pushSocketIdToArray(clients, socket.request.user._id, socket.id);

        socket.on('add-new-contact', (data) => {
            let currentUser = {
                username: socket.request.user.username,
                avatar: socket.request.user.avatar,
                id: socket.request.user._id,
                address: socket.request.user.address
            };
        
            //emit notification to usr
            if(clients[data.contactId]) {
                emitNotifyToArray(clients, data.contactId, io, "response-add-new-contact", currentUser);
            }
        });

        socket.on('disconnect', () => {
            clients = removeSocketIdFromArray(clients, socket.request.user._id, socket);
        });
    });
}

module.exports = addNewContact;