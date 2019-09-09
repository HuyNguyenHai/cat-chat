function callFindUser(event) {
    if(event.type === "click" || event.which === 13){
        let keyword = $('#input-find-users').val();
        $.get(`/contact/find-users/${keyword}`, function (data) {
                $('.find-user-bottom ul').html(data);
            }
        );
    }
}

$(document).ready(function () {
    $('#btn-find-users').bind("click", callFindUser);
    $('#input-find-users').bind("keypress", callFindUser);
});