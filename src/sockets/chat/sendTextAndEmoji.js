import {pushSocketIdToArray, emitNotifyToArray, removeSocketIdFromArray} from "../../helpers/socketHelper";

/**
 * 
 * @param {*} io from socket.io
 */

let sendTextAndEmoji = (io) => {
    let clients = {};
    io.on('connection', function(socket) {
        clients = pushSocketIdToArray(clients, socket.request.user._id, socket.id);

        socket.request.user.chatGroupIds.forEach(group => {
            clients = pushSocketIdToArray(clients, group._id, socket.id);
        });
        
        socket.on('send-text-and-emoji', async(data) => {
            if(clients[data.message.receiverId]) {
                emitNotifyToArray(clients, data.message.receiverId, io, "response-send-text-and-emoji", data.message);
            }
        });

        socket.on('disconnect', () => {
            clients = removeSocketIdFromArray(clients, socket.request.user._id, socket);

            socket.request.user.chatGroupIds.forEach(group => {
                clients = removeSocketIdFromArray(clients, group._id, socket);
            });
        });
    });
}

module.exports = sendTextAndEmoji;