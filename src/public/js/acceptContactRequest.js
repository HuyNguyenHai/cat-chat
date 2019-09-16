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
            }
        });
    });
}

$(document).ready(function () {
    acceptRequestContact();
});