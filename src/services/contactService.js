import UserModel from "./../models/userModel";
import ContactModel from "./../models/contactModel";
import NotificationModel from "./../models/notificationModel";

import _ from "lodash";

const LIMIT_NUMBER_TAKEN = 10;

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
    
    //create contact
    let newContactItem = {
      userId: currentUserId,
      contactId: contactId,
      status: false
    };

    //create notification
    let notificationItem = {
      senderId: currentUserId,
      receiverId: contactId,
      type: NotificationModel.types.ADD_CONTACT
    }

    await NotificationModel.model.createNew(notificationItem);

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
    await NotificationModel.model.removeRequestContactNotif(currentUserId, contactId, NotificationModel.types.ADD_CONTACT);
    resolve(true);
  });
}

let getContacts = (currentUserId, limit = LIMIT_NUMBER_TAKEN) => {
  return new Promise(async(resolve, reject) => {
    try {
      let contacts = await ContactModel.getContacts(currentUserId, limit);

      let users = contacts.map(async (contact) => {
        if(contact.userId === currentUserId){
          return await UserModel.findUserById(contact.contactId); 
        }
        else return await UserModel.findUserById(contact.userId);
      })
      resolve(await Promise.all(users));
    } catch (error) {
      reject(error);
    }
  });
}

let getContactsSent = (currentUserId, limit = LIMIT_NUMBER_TAKEN) => {
  return new Promise(async(resolve, reject) => {
    try {
      let contacts = await ContactModel.getContactsSent(currentUserId, limit);

      let users = contacts.map(async (contact) => {
        return await UserModel.findUserById(contact.contactId);
      })
      resolve(await Promise.all(users));
    } catch (error) {
      reject(error);
    }
  });
}

let getContactsReceived = (currentUserId, limit = LIMIT_NUMBER_TAKEN) => {
  return new Promise(async(resolve, reject) => {
    try {
      let contacts = await ContactModel.getContactsReceived(currentUserId, limit);

      let users = contacts.map(async (contact) => {
        return await UserModel.findUserById(contact.userId);
      })
      resolve(await Promise.all(users));
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  findUsersContact: findUsersContact,
  addNew: addNew,
  removeRequestContact: removeRequestContact,
  getContacts: getContacts,
  getContactsSent: getContactsSent,
  getContactsReceived: getContactsReceived
}