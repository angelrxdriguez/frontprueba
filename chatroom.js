document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const userId = params.get("user_id");
  const loggedUser = JSON.parse(localStorage.getItem("usuarioLogueado")); // Obtener usuario logueado

  if (!userId || !loggedUser) {
      alert("Error: No se han detectado usuarios válidos para el chat.");
      return;
  }

  console.log("Usuario logueado:", loggedUser.email);
  console.log("Usuario con el que chateará:", userId);

  // Generar un chatRoomId único entre los dos usuarios
  const chatRoomId = `${loggedUser.email}-${userId}`;
  console.log("Sala de chat:", chatRoomId);

  // Conectar al socket y unirse a la sala
  const socket = io("https://tu-servidor-sockets.com"); 
  socket.emit("joinRoom", chatRoomId);

  // Escuchar mensajes
  socket.on("mensajePrivado", (mensaje) => {
      console.log("Mensaje recibido:", mensaje);
  });

  // Evento para enviar mensajes
  document.getElementById("send").addEventListener("click", function () {
      const mensaje = document.getElementById("message").value;
      if (mensaje.trim() !== "") {
          socket.emit("mensajePrivado", { chatRoomId, mensaje, sender: loggedUser.email });
          document.getElementById("message").value = "";
      }
  });

  // Mostrar los mensajes en la pantalla
  socket.on("mensajePrivado", (data) => {
      const chatBox = document.getElementById("chat-box");
      const mensajeHTML = `<p><strong>${data.sender}:</strong> ${data.mensaje}</p>`;
      chatBox.innerHTML += mensajeHTML;
  });
});