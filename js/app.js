let currentmusic = 0

const music = document.querySelector('#audio') // Con document accedemos a la pagina; accedemos al id de audio
const seekBar = document.querySelector('.seek-bar') // Accedemos a la clase seek-bar con el metodo querySelector()
const songName = document.querySelector('.music-name') // Accedemos a la clase music-name... etc
const artistName = document.querySelector('.artist-name')
const disk = document.querySelector('.disk')
const currentTime = document.querySelector('.current-time')
const musicDuration = document.querySelector('.song-duration')
const playBtn = document.querySelector('.play-btn')
const forwardBtn = document.querySelector('.forward-btn')
const backwardBtn = document.querySelector('.backward-btn')

// Agregamos un evento al boton de play/pause
playBtn.addEventListener('click', ()=>{ // Queremos que escuche el evento 'click
    if(playBtn.className.includes('pause')){ // Si el boton se encuentra en pausa, se va a reproducir la musica
        music.play()
    }else{
        music.pause() // Si el boton se encuentra en play entonces la musica se pausa
    }
    playBtn.classList.toggle('pause')
    disk.classList.toggle('play')
})

// El parametro i será el numero de cancion
const setMusic = (i) => {
    seekBar.value = 0 // La barra de desplazamiento de tiempo comenzar'a en 0
    console.log(songs[i])
    let song = songs[i]
    currentMusic = i // La cancion actual es i
    music.src = song.path // El origen de la cancion; Otra forma de leer la propiedad 'path' es: song['path']
    songName.innerHTML = song.name // innerHTML --> Nos servira para cambiar, en este caso la etiqueta que contiene el nombre de la cancion (borra lo que esta escrito y sobreescribe)
    artistName.innerHTML = song.artist // innerHTML --> Cambia el nombre del artista en este caso
    disk.style.backgroundImage = `url('${song.cover}')` //Cambia la imagen de fondo del disco
                                    // NOTA: Los literal string o template string nos sirven para mezclar variables con cadenas de texto
    currentTime.innerHTML = '00:00' // Cuando comienza la cancion el tiempo de inicio sera de 00:00
    // Ponemos un delay con la funcion setTimeout()
    setTimeout(() =>{
        seekBar.max = music.duration // Le asignamos la duracion de la cancion al seekBar.max
        console.log('duracion', music.duration)
        musicDuration.innerHTML = formatTime(music.duration) // Con el metodo formatTime() Le daremos el formato de duracion del tiempo
                                                            // Esta funcion la hemos creado nosotros
    }, 300) // Después de 300 milisegundos ejecutara lo que esta dentro de la función
}

setMusic(0) // Iniciamos reproduciendo en la cancion numero 0 (posicion 0 de la lista)

// Hacemos la conversion de segundos a --> minutos:segundos
const formatTime = (time) => {
    let min = Math.floor(time / 60) // Se hace la division del tiempo entre 60 para encontrar los minutos totales
                                    // El resultado se redondeara hacia abajo con el método floor()
    if (min < 10) { // Si los minutos son menores a 10 minutos, el tiempo aparecera comenzando por un 0. ej. 03
        min = `0${ min }` // Ej. 05 , 02 , 09
    }
    let sec = Math.floor(time % 60) // Se le saca el residuo al tiempo para encontrar los segundos y se redondeara hacia abajo
                                    // con el metodo floor()
    if (sec < 10){ // Si los segundos son menores a 10, entonces el tiempo en segundos se mostrara comenzando por un 0
        sec = `0${ sec }` // Ej. 03 , 08 , 09
    }

    return `${min}:${sec}` // Regresamos el tiempo formateado de la forma --> 00:00 (minutos:segundos)
}

// Trabajar con el seek-bar
setInterval(() => {
    seekBar.value = music.currentTime   // music es el pluggin para reproducir la cancion, el pluggin tiene
                                        // por defecto una propiedad que se llama "currentTime", esto nos sirve para
                                        // que la barra de progreso del tiempo se vaya desplazando mientras se reproduce la canción
    currentTime.innerHTML = formatTime(music.currentTime) // Se actualiza el tiempo de progreso de la canción

    // Si el tiempo actual es igual al tiempo total, se debe pasar a la siguiente canción
    // se escribe "===" porque ademas de comparar los valores comparamos el tipo de dato
    // cuando solamente se escribe "==" solo se esta comparando el valor de la variable pero no compara
    // el tipo de dato de la variable que estamos comparando
    if(Math.floor(music.currentTime) === Math.floor(seekBar.max)){
        forwardBtn.click() // Si ya se llegó al tiempo total, pasamos a la siguiente canción
    }
}, 1000)

// Funciones para adelantar y atrasar

// Para el boton de adelantar
forwardBtn.addEventListener('click', () => {
    // La variable "currentmusic" contiene la cancion actual que se esta reproduciendo
    // La variable "songs" contiene todas las canciones
    // Si currentmusic es mayor al tamano total de la lista de canciones, comenzara a reproducir la primera cancion
    if(currentmusic >= songs.length - 1) {
        currentmusic = 0
    } else {
        currentmusic++ // De lo contrario se pasará a la siguiente cancion
    }
    setMusic(currentmusic)
    playMusic()
})