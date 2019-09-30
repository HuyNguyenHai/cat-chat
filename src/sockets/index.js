import addNewContact from './contact/addNewContact';
import removeRequestContactSent from './contact/removeRequestContactSent';
import acceptRequestContact from './contact/acceptRequestContact';
import removeRequestContactReceived from './contact/removeRequestContactReceived';
import removeContact from './contact/removeContact';
import sendTextAndEmoji from './chat/sendTextAndEmoji';
import typingOn from './chat/typingOn';
import typingOff from './chat/typingOff';
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
}

module.exports = initSockets;