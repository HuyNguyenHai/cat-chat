import ContactModel from '../models/contactModel';
import UserModel from '../models/userModel';
import ChatGroupModel from '../models/chatGroupModel';

const LIMIT_CONVERSATIONS_TAKEN = 15;
/**
 * 
 * @param {String} currentUserId 
 */
let getAllConversations = (currentUserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let contacts = await ContactModel.getContacts(currentUserId, LIMIT_CONVERSATIONS_TAKEN);
            
            let userConversationsPromise = contacts.map(async (contact) => {
                if (contact.userId == currentUserId) {
                    let userConversation = await UserModel.getNormalUserDataById(contact.contactId);
                    userConversation.updatedAt = contact.updatedAt;
                    return userConversation;
                } else {
                    let userConversation = await UserModel.getNormalUserDataById(contact.userId);
                    userConversation.updatedAt = contact.updatedAt;
                    return userConversation;
                }
            })

            let userConversations = await Promise.all(userConversationsPromise);
            let groupConversations = await ChatGroupModel.getChatGroup(currentUserId, LIMIT_CONVERSATIONS_TAKEN);

            let allConversations = userConversations.concat(groupConversations);

            allConversations.sort(function(a, b) {
                return b.updatedAt - a.updatedAt;
            });

            resolve({
                userConversations: userConversations,
                groupConversations: groupConversations,
                allConversations: allConversations
            });
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    getAllConversations: getAllConversations
}