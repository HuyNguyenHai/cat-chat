function typingOn(divId) {
    let targetId = $(`#write-chat-${divId}`).data('chat');
    if($(`#write-chat-${divId}`).hasClass('chat-in-group')) {
        socket.emit('user-is-typing', {groupId: targetId});
    } else {
        socket.emit('user-is-typing', {contactId: targetId});
    } 
}

function typingOff(divId) {
    let targetId = $(`#write-chat-${divId}`).data('chat');
    if($(`#write-chat-${divId}`).hasClass('chat-in-group')) {
        socket.emit('user-is-not-typing', {groupId: targetId});
    } else {
        socket.emit('user-is-not-typing', {contactId: targetId});
    } 
}

$(document).ready(function () {
    socket.on("response-user-is-typing", function(data) {
       let messageTyping = `<div class="bubble you bubble-typing-gif">
       <img src="/images/chat/typing.gif">
       </div>`;
        if(data.currentGroupId) {
            if(data.currentUserId != $("#dropdown-navbar-user").data('uid')) {
                let typing = $(`.right .chat[data-chat = ${data.currentGroupId}]`).find('.bubble-typing-gif');
                if(!typing.length){
                    $(`.chat[data-chat = ${data.currentGroupId}]`).append(messageTyping);
                    $(`.right .chat[data-chat = ${data.currentGroupId}]`).scrollTop($(`.right .chat[data-chat = ${data.currentGroupId}]`)[0].scrollHeight);   
                }
            }
        } else {
            let typing = $(`.right .chat[data-chat = ${data.currentUserId}]`).find('.bubble-typing-gif');
            if(!typing.length){
                $(`.chat[data-chat = ${data.currentUserId}]`).append(messageTyping);
                $(`.right .chat[data-chat = ${data.currentUserId}]`).scrollTop($(`.right .chat[data-chat = ${data.currentUserId}]`)[0].scrollHeight);
            }
        }
    });
    socket.on("response-user-is-not-typing", function(data) {
         if(data.currentGroupId) {
             if(data.currentUserId != $("#dropdown-navbar-user").data('uid')) {
                $(`.right .chat[data-chat = ${data.currentGroupId}]`).find('.bubble-typing-gif').remove();
             }
         } else {
            $(`.right .chat[data-chat = ${data.currentUserId}]`).find('.bubble-typing-gif').remove();
         }
     });
});