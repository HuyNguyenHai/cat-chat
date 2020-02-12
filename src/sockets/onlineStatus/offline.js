import {pushSocketIdToArray, emitNotifyToArray, removeSocketIdFromArray} from "../../helpers/socketHelper";
import contactService from "../../services/contactService";
/**
 * 
 * @param {*} io from socket.io
 */
let onlineUserList = [];
let online = (io) => {
    let clients = {};
    io.on('connection', function(socket) {
        clients = pushSocketIdToArray(clients, socket.request.user._id, socket.id);
        let userId = socket.request.user._id;
        onlineUserList.push(userId);
        socket.request.user.chatGroupIds.forEach(group => {
            clients = pushSocketIdToArray(clients, group._id, socket.id);
        });

        socket.on('disconnect', async() => {
            clients = removeSocketIdFromArray(clients, socket.request.user._id, socket);
            onlineUserList.splice(onlineUserList.indexOf(userId), 1);

            let contacts = await contactService.getContactsByUidForSocket(userId);
            contacts.forEach(contact => {
                emitNotifyToArray(clients, contact, io, "offline-friend", {
                    friendId: userId
                });
            });

            socket.request.user.chatGroupIds.forEach(group => {
                clients = removeSocketIdFromArray(clients, group._id, socket);
            });
        });
    });
}

module.exports = online;