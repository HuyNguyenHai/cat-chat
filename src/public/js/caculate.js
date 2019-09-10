function increaseNumNotifContact(className) {
    let currentValue = +$(`.${className}`).find('em').text();
    $(`.${className}`).find('me').text(currentValue+1);
}

function decreaseNumNotifContact(className) {
    let currentValue = +$(`.${className}`).find('em').text();
    $(`.${className}`).find('me').text(currentValue-1);
}