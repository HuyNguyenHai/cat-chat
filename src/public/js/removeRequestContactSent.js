function removeRequestContactSent() {
    $('.user-remove-request-contact-sent').bind('click', function (e) {
        let targetId = $(this).data('uid');
        $.ajax({
            type: "delete",
            url: "contact/remove-request-contact-sent",
            data: {uid: targetId},
            success: function (data) {
                if(data.valueSuccess){
                    $('#find-user').find(`div.user-remove-request-contact-sent[data-uid = ${targetId}]`).hide();
                    $('#find-user').find(`div.user-add-new-contact[data-uid = ${targetId}]`).css("display", "inline-block");
                    
                    decreaseNumNotifContact('count-request-contact-sent');
                    
                    $(`#request-contact-sent .find-user-bottom ul li[data-uid = ${targetId}]`).remove();
                    
                    socket.emit('remove-request-contact-sent', {contactId: targetId});
                }
            }
        });
    });
}

socket.on('response-remove-request-contact-sent', function(user) {
    let userIdRemoveRequest = user.id;
    let notif = $('.noti_content').find(`span[data-uid = ${userIdRemoveRequest}]`);
    let requestContactNotif = $('#request-contact-received .contactList').find(`li[data-uid = ${userIdRemoveRequest}]`);
    
    //remove 3 <br>
    notif.next().remove();
    notif.next().remove();
    notif.next().remove();
    //remove the add friend request notification
    notif.remove();
    //remove the request notification in "request-contact-received" tab
    requestContactNotif.remove();

    decreaseNumNotifContact('count-request-contact-received');
    decreaseNumNotification('noti_contact_counter');
    decreaseNumNotification('noti_counter');
});