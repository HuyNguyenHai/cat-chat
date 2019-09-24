import {check} from "express-validator/check";
import {transValidation} from "./../../lang/vi";

let checkMessageLength = [
  check("messageValue", transValidation.message_incorrect)
    .isLength({min: 1, max: 400})
];

module.exports = {
    checkMessageLength: checkMessageLength
};
