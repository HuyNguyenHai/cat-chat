function acceptRequestContact() {
    $('.user-accept-contact-received').bind('click', function (e) {
        let targetId = $(this).data('uid');
        $.ajax({
            type: "put",
            url: "contact/accept-request-contact",
            data: {uid: targetId},
            success: function (data) {
                let userId = targetId;
                let requestContactElement = $('#request-contact-received .find-user-bottom').find(`ul li[data-uid = ${targetId}]`);
                let userAvatar = requestContactElement.find('.contactPanel .user-avatar img').attr("src");
                let userAddress = requestContactElement.find('.contactPanel .user-address span').text();
                let username = requestContactElement.find('.contactPanel .user-name p').text();

                socket.emit("accept-request-contact", {contactId: targetId});

                $('#request-contact-received .find-user-bottom').find(`ul li[data-uid = ${targetId}]`).remove();
                decreaseNumNotifContact('count-request-contact-received');
                increaseNumNotifContact('count-contacts');
                let newContactElement = `<li class="_contactList" data-uid="${userId}">
                <div class="contactPanel">
                    <div class="user-avatar">
                        <img src="${userAvatar}" alt="">
                    </div>
                    <div class="user-name">
                        <p>
                            ${username}
                        </p>
                    </div>
                    <br>
                    <div class="user-address">
                        <span>&nbsp ${userAddress}.</span>
                    </div>
                    <div class="user-talk" data-uid="${userId}">
                        Trò chuyện
                    </div>
                    <div class="user-remove-contact action-danger" data-uid="${userId}">
                        Xóa liên hệ
                    </div>
                </div>
            </li>`;
                $('#contacts .find-user-bottom ul').prepend(newContactElement);
                removeContact();
            }
        });
    });
}

socket.on("response-accept-request-contact", function(user) {
    let uid = user.id;
    $(`#request-contact-sent .find-user-bottom ul li[data-uid = ${uid}]`).remove();
    $(`#find-user .find-user-bottom ul li[data-uid = ${uid}]`).remove()
    decreaseNumNotifContact('count-request-contact-sent');
    increaseNumNotifContact('count-contacts');
    let newContactElement = `<li class="_contactList" data-uid="${user.id}">
    <div class="contactPanel">
        <div class="user-avatar">
            <img src="images/users/${user.avatar}" alt="">
        </div>
        <div class="user-name">
            <p>
                ${user.user}
            </p>
        </div>
        <br>
        <div class="user-address">
            <span>&nbsp ${user.address}.</span>
        </div>
        <div class="user-talk" data-uid="${user.id}">
            Trò chuyện
        </div>
        <div class="user-remove-contact action-danger" data-uid="${user.id}">
            Xóa liên hệ
        </div>
    </div>
</li>`;
    $('#contacts .find-user-bottom ul').prepend(newContactElement);
    removeContact();
});

$(document).ready(function () {
    acceptRequestContact();
    removeRequestContactReceived();
    removeContact();
});