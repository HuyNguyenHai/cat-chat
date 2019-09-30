function sendTextAndEmoji(divId) {
    $('.emojionearea').unbind('keyup').bind('keyup', function(event) {
        if(event.which == 13) {
            $('.emojionearea-editor').html("");
            let targetId = $(`#write-chat-${divId}`).data('chat');
            let messageText = $(`#write-chat-${divId}`).val();

            if(!targetId.length || !messageText.length) {
                return false;
            }

            let dataTextEmojiForSend = {
                uid: targetId,
                messageValue: messageText
            }

            if($(`#write-chat-${divId}`).hasClass('chat-in-group')) {
                dataTextEmojiForSend.isChatGroup = true;
            }

            $.post("/message/add-new-message", dataTextEmojiForSend,
                function (data) {
                    let newMessageElement = $(`<div class="convert-emoji bubble me data-mess-id="${data.message._id}"></div>`);
                    newMessageElement.text(data.message.text);
                    let convertedEmoji = emojione.toImage(newMessageElement.html());
                    if(dataTextEmojiForSend.isChatGroup) {
                        let senderAvatar = `<img src="/images/users/${data.message.sender.avatar}" class="avatar-small" title="${data.message.sender.name}">`;
                        newMessageElement.html(`${senderAvatar} ${convertedEmoji}`);
                        increaseNumberMessageGroup(targetId);
                    } else {
                        newMessageElement.append(emojione.toImage(data.message.text));
                    }
                    $(`.right .chat[data-chat = ${divId}]`).append(newMessageElement);
                    $(`.right .chat[data-chat = ${divId}]`).scrollTop($(`.right .chat[data-chat = ${divId}]`)[0].scrollHeight);

                    $(`.person[data-chat = ${divId}]`).find('span.time').html(moment(data.message.createAt).locale('vi').startOf("seconds").fromNow());
                    $(`.person[data-chat = ${divId}]`).find('span.preview').html(emojione.toImage(dataTextEmojiForSend.messageValue));

                    $(`.person[data-chat = ${divId}]`).on('move.moveConversationToTop', function() {
                        let dataMove = $(this).parent();
                        dataMove.closest('ul').prepend(dataMove);
                        $(this).off('move.moveConversationToTop');
                    });
                    $(`.person[data-chat = ${divId}]`).trigger('move.moveConversationToTop');

                    //emmit realtime here
                    socket.emit('send-text-and-emoji', data);
                }
            ).fail(function(response) {
                alertify.notify(response.responseText, "error", 7);
            });
        }
    });
}

$(document).ready(function () {
    socket.on('response-send-text-and-emoji', (message) => {
        let currentUserId = $('.dropdown').data('uid');
        if(message.senderId != currentUserId) {
            //display new message received realtime
            let newMessageElement = $(`<div class="convert-emoji bubble you data-mess-id="${message._id}"></div>`);
            if(message.conversationType == "group") {
                newMessageElement.append(
                    `<img src="/images/users/${message.sender.avatar}" class="avatar-small" title="${message.sender.name}">`
                );
                newMessageElement.append(emojione.toImage(message.text));
                increaseNumberMessageGroup(message.receiverId);
                $(`.right .chat[data-chat = ${message.receiverId}]`).append(newMessageElement);
                $(`.right .chat[data-chat = ${message.receiverId}]`).scrollTop($(`.right .chat[data-chat = ${message.receiverId}]`)[0].scrollHeight);
        
                $(`.person[data-chat = ${message.receiverId}]`).find('span.time').html(moment(message.receiverId).locale('vi').startOf("seconds").fromNow());
                $(`.person[data-chat = ${message.receiverId}]`).find('span.preview').html(emojione.toImage(message.text));
        
                $(`.person[data-chat = ${message.receiverId}]`).on('move.moveConversationToTop', function() {
                    let dataMove = $(this).parent();
                    dataMove.closest('ul').prepend(dataMove);
                    $(this).off('move.moveConversationToTop');
                });
                $(`.person[data-chat = ${message.receiverId}]`).trigger('move.moveConversationToTop');
                
                $(`.right .chat[data-chat = ${message.receivedId}]`).find('.bubble-typing-gif').remove();
            } else {
                newMessageElement.html(emojione.toImage(message.text));
                $(`.right .chat[data-chat = ${message.senderId}]`).append(newMessageElement);
                $(`.right .chat[data-chat = ${message.senderId}]`).scrollTop($(`.right .chat[data-chat = ${message.senderId}]`)[0].scrollHeight);
        
                $(`.person[data-chat = ${message.senderId}]`).find('span.time').html(moment(message.createAt).locale('vi').startOf("seconds").fromNow());
                $(`.person[data-chat = ${message.senderId}]`).find('span.preview').html(emojione.toImage(message.text));
        
                $(`.person[data-chat = ${message.senderId}]`).on('move.moveConversationToTop', function() {
                    let dataMove = $(this).parent();
                    dataMove.closest('ul').prepend(dataMove);
                    $(this).off('move.moveConversationToTop');
                });
                $(`.person[data-chat = ${message.senderId}]`).trigger('move.moveConversationToTop');
                $(`.right .chat[data-chat = ${message.senderId}]`).find('.bubble-typing-gif').remove();
            }
        }
    }); 
});