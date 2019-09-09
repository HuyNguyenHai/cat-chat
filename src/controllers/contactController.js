import {contact} from "./../services";
import transErrors from "./../../lang/vi";
import transSuccess from "./../../lang/vi";

let findUsersContact = async(req, res, next) => {
    try {
        let currentUserId = req.user._id;
        let keyword = req.params.keyword;
        let users = await contact.findUsersContact(currentUserId, keyword); 
        return res.render('main/contacts/sections/findUsersContact', {users});
    } catch (error) {
        console.log(error);
        return res.status(500).send(transErrors.server_error);
    }
}

module.exports = {
    findUsersContact: findUsersContact
}