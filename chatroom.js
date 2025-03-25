const socket = io("https://backchat-production-604a.up.railway.app/"); // Cambia esto por tu URL real

document.getElementById("send").addEventListener("click", () => {
  let message = document.getElementById("message").value;
  
  if (message.trim() !== "") {
    socket.emit("mensaje", { userId, message });
    document.getElementById("message").value = ""; // Limpiar input
  }
});

// Escuchar mensajes del servidor
socket.on("mensaje", (data) => {
  let chatBox = document.getElementById("chat-box");
  let mensajeHTML = `<p><strong>${data.userId}:</strong> ${data.message}</p>`;
  chatBox.innerHTML += mensajeHTML;
});
