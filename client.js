const socket = io();

// Elements
const messageContainer = document.getElementById('messages');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');

// Display message in the chat
function displayMessage(message) {
    const div = document.createElement('div');
    div.textContent = message;
    messageContainer.appendChild(div);
    messageContainer.scrollTop = messageContainer.scrollHeight; // Auto-scroll
}

// Receive messages from the server
socket.on('message', (message) => {
    displayMessage(message);
});

// Send message to the server
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = messageInput.value;
    socket.emit('chatMessage', msg);
    messageInput.value = ''; // Clear input
    messageInput.focus();
});