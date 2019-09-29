function addUserContact() {
    $('.user-add-new-contact').unbind('click').bind('click', function (e) {
        let targetId = $(this).data('uid');
        $.post("/contact/add-new", {uid: targetId}, function(data) {
            if(data.valueSuccess){
                $('#find-user').find(`div.user-add-new-contact[data-uid = ${targetId}]`).hide();
                $('#find-user').find(`div.user-remove-request-contact-sent[data-uid = ${targetId}]`).css("display", "inline-block");

                increaseNumNotifContact('count-request-contact-sent');
                
                let newUserContactItem = $(`#find-user .find-user-bottom ul li[data-uid = ${targetId}]`).html();
                newUserContactItem = `<li class="_contactList" data-uid="${targetId}">${newUserContactItem}</li>`;
                
                $('#request-contact-sent .find-user-bottom ul').prepend(newUserContactItem);

                socket.emit("add-new-contact", {contactId: targetId});

                removeRequestContactSent();
                addUserContact();
            }
        });
    });
}

socket.on("response-add-new-contact", function(user) {
    console.log(user);
    let notif = `<span data-uid="${ user.id }">
    <img class="avatar-small" src="images/users/${ user.avatar }" alt=""> 
    <strong>${user.username}</strong> đã gửi cho bạn một lời mời kết bạn!
    </span><br><br><br>`;

    let requestContactNotif = `<li class="_contactList" data-uid="${ user.id }">
    <div class="contactPanel">
        <div class="user-avatar">
            <img src="images/users/${ user.avatar }" alt="">
        </div>
        <div class="user-name">
            <p>
                ${ user.username }
            </p>
        </div>
        <br>
        <div class="user-address">
            <span>&nbsp ${ user.address }.</span>
        </div>
        <div class="user-accept-contact-received" data-uid="${ user.id }">
            Chấp nhận
        </div>
        <div class="user-remove-request-contact-received action-danger" data-uid="${user.id}">
            Xóa yêu cầu
        </div>
    </div>
</li>`;

    $('.noti_content').prepend(notif);
    $('#request-contact-received .contactList').prepend(requestContactNotif);
    acceptRequestContact();
    removeRequestContactReceived();

    increaseNumNotifContact('count-request-contact-received');
    increaseNumNotification('noti_contact_counter');
    increaseNumNotification('noti_counter');
})