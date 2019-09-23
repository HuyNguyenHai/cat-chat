import ContactModel from '../models/contactModel';
import UserModel from '../models/userModel';
import ChatGroupModel from '../models/chatGroupModel';
import MessageModel from '../models/messageModel';

const LIMIT_CONVERSATIONS_TAKEN = 15;
const LIMIT_MESSAGES_TAKEN = 20;
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

            allConversations.sort((a, b) => {
                return b.updatedAt - a.updatedAt;
            });

            let allConversationsWithMessagesPromise = allConversations.map(async (conversation) => {
                if(conversation.members){
                    let messages = await MessageModel.model.getMessagesInGroup(conversation._id, LIMIT_MESSAGES_TAKEN);
                    conversation = conversation.toObject();
                    conversation.messages = messages;
                } else {
                    let messages = await MessageModel.model.getMessagesInPersonal(currentUserId, conversation._id, LIMIT_MESSAGES_TAKEN);
                    conversation = conversation.toObject();
                    conversation.messages = messages;
                }
                return conversation;
            });
             
            let allConversationsWithMessages = await Promise.all(allConversationsWithMessagesPromise);
            allConversationsWithMessages.sort((a, b) => {
                return b.updatedAt - a.updatedAt;
            })
                
            resolve({
                allConversationsWithMessages: allConversationsWithMessages
            });
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    getAllConversations: getAllConversations
}