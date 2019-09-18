function removeContact() {
    $('.user-remove-contact').unbind('click').bind('click', function (e) {
        let targetId = $(this).data('uid');
        let username = $(this).parent().find(".user-name p").text();
        Swal.fire({
            title: `Bạn có chắc muốn xóa ${username} khỏi danh bạ?`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa liên lạc!',
            cancelButtonText: 'Hủy'
          }).then((result) => {
            if (result.value) {
              Swal.fire(
                'Đã xóa thành công!'
              );
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
            }
          })
    });
}

socket.on('response-remove-contact', function(user) {
    let uid = user.id;

    $(`#contacts .find-user-bottom ul li[data-uid = ${uid}]`).remove();
    decreaseNumNotifContact('count-contacts');
});