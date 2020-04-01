window.story.state.socket = io();
window.story.state.socket.on('arrives', function(username, from) {
    var message = window.story.state.arrives(username, from);
    if (message === false) {
        message = username + ' arrives from ' + from + '.';
    }
    $('.passage').append('<p>' + message + '</p>');
});
window.story.state.socket.on('leaves', function(username, to) {
    var message = window.story.state.leaves(username, to);
    if (message === false) {
        message = username + ' leaves to ' + to + '.';
    }
    $('.passage').append('<p>' + message + '</p>');
});
console.log("woah");
