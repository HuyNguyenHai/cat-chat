function callFindUser(event) {
    if(event.type === "click" || event.which === 13){
        let keyword = $('#input-find-users').val();
        $.get(`/contact/find-users/${keyword}`, function (data) {
            $('#find-user .find-user-bottom ul').html(data);
            addUserContact();//js/addUserContact.js
        });
    }
}

$(document).ready(function () {
    $('#btn-find-users').bind("click", callFindUser);
    $('#input-find-users').bind("keypress", callFindUser);

    if($(`.count-request-contact-sent`).find('em').text() === '0') $(`.count-request-contact-sent`).text('');
    if($(`.count-request-contact-received`).find('em').text() === '0') $(`.count-request-contact-received`).text('');
    if($(`.count-contacts`).find('em').text() === '0') $(`.count-contacts`).text('');
});