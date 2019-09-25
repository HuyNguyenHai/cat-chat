function increaseNumberMessageGroup(divId) {
    let messageAmount = +$(`.right.tab-pane[data-chat = ${divId}]`).find('.show-message-amount').text();
    $(`.right.tab-pane[data-chat = ${divId}]`).find('.show-message-amount').text(messageAmount + 1);
}