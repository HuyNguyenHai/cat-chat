import addNewContact from './contact/addNewContact';
import removeRequestContactSent from './contact/removeRequestContactSent';
import acceptRequestContact from './contact/acceptRequestContact';
import removeRequestContactReceived from './contact/removeRequestContactReceived';
/**
 * 
 * @param {*} io from socket.io lib
 */

let initSockets = (io) => {
    addNewContact(io);
    removeRequestContactSent(io);
    removeRequestContactReceived(io);
    acceptRequestContact(io);
}

module.exports = initSockets;