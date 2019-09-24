function sendMessage(divId) {
    $('.emojionearea').unbind('keyup').bind('keyup', function(event) {
        if(event.which == 13) {
            let targetId = $(`#write-chat-${divId}`).data('chat');
            let messageText = $(`#write-chat-${divId}`).val();

            if(!targetId.length || !messageText.length) {
                return false;
            }

            let dataTextEmojiForSend = {
                uid: targetId,
                messageValue: messageText
            }

            if  ($(`#write-chat-${divId}`).hasClass('chat-in-group')) {
                dataTextEmojiForSend.isChatGroup = true;
            }

            $.post("/message/add-new-message", dataTextEmojiForSend,
                function (data) {
                    console.log(data.message);
                }
            ).fail(function(response) {
                alertify.notify(response.responseText, "error", 7);
            });
        }
    });
}