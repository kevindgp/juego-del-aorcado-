// Agregar sonidos
const sonidoPerder = new Audio('sonidos/derrota.mp3');
const sonidoAcierto = new Audio('sonidos/victoria.mp3');

// lista de palabras con pistas
const palabras = [
    { palabra: "manzana", pista: "Una fruta que es verde o roja" },
    { palabra: "jirafa", pista: "El animal más alto de la selva" },
    { palabra: "teclado", pista: "Usado para escribir en el computador" },
    { palabra: "oceano", pista: "Un cuerpo masivo de agua salada" },
    { palabra: "diamante", pista: "Una gema preciosa y muy valiosa" },
    { palabra: "sol", pista: "La estrella que ilumina la Tierra" },
    { palabra: "montaña", pista: "Una elevación natural del terreno" },
    { palabra: "avion", pista: "Medio de transporte que vuela" },
    { palabra: "estrella", pista: "Objeto brillante en el cielo nocturno" },
    { palabra: "camion", pista: "Vehículo grande usado para transportar cosas" },
    { palabra: "helado", pista: "Postre frío hecho con leche o frutas" },
    { palabra: "computadora", pista: "Dispositivo usado para procesar información" },
    { palabra: "mariposa", pista: "Un insecto con alas coloridas" },
    { palabra: "puente", pista: "Estructura que conecta dos lugares separados" },
    { palabra: "reloj", pista: "Objeto que muestra la hora" },
    { palabra: "pirata", pista: "Persona que roba en alta mar" },
    { palabra: "caballo", pista: "Animal que se puede montar y corre rápido" },
    { palabra: "luna", pista: "Satélite natural que órbita la Tierra" },
    { palabra: "arcoiris", pista: "Fenómeno de colores en el cielo tras la lluvia" },
    { palabra: "tren", pista: "Medio de transporte que se mueve sobre rieles" }
];

let palabraActual;
let palabraOculta;
let puntuacion = 0;
let tiempo = 60;
let temporizador;
let juegoActivo = false;
let errores = 0;

// DOM Elements
const pistaEl = document.getElementById("pista");
const palabraOcultaEl = document.getElementById("palabra-oculta");
const puntuacionEl = document.getElementById("puntuacion");
const tiempoEl = document.getElementById("tiempo");
const mensajeEl = document.getElementById("mensaje");
const letraInput = document.getElementById("letra");
const guessButton = document.getElementById("guess-button");
const restartButton = document.getElementById("restart-button");
const canvas = document.getElementById("ahorcado");
const ctx = canvas.getContext("2d");
const gameOverMessage = document.getElementById("game-over-message");

// Reiniciar el lienzo
function reiniciarCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    errores = 0;
    dibujarBase();
    gameOverMessage.classList.add("hidden");
}

// Dibujar la base del ahorcado
function dibujarBase() {
    ctx.lineWidth = 3;

    // Base del suelo
    ctx.beginPath();
    ctx.moveTo(10, 240);
    ctx.lineTo(190, 240);
    ctx.stroke();

    // Poste
    ctx.beginPath();
    ctx.moveTo(50, 240);
    ctx.lineTo(50, 20);
    ctx.stroke();

    // Soporte superior
    ctx.beginPath();
    ctx.moveTo(50, 20);
    ctx.lineTo(150, 20);
    ctx.stroke();

    // Cuerda
    ctx.beginPath();
    ctx.moveTo(150, 20);
    ctx.lineTo(150, 50);
    ctx.stroke();
}

// Dibujar partes del muñeco
function dibujarParte() {
    ctx.lineWidth = 3;
    ctx.strokeStyle = "black";

    switch (errores) {
        case 1: // Cabeza
            ctx.beginPath();
            ctx.arc(150, 70, 20, 0, Math.PI * 2);
            ctx.stroke();
            break;
        case 2: // Cuerpo
            ctx.beginPath();
            ctx.moveTo(150, 90);
            ctx.lineTo(150, 150);
            ctx.stroke();
            break;
        case 3: // Brazo izquierdo
            ctx.beginPath();
            ctx.moveTo(150, 100);
            ctx.lineTo(120, 130);
            ctx.stroke();
            break;
        case 4: // Brazo derecho
            ctx.beginPath();
            ctx.moveTo(150, 100);
            ctx.lineTo(180, 130);
            ctx.stroke();
            break;
        case 5: // Pierna izquierda
            ctx.beginPath();
            ctx.moveTo(150, 150);
            ctx.lineTo(130, 190);
            ctx.stroke();
            break;
        case 6: // Pierna derecha
            ctx.beginPath();
            ctx.moveTo(150, 150);
            ctx.lineTo(170, 190);
            ctx.stroke();
            break;
        case 7: // Sangre en el cuello y fin del juego
            ctx.fillStyle = "red";
            ctx.fillRect(145, 90, 10, 50); // Sangre desde el cuello
            sonidoPerder.play();  // Reproducir sonido de derrota
            gameOverMessage.classList.remove("hidden");
            mensajeEl.textContent = `¡Perdiste! La palabra era: ${palabraActual.palabra}`;
            juegoActivo = false;
            restartButton.classList.remove("hidden");
            clearInterval(temporizador);
            break;
    }
}

// Adivinar letra
function adivinar() {
    if (!juegoActivo) return;

    const letra = letraInput.value.toLowerCase();
    letraInput.value = '';

    if (!letra || letra.length !== 1) {
        mensajeEl.textContent = "¡Ingresa una sola letra!";
        return;
    }

    let acierto = false;

    for (let i = 0; i < palabraActual.palabra.length; i++) {
        if (palabraActual.palabra[i] === letra) {
            palabraOculta[i] = letra;
            acierto = true;
        }
    }

    palabraOcultaEl.textContent = palabraOculta.join(' ');

    if (acierto) {
        if (!palabraOculta.includes('_')) {
            // Solo reproducir el sonido de victoria cuando la palabra está completamente adivinada
            sonidoAcierto.play();  
            clearInterval(temporizador);
            puntuacion += 10;
            puntuacionEl.textContent = puntuacion;
            mensajeEl.textContent = "¡Adivinaste la palabra! ¡Felicitaciones!";
            juegoActivo = false;
            restartButton.classList.remove("hidden");
        } else {
            mensajeEl.textContent = "¡Vas bien! Sigue así.";
        }
    } else {
        errores++;
        dibujarParte();
        tiempo -= 3; // Restar 3 segundos por error
        mensajeEl.textContent = "¡Letra incorrecta!";
    }

    tiempoEl.textContent = tiempo;
}

// Actualizar el tiempo
function actualizarTiempo() {
    tiempo--;
    tiempoEl.textContent = tiempo;

    if (tiempo <= 0) {
        clearInterval(temporizador);
        juegoActivo = false;
        mensajeEl.textContent = `Se acabó el tiempo, la palabra es: ${palabraActual.palabra}`;
        restartButton.classList.remove("hidden");
    }
}

// Iniciar el juego
function iniciarJuego() {
    alert("AHORCADO");  // Al iniciar, muestra el mensaje "AHORCADO"
    
    palabraActual = palabras[Math.floor(Math.random() * palabras.length)];
    palabraOculta = Array(palabraActual.palabra.length).fill('_');
    puntuacion = 0;
    tiempo = 60;
    errores = 0;
    juegoActivo = true;

    reiniciarCanvas();

    // Actualizar la interfaz
    pistaEl.textContent = palabraActual.pista;
    palabraOcultaEl.textContent = palabraOculta.join(' ');
    puntuacionEl.textContent = puntuacion;
    tiempoEl.textContent = tiempo;
    mensajeEl.textContent = '';
    letraInput.value = '';
    restartButton.classList.add("hidden");

    // Iniciar el temporizador
    clearInterval(temporizador);
    temporizador = setInterval(actualizarTiempo, 1000);
}

// Listeners
guessButton.addEventListener("click", adivinar);
letraInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        adivinar();
    }
});
restartButton.addEventListener("click", iniciarJuego);

// Iniciar juego
iniciarJuego();
