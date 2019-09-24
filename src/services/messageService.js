import ContactModel from '../models/contactModel';
import UserModel from '../models/userModel';
import ChatGroupModel from '../models/chatGroupModel';
import MessageModel from '../models/messageModel';

import {transErrors} from '../../lang/vi';
import { user } from '.';

const LIMIT_CONVERSATIONS_TAKEN = 15;
const LIMIT_MESSAGES_TAKEN = 30;
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
                    conversation.messages = Array.reverse(messages);
                } else {
                    let messages = await MessageModel.model.getMessagesInPersonal(currentUserId, conversation._id, LIMIT_MESSAGES_TAKEN);
                    conversation = conversation.toObject();
                    conversation.messages = Array.reverse(messages);
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
};

/**
 * 
 * @param {Object} sender currentUser
 * @param {string} receiverId Id of an user or a group
 * @param {string} messageValue message content (text and emoji)
 * @param {boolean} isChatGroup is a group or not
 */
let addNewMessage = (sender, receiverId, messageValue, isChatGroup) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(isChatGroup) {
                let chatGroupReceiver = await ChatGroupModel.getChatGroupById(receiverId);
                if(!chatGroupReceiver) {
                    reject(transErrors.get_chat_group_fail);
                }
                let receiver = {
                    id: chatGroupReceiver._id,
                    avatar: "group-avatar-trungquandev.png",
                    name: chatGroupReceiver.name
                }

                let newMessageItem = {
                    senderId: sender.id,
                    receiverId: receiver.id,
                    conversationType: MessageModel.conversationTypes.GROUP,
                    messageType: MessageModel.messageTypes.TEXT,
                    sender: sender,
                    receiver: receiver, 
                    text: messageValue,
                    createdAt: Date.now()
                };

                //update chat group when have new message
                await ChatGroupModel.updateWhenHaveNewMessage(chatGroupReceiver._id, chatGroupReceiver.messageAmount + 1);
                
                let newMessage = await MessageModel.model.createNew(newMessageItem);
                resolve(newMessage);
            } else {
                let userReceiver = await UserModel.findUserByIdForSessionToUse(receiverId);
                
                if(!userReceiver) {
                    reject(transErrors.get_user_fail);
                }
                let receiver = {
                    id: userReceiver._id,
                    avatar: userReceiver.avatar,
                    name: userReceiver.username
                }

                let newMessageItem = {
                    senderId: sender.id,
                    receiverId: receiver.id,
                    conversationType: MessageModel.conversationTypes.PERSONAL,
                    messageType: MessageModel.messageTypes.TEXT,
                    sender: sender,
                    receiver: receiver, 
                    text: messageValue,
                    createdAt: Date.now()
                };

                let newMessage = await MessageModel.model.createNew(newMessageItem);
                //update contact when have new message
                await ContactModel.updateWhenHaveNewMessage(sender.id, userReceiver._id);
                resolve(newMessage);
            }
        } catch (error) {
            console.log(error);
        }
    })
};

module.exports = {
    getAllConversations: getAllConversations,
    addNewMessage: addNewMessage
}