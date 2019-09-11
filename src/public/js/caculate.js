function increaseNumNotifContact(className) {
    let currentValue = +$(`.${className}`).find('em').text();
    $(`.${className}`).html(`(<em>${currentValue+1}</em>)`);
}

function decreaseNumNotifContact(className) {
    let currentValue = +$(`.${className}`).find('em').text();
    if(currentValue === 1) $(`.${className}`).html('<em></em>');
    else $(`.${className}`).html(`(<em>${currentValue-1}</em>)`);
}