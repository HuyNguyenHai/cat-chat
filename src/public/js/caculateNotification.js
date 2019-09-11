function increaseNumNotification(className) {
    let currentValue = +$(`.${className}`).text();
    $(`.${className}`).css("display", "block").html(`${currentValue+1}`);
}

function decreaseNumNotification(className) {
    let currentValue = +$(`.${className}`).text();
    if(currentValue === 1) $(`.${className}`).css("display", "none").html('');
    else $(`.${className}`).html(`${currentValue-1}`);
}