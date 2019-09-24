import {transErrors, transSuccess} from "./../../lang/vi";
import {validationResult} from "express-validator/check";
import {message} from "../services";

let addNewMessage = async(req, res, next) => {
    let errorArr = [];
    let validationErrors = validationResult(req);

    if(!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach(e => {
            errorArr.push(e.msg);
        });
        return res.status(500).send(errorArr);
    }

    try {
        let sender = {
            avatar: req.user.avatar,
            id: req.user._id,
            name: req.user.username
        };

        let receiverId = req.body.uid;
        let messageValue = req.body.messageValue;
        let isChatGroup = req.body.isChatGroup

        let newMessage = await message.addNewMessage(sender, receiverId, messageValue, isChatGroup);

        
        return res.status(200).send({message: newMessage});
    } catch (error) {
        console.log(error);
        return res.status(500).send(transErrors.server_error);
    }
}

module.exports = {
    addNewMessage: addNewMessage
}