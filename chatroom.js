const socket = io("https://backchat-production-604a.up.railway.app/");

// Obtener el usuario en sesión (debe estar guardado en localStorage o en una cookie)
const usuarioEnSesion = localStorage.getItem("usuario");

// Obtener el ID del usuario con el que queremos chatear
function getQueryParam(param) {
    let params = new URLSearchParams(window.location.search);
    return params.get(param);
}
let usuarioDestino = getQueryParam("user_id");

if (!usuarioEnSesion || !usuarioDestino) {
    alert("Error: No se han detectado usuarios válidos para el chat.");
}

// Crear una sala única basada en los dos IDs
const chatRoomId = [usuarioEnSesion, usuarioDestino].sort().join("_");

// Unirse a la sala privada
socket.emit("joinRoom", chatRoomId);

// Enviar mensaje
document.getElementById("send").addEventListener("click", () => {
    let message = document.getElementById("message").value;
  
    if (message.trim() !== "") {
        socket.emit("mensajePrivado", { chatRoomId, userId: usuarioEnSesion, message });
        document.getElementById("message").value = ""; // Limpiar input
    }
});

// Escuchar mensajes privados
socket.on("mensajePrivado", (data) => {
    let chatBox = document.getElementById("chat-box");
    let mensajeHTML = `<p><strong>${data.userId}:</strong> ${data.message}</p>`;
    chatBox.innerHTML += mensajeHTML;
});
