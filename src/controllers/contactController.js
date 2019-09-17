import {contact} from "./../services";
import {transErrors} from "./../../lang/vi";

let findUsersContact = async(req, res, next) => {
    try {
        let currentUserId = req.user._id;
        let keyword = req.params.keyword;
        let users = await contact.findUsersContact(currentUserId, keyword); 
        return res.render('main/contacts/sections/findUsersContact', {users});
    } catch (error) {
        return res.status(500).send(transErrors.server_error);
    }
}

let addNew = async(req, res, next) => {
    try {
        let currentUserId = req.user._id;
        let contactId = req.body.uid;
        let newContact = await contact.addNew(currentUserId, contactId);
    
        return res.status(200).send({valueSuccess: !!newContact});
    } catch (error) {
        return res.status(500).send(transErrors.server_error);
    }
}

let removeRequestContactSent = async(req, res, next) => {
    try {
        let currentUserId = req.user._id;
        let contactId = req.body.uid;
        let removeContact = await contact.removeRequestContactSent(currentUserId, contactId);

        return res.status(200).send({valueSuccess: !!removeContact});
    } catch (error) {
        return console.log(error);
    }
}

let removeRequestContactReceived = async(req, res, next) => {
    try {
        let currentUserId = req.user._id;
        let contactId = req.body.uid;
        let removeContact = await contact.removeRequestContactReceived(currentUserId, contactId);

        return res.status(200).send({valueSuccess: !!removeContact});
    } catch (error) {
        return console.log(error);
    }
}

let acceptRequestContact = async (req, res, next) => {
    try {
        let currentUserId = req.user._id;
        let contactId = req.body.uid;
        let acceptRequestContact = await contact.acceptRequestContact(currentUserId, contactId);

        return res.status(200).send({valueSuccess: !!acceptRequestContact});
    } catch (error) {
        return res.status(500).send(transErrors.server_error);
    }
}

module.exports = {
    findUsersContact: findUsersContact,
    addNew: addNew,
    removeRequestContactSent: removeRequestContactSent,
    acceptRequestContact: acceptRequestContact,
    removeRequestContactReceived: removeRequestContactReceived
}