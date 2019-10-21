window.onload = function() {
    // These are all the references to the HTML elements.
    const form = document.getElementById('message-form');
    const messageField = document.getElementById('message');
    const messagesList = document.getElementById('messages');
    const socketStatus = document.getElementById('status');
    const closeBtn = document.getElementById('close');

    
    // Creating the new websocket.
    const socket = new WebSocket('wss://echo.websocket.org');

    // Displays a message when the websocket is opened.
    socket.onopen = function(event) {
        socketStatus.innerHTML = 'Connected to: ' + event.currentTarget.url;
        socketStatus.className = 'open';
    };

    // Error collection
    socket.onerror = (err) => {
        console.log('WebSocket Error: ' + err);
    };

    // Handles messages sent by the user to the server
    form.onsubmit = (submit) => {
        submit.preventDefault();

        // Gets the message the user inputs to the text field.
        const message = messageField.value

        // Uses the websocket to send the message
        socket.send(message);

        // Adds the message to the 'messages' list
        messagesList.innerHTML += '<li class="sent"><span>Sent:</span>' +
                            message + '</li>'

        // Clears the message field after use
        messageField.value = '';

        return false;
    };

    // handles messages sent from the server to the user
    socket.onmessage = (event) => {
        const message = event.data;
        messagesList.innerHTML += '<li class="received><span>Message received:</span>' +
                                message + '</li>'
    };

    // Alert the user that the websocket connection is now closed
    socket.onclose = (event) => {
        socketStatus.innerHTML = 'Disconnected from the WebSocket server.';
        socketStatus.className = 'closed';
    };

    closeBtn.onclick = (clicked) => {
        clicked.preventDefault();

        // Closes the connection with the websocket.
        socket.close();

        return false;
    };
}