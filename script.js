const tablero = document.getElementById('tablero');

// Array de nombres de imágenes que usarás para las cartas
const imagenes = [
    'imagen1.jpg', 'imagen2.jpg', 'imagen3.jpg', 'imagen4.jpg',
    'imagen5.jpg', 'imagen6.jpg', 'imagen7.jpg', 'imagen8.jpg'
];

// Duplicar las imágenes para hacer las parejas
let cartas = [...imagenes, ...imagenes];
let cartasReveladas = [];
let emparejadas = 0;

// Mezclar las cartas de forma aleatoria
function mezclar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Intercambiar los elementos
    }
}

// Crear el tablero y las cartas
function crearTablero() {
    mezclar(cartas);

    cartas.forEach((imagen, index) => {
        const carta = document.createElement('div');
        carta.classList.add('carta');
        carta.setAttribute('data-index', index);

        // Crear imagen dentro de la carta
        const img = document.createElement('img');
        img.setAttribute('src', `imagenes/${imagen}`); // Ruta de la imagen
        img.alt = imagen;
        carta.appendChild(img);

        // Evento al hacer clic en una carta
        carta.addEventListener('click', () => voltearCarta(carta));

        tablero.appendChild(carta);
    });
}

// Voltear la carta al hacer clic
function voltearCarta(carta) {
    if (cartasReveladas.length === 2 || carta.classList.contains('flip')) return; // No voltear más cartas si ya hay dos o la carta ya está volteada

    carta.classList.add('flip');
    const index = carta.getAttribute('data-index');
    cartasReveladas.push({ carta, index });

    // Comprobar si dos cartas están reveladas
    if (cartasReveladas.length === 2) {
        setTimeout(comprobarCoincidencia, 1000); // Comprobar si las cartas coinciden
    }
}

// Comprobar si las dos cartas reveladas coinciden
function comprobarCoincidencia() {
    const [primeraCarta, segundaCarta] = cartasReveladas;

    if (cartas[primeraCarta.index] === cartas[segundaCarta.index]) {
        emparejadas++;
        if (emparejadas === imagenes.length) {
            setTimeout(() => {
                alert('¡Muy bien cariño :) !');
                window.location.href = 'index2.html';  // Redirigir a otra página cuando se complete el juego
            }, 500);
        }
    } else {
        // Si no coinciden, voltear las cartas de nuevo
        primeraCarta.carta.classList.remove('flip');
        segundaCarta.carta.classList.remove('flip');
    }

    cartasReveladas = [];
}

// Iniciar el juego
crearTablero();
