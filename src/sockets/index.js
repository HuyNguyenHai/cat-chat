import addNewContact from './contact/addNewContact';
import removeRequestContactSent from './contact/removeRequestContactSent';
import acceptRequestContact from './contact/acceptRequestContact';
import removeRequestContactReceived from './contact/removeRequestContactReceived';
import removeContact from './contact/removeContact';
import sendTextAndEmoji from './chat/sendTextAndEmoji';
import typingOn from './chat/typingOn';
import typingOff from './chat/typingOff';
import online from './onlineStatus/online';
import offline from './onlineStatus/offline';
/**
 * 
 * @param {*} io from socket.io lib
 */


let initSockets = (io) => {
    addNewContact(io);
    removeRequestContactSent(io);
    removeRequestContactReceived(io);
    acceptRequestContact(io);
    removeContact(io);
    sendTextAndEmoji(io);
    typingOn(io);
    typingOff(io);
    offline(io);
    online(io)
}

module.exports = initSockets;