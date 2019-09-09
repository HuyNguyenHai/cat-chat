$(document).ready(function () {
    $('#list-user-contact-founded').change(function () {
        console.log("changed");
        $('.user-add-new-contact').bind('click', function (e) {
            let userIdContact = $(this).data("uid");
            console.log(userIdContact);
        });
    })
});