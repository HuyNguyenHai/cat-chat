function removeRequestContact() {
    $('.user-remove-request-contact').bind('click', function (e) {
        let targetId = $(this).data('uid');
        $.ajax({
            type: "delete",
            url: "contact/removeContact",
            data: {uid: targetId},
            success: function (data) {
                if(data.valueSuccess){
                    $('#find-user').find(`div.user-remove-request-contact[data-uid = ${targetId}]`).hide();
                    $('#find-user').find(`div.user-add-new-contact[data-uid = ${targetId}]`).css("display", "inline-block");
                    decreaseNumNotifContact('count-request-contact-sent');
                }
            }
        });
    });
}