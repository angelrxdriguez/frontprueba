document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("registerBtn").addEventListener("click", function () {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const repeatPassword = document.getElementById("repeatPassword").value;

        if (!email || !password || !repeatPassword) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        if (password !== repeatPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        console.log({ email, password });  // Verifica que los datos sean correctos

        fetch("https://backprueba-two.vercel.app/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);  // Verifica la respuesta del servidor
            if (data.success) {
                alert("Registro exitoso. Ahora puedes iniciar sesión.");
                window.location.href = "login.html";
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error("Error en el registro:", error);
            alert("Hubo un problema con el registro.",error);
        });
    });
});
$(document).ready(function () {
    $("#iniciarsesion").click(function () {
        const email = $("#login").val();
        const password = $("#contra").val();
    
        if (!email || !password) {
            alert("Por favor, ingresa tu correo y contraseña.");
            return;
        }
    
        $.ajax({
            url: "https://backprueba-two.vercel.app/api/login",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ email, password }),
            success: function (data) {
                console.log(data); // Ver la respuesta en la consola
    
                if (data.success) {
                    alert("Inicio de sesión exitoso. Redirigiendo...");
                    //usuario admin !!!!
                    if (email === "admin@admin.admin" && password === "admin") {
                        window.location.href = "administrador.html";
                    } else {
                        window.location.href = "index.html";
                    }
                } else {
                    alert(data.message);
                }
            },
            error: function (xhr, status, error) {
                console.error("Error en el inicio de sesión:", error);
                alert("Hubo un problema con el inicio de sesión.");
            }
        });
    });
    $.ajax({
        url: "https://backprueba-two.vercel.app/api/usuarios", 
        method: "GET",
        success: function(response) {
            if (response.success) {
                let contenedor = $(".contenedor");
                contenedor.empty(); // Vacía el contenedor antes de agregar los usuarios
                
                response.usuarios.forEach(usuario => {
                    let usuarioHTML = `
                        <div class="persona">
                            <h3>${usuario.email}</h3>
                            <button class="conectar-btn" data-user="${usuario._id}">Conectar</button>
                        </div>
                    `;
                    contenedor.append(usuarioHTML);
                });

                // Evento para el botón de conectar
                $(".conectar-btn").click(function() {
                    let userId = $(this).data("user");
                    window.location.href = `chatroom.html?user_id=${userId}`;
                });
            } else {
                console.error("Error al obtener usuarios:", response.message);
            }
        },
        error: function(err) {
            console.error("Error en la petición AJAX:", err);
        }
    });
});






























































































































































































//angel