function removeContact() {
    $('.user-remove-contact').bind('click', function (e) {
        let targetId = $(this).data('uid');
        $.ajax({
            type: "delete",
            url: "contact/remove-contact",
            data: {uid: targetId},
            success: function (data) {
                if(data.valueSuccess){
                    decreaseNumNotifContact('count-contacts');
                    
                    $(`#contacts .find-user-bottom ul li[data-uid = ${targetId}]`).remove();
                    
                    socket.emit('remove-contact', {contactId: targetId});
                }
            }
        });
    });
}

socket.on('response-remove-contact', function(user) {
    let uid = user.id;

    $(`#contacts .find-user-bottom ul li[data-uid = ${uid}]`).remove();
    decreaseNumNotifContact('count-contacts');
});