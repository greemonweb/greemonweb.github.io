"use strict"

//declaracion variables
var nick, apellidos, edad, genero, jugar, winnings, casillas, movimientos,
    turno = true //turno = true para marcar X, false para marcar O

//carga eventos

window.addEventListener("load", () => {
    nick = document.getElementById("nick")
    apellidos = document.getElementById("apellidos")
    edad = document.getElementById("edad")
    let generos = document.getElementsByName("genero")
    generos.forEach(element => {
        if (element.checked) {
            genero = element
        }
    });

    jugar = document.getElementById("jugar-button")
    jugar.addEventListener("click", comenzarPartida)
})

var comenzarPartida = () => {
    if (validarCampos()) {
        winnings = [
            [0, 1, 2],
            [0, 3, 6],
            [0, 4, 8],
            [1, 4, 7],
            [2, 4, 6],
            [2, 5, 8],
            [3, 4, 5],
            [6, 7, 8]
        ]
        casillas = ["", "", "", "", "", "", "", ""]
        movimientos = 9
        limpiar()
        crearTitulo()
        generarTabla()
    }
}

var validarCampos = () => {
    let completos = true;
    if (nick.value == "" || nick.value == null || invalidNick()) {
        nick.style.boxShadow = "0 0 3px red"
        nick.placeholder = "Campo requerido"
        completos = false
    }
    if (apellidos.value == "" || apellidos.value == null) {

        apellidos.style.boxShadow = "0 0 3px red"
        apellidos.placeholder = "Campo requerido"
        completos = false
    }
    if (edad.value == "" || edad.value == null) {
        edad.style.boxShadow = "0 0 3px red"
        edad.placeholder = "Campo requerido"
        completos = false
    }
    return completos
}

var invalidNick = () => {
    let expres = /^[A-Z]{1,3}[a-z]{3}[\d]{3}([\W]|_){1}[\d]{2}$/ //De 1 a 3 mayus, 3 minus, 3 digitos, 1 caracter especial y 2 digitos (el \W es igual a [^a-zA-Z0-9_]).
    if (expres.test(nick.value)) {
        return false
    } else {
        alert("El nick debe tener 1-3 Mayusculas, 3 minusculas,3 digitos, 1 caracter especial y 2 digitos, en este orden. Ej: Abcd123@45 ó ABCdef123%45")
        return true
    }
}

var crearTitulo = () => {
    let titulo = document.createElement("h3")
    titulo.id = "titulo"
    document.body.appendChild(titulo)
    titulo.innerText = "TIC-TAC-TOE"
}

var generarTabla = () => {
    let contador = 0;
    let tabla = document.createElement("table")
    tabla.id = "tabla";
    for (let i = 0; i < 3; i++) {
        let tr = document.createElement("tr")
        tabla.appendChild(tr)
        for (let k = 0; k < 3; k++) {
            let td = document.createElement("td")
            td.id = contador;
            td.addEventListener("click", marcar)
            tr.appendChild(td)
            contador++;
        }
    }
    document.body.appendChild(tabla)

}

var limpiar = () => {
    let titulo = document.getElementById("titulo")
    let tabla = document.getElementById("tabla")
    if (tabla != null) tabla.remove()
    if (titulo != null) titulo.remove()
}

function marcar() {
    let equipo
    if (turno) {
        equipo = "X"
    } else {
        equipo = "O"
    }
    this.innerText = equipo
    casillas[this.id] = equipo
    this.removeEventListener("click", marcar)
    turno = !turno
    movimientos--
    if (comprobar()) {
        alert(`El equipo ${this.textContent} ha ganado`)
        finalJuego()
    }

}

function comprobar() {
    let win = false;
    for (let i = 0; i < winnings.length || !win; i++) {
        let pos1 = winnings[i][0],
            pos2 = winnings[i][1],
            pos3 = winnings[i][2]
        if ((casillas[pos1] != "" || casillas[pos2] != "" || casillas[pos3] != "") && (casillas[pos1] == casillas[pos2] && casillas[pos2] == casillas[pos3])) {
            win = true
        }
    }
    if (movimientos == 0 && !win) {
        alert("Ha habido un empate")
    }
    console.log(movimientos + " : " + win);
    return win
}

var finalJuego = () => {
    for (let i = 0; i < 9; i++) {
        document.getElementById(i).removeEventListener("click", marcar)
    }
}