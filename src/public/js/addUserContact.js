function addUserContact() {
    $('.user-add-new-contact').bind('click', function (e) {
        let targetId = $(this).data('uid');
        $.post("/contact/add-new", {uid: targetId}, function(data) {
            if(data.valueSuccess){
                $('#find-user').find(`div.user-add-new-contact[data-uid = ${targetId}]`).hide();
                $('#find-user').find(`div.user-remove-request-contact[data-uid = ${targetId}]`).css("display", "inline-block");
                increaseNumNotifContact('count-request-contact-sent');
                //xu ly realtime tu day
                console.log(targetId);
                socket.emit("add-new-contact", {contactid: targetId});
            }
        });
    });
}