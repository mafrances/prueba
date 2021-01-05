Conecta 4
=========

El objetivo es hacer el típico juego del "4 en raya" con los estilos básicos para que el juego sea usable (que sea mas o menos bonito importa menos).

## Vistas

### Pantalla inicial:
- 2 inputs para los nombres de los jugadores
- un input numérico o un select para elegir el número de columnas (entre 5 y 15)
- Boton de start

### Pantalla de juego
- Informacion de turno: "Es tu turno, jugador_x"
- Tablero
- Botones: Se añaden fichas haciendo click en las columnas

### Pantalla final:
- Informacion de turno: "Has ganado jugador_X!"
- Tablero
- Boton para volver a la pantalla de inicio
- Boton para volver a jugar

## Formas de pintar en el DOM:

- Quizá usando [posthtml](https://github.com/posthtml/posthtml) para insertar html en el elemento #root (ver [posthtml-insert-at](https://github.com/posthtml/posthtml-insert-at))
- Usando alguna librería para hacer templates (nunjucks, Moustache,...) e insertarlos con element.innerHTML o la funcion html() de jquery.
- Si se complica la cosa no te ralles y tira por alguna librería de componentización tipo react, preact,...

## Helpers:

Hay varias funciones ya hechas que pueden ser útiles:
- createBoard: crea la matriz de filas y columnas
- isBoardFull: checkea si el tablero está lleno
- isBoardColumnFull: checkea si una columna ya está llena
- hasFourInline: checkea si existe un cuatro en raya
