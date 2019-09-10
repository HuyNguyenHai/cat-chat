import UserModel from "./../models/userModel";
import ContactModel from "./../models/contactModel";
import _ from "lodash";
import { contact } from ".";

let findUsersContact = (currentUserId, keyword) => {
  return new Promise(async (resolve, reject) => {
    let deprecatedUserIds = [currentUserId];
    let contactsByUser = await ContactModel.findUsersContact(currentUserId);
		
		contactsByUser.forEach((contact) => {
      deprecatedUserIds.push(contact.userId);
      deprecatedUserIds.push(contact.contactId);
		});
		
		deprecatedUserIds = _.uniqBy(deprecatedUserIds);
		let users = await UserModel.findAllForAddContact(deprecatedUserIds, keyword);
		resolve(users);
  });
}

let addNew = (currentUserId, contactId) => {
  return new Promise(async (resolve, reject) => {
    let contactExist = await ContactModel.checkExist(currentUserId, contactId);
    if(contactExist) {
      return reject(false);
    }
    
    let newContactItem = {
      userId: currentUserId,
      contactId: contactId
    };

    let newContact = ContactModel.createNew(newContactItem);
    resolve(newContact);
  });
}

let removeRequestContact = (currentUserId, contactId) => {
  return new Promise(async (resolve, reject) => {
    let removeRequest = await ContactModel.removeRequestContact(currentUserId, contactId);
    if(removeRequest.result.n == 0){
      return reject(false);
    }
    resolve(true);
  });
}

module.exports = {
  findUsersContact: findUsersContact,
  addNew: addNew,
  removeRequestContact: removeRequestContact
}