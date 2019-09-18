function removeRequestContactReceived() {
    $('.user-remove-request-contact-received').unbind('click').bind('click', function (e) {
        let targetId = $(this).data('uid');
        $.ajax({
            type: "delete",
            url: "contact/remove-request-contact-received",
            data: {uid: targetId},
            success: function (data) {
                if(data.valueSuccess){
                    decreaseNumNotifContact('count-request-contact-received');
                    
                    $(`#request-contact-received .find-user-bottom ul li[data-uid = ${targetId}]`).remove();
                    
                    socket.emit('remove-request-contact-received', {contactId: targetId});
                }
            }
        });
    });
}

socket.on('response-remove-request-contact-received', function(user) {
    let uid = user.id;

    $(`#request-contact-sent .find-user-bottom ul li[data-uid = ${uid}]`).remove();
    
    $('#find-user').find(`div.user-remove-request-contact-sent[data-uid = ${uid}]`).hide();
    $('#find-user').find(`div.user-add-new-contact[data-uid = ${uid}]`).css("display", "inline-block");
    
    decreaseNumNotifContact('count-request-contact-sent');
});