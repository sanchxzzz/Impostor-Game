// Lista masiva de personajes
const personajes = [
  // Futbolistas
  "Lionel Messi", "Cristiano Ronaldo", "Neymar", "Mbappé", "James Rodríguez",
  "Dembélé", "Karim Benzema", "Sergio Ramos", "Luis Suárez", "Zlatan Ibrahimović",
  "Kevin De Bruyne", "Luka Modric", "Paul Pogba", "Thiago Silva", "Kylian Mbappé",
  "Erling Haaland", "Robert Lewandowski", "Marcelo", "Alexis Sánchez", "Vinicius Jr.",
  "Hakimi", "Casemiro", "Rodri", "Di María", "Ousmane Dembélé",

  // Cantantes Trap/Reggaeton
  "Bad Bunny", "J Balvin", "Kris R.", "Pirlo", "Blessd", "Ryan Castro", "GeezyDee",
  "Feid", "Karol G", "Maluma", "Rauw Alejandro", "Anuel AA", "Trueno", "Ysy A",
  "Duki", "Cazzu", "Neo Pistea", "Bhavi", "Khea", "Reykon", "Farina", "Nio Garcia",

  // Actores
  "Leonardo DiCaprio", "Will Smith", "Robert Downey Jr.", "Chris Hemsworth", 
  "Zendaya", "Emma Watson", "Dwayne Johnson", "Scarlett Johansson", "Tom Holland",
  "Gal Gadot", "Chris Evans", "Ryan Reynolds", "Natalie Portman", "Margot Robbie",

  // Streamers
  "Westcol", "Ninja", "Tfue", "Shroud", "Rubius", "Auronplay", "Ibai", 
  "xQc", "Pokimane", "Myth", "Sodapoppin", "Valkyrae", "Luzu", "Coscu",

  // Personajes de ficción
  "Harry Potter", "Hermione Granger", "Ron Weasley", "Frodo", "Gandalf",
  "Iron Man", "Spider-Man", "Batman", "Superman", "Wonder Woman",
  "Thor", "Loki", "Hulk", "Black Panther", "Captain America"
];

// Variables principales
let jugadores = [];
let impostores = [];
let cantidadJugadores = 4; // por defecto
let cantidadImpostores = 1; // por defecto
let palabraInocente = "";

// Iniciar juego
function iniciarJuego() {
    jugadores = [];
    impostores = [];
    
    // Obtener nombre de jugadores
    for (let i = 1; i <= cantidadJugadores; i++) {
        let nombre = prompt(`Ingresa el nombre del jugador ${i}:`);
        if (!nombre) nombre = `Jugador ${i}`;
        jugadores.push({ nombre: nombre, palabra: "" });
    }
    
    // Elegir impostores al azar
    while (impostores.length < cantidadImpostores) {
        let idx = Math.floor(Math.random() * jugadores.length);
        if (!impostores.includes(idx)) impostores.push(idx);
    }
    
    // Elegir palabra de los inocentes
    palabraInocente = personajes[Math.floor(Math.random() * personajes.length)];
    
    // Asignar palabras
    jugadores.forEach((jugador, idx) => {
        if (impostores.includes(idx)) {
            jugador.palabra = "Impostor";
        } else {
            jugador.palabra = palabraInocente;
        }
    });
    
    mostrarTurnos();
}

// Mostrar turnos de cada jugador
function mostrarTurnos() {
    jugadores.forEach(jugador => {
        alert(`${jugador.nombre}, tu palabra es: ${jugador.palabra}`);
    });
    
    alert("Ronda terminada, ahora a votar!");
    votaciones();
}

// Votaciones
function votaciones() {
    let votos = [];
    
    jugadores.forEach((jugador, idx) => {
        let nombres = jugadores.map((j, i) => `${i+1}: ${j.nombre}`).join("\n");
        let voto = parseInt(prompt(`${jugador.nombre}, vota por quién eliminar:\n${nombres}`));
        votos.push(voto-1);
    });
    
    // Contar votos
    let conteo = {};
    votos.forEach(v => {
        if (conteo[v] === undefined) conteo[v] = 0;
        conteo[v]++;
    });
    
    // Encontrar jugador con más votos
    let maxVotos = -1;
    let eliminado = -1;
    for (let key in conteo) {
        if (conteo[key] > maxVotos) {
            maxVotos = conteo[key];
            eliminado = parseInt(key);
        }
    }
    
    // Mostrar resultado
    if (impostores.includes(eliminado)) {
        alert(`¡Has eliminado al impostor! Era ${jugadores[eliminado].nombre}`);
    } else {
        alert(`¡Has eliminado a un inocente! Era ${jugadores[eliminado].nombre}`);
    }
    
    alert("Fin de la partida");
}

// Cambiar cantidad de jugadores
function setCantidadJugadores(cantidad) {
    cantidadJugadores = Math.min(Math.max(cantidad,3),30); // mínimo 3, máximo 30
}

// Cambiar cantidad de impostores
function setCantidadImpostores(cantidad) {
    cantidadImpostores = Math.min(Math.max(cantidad,1),5); // mínimo 1, máximo 5
}
