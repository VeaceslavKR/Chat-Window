const chatWindow = document.getElementById("chat");
const chatSendBtn = chatWindow.children[2].firstElementChild.lastElementChild;
const chatInput = document.querySelector("#chat input");
const chatBody = document.querySelector("#chat .chat-body");

let messages = [];

function initChat() {
  let chatHidden = !!localStorage.getItem("chatHidden");
  if (!chatHidden) {
    openChat();
  }
  chatSendBtn.addEventListener("click", sendMessage);

  let message_json = localStorage.getItem("messages");
  if (message_json != null) {
    message = JSON.parse(message_json);
  }
  renderMessages();
}

function sendMessage(e) {
  e.preventDefault();

  let message = {
    content: chatInput.value,
  };
  messages.push(message);
  chatInput.value = "";
  renderMessages();
  sendMessages();
}

function sendMessages() {
  localStorage.setItem("messages", JSON.stringify(messages));
}

function renderMessages() {
  let html = `<ul>`;

  for (let i = Math.max(messages.length - 6, 0); i < messages.length; i++) {
    html += `<li>${messages[i].content}</li>`;
  }
  html += `</ul>`;
  chatBody.innerHTML = html;
}

function openChat() {
  chatWindow.classList.remove("hidden");
  localStorage.removeItem("chatHidden");
}
function closeChat() {
  chatWindow.classList.add("hidden");
  localStorage.setItem("chatHidden", true);
}
