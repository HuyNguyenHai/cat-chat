function startConversation() {
    $('.user-talk').unbind('click').bind('click', function(e) {
        let targetId = $(this).data('uid');
        let targetName = $(this).parent().find('.user-name').text();
        let targetAvatar = $(this).parent().find('.user-avatar img').attr('src');

        $('#contactsModal').removeClass('in').css('display', 'none');
        $('.modal-backdrop.fade.in').remove();
        // create new private chatroom
        function addLeftsideRoomchat() {
            $('.left .tab-content #all-chat .people')
            .prepend(`<a href="#uid_${targetId}" class="room-chat" data-target="#to_${targetId}">
                <li class="person active" data-chat="${targetId}">
                    <div class="left-avatar">
                        <div class="dot"></div>
                        <img src="${targetAvatar}" alt="">
                    </div>
                    <span class="name">
                        ${targetName}
                    </span>
                    <span class="time">
                        vừa xong
                    </span>            
                    <span class="preview convert-emoji ">aa</span>   
                </li>
            </a>`
            );
        }
        function addRightsideRoomchat() {
            $('#screen-chat')
        }
    })
}

$(document).ready(function () {
    startConversation();
});