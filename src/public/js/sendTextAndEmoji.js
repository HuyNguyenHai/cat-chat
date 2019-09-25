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
                    if(dataTextEmojiForSend.isChatGroup) {
                        newMessageElement.html(
                            `<img src="/images/users/${data.message.sender.avatar}" class="avatar-small" title="${data.message.sender.name}">`
                        );
                        newMessageElement.html(emojione.toImage(data.message.text));
                    } else {
                        newMessageElement.html(emojione.toImage(data.message.text));
                    }
                    increaseNumberMessageGroup(targetId);
                    $(`.right .chat[data-chat = ${divId}]`).append(newMessageElement);
                    $(`.right .chat[data-chat = ${divId}]`).scrollTop($(`.right .chat[data-chat = ${divId}]`)[0].scrollHeight);

                    $(`.person[data-chat = ${divId}]`).find('span.time').html(moment(data.message.createAt).locale('vi').startOf("seconds").fromNow());
                    $(`.person[data-chat = ${divId}]`).find('span.preview').html(emojione.toImage(dataTextEmojiForSend.messageValue));

                    $(`.person[data-chat = ${divId}]`).on('click.moveConversationToTop', function() {
                        let dataMove = $(this).parent();
                        dataMove.closest('ul').prepend(dataMove);
                        $(this).off('click.moveCOnversationToTop');
                    });
                    $(`.person[data-chat = ${divId}]`).click();

                    //emmit realtime here
                }
            ).fail(function(response) {
                alertify.notify(response.responseText, "error", 7);
            });
        }
    });
}