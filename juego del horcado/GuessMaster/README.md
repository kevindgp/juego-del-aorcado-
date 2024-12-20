# Juego de Ahorcado (GuessMaster)

Este es un juego de **Ahorcado** desarrollado en JavaScript, HTML y CSS. El objetivo del juego es adivinar la palabra oculta antes de que el muñeco sea ahorcado. Cada vez que se comete un error, se dibuja una parte del muñeco, y el tiempo se va reduciendo. El juego se puede reiniciar cuando se termina o se pierde.

## Tecnologías utilizadas

- **HTML**: Estructura básica de la página.
- **CSS**: Estilos para la página y el lienzo del ahorcado.
- **JavaScript**: Lógica del juego, temporizador y manejo de eventos.
- **Canvas**: Para dibujar el muñeco del ahorcado.

## Instalación

### Requisitos previos
Para ejecutar el juego, solo necesitas un navegador web moderno, ya que es un juego basado en la web.

1. Clona este repositorio en tu máquina local:

    ```bash
    git clone https://github.com/tu_usuario/tu_repositorio.git
    ```

2. Abre el archivo `index.html` en tu navegador preferido. No se necesita un servidor, ya que el juego puede ejecutarse localmente desde el navegador.

## Instrucciones del Juego

### Cómo jugar

1. **Inicio del juego**: Al iniciar el juego, una palabra oculta se seleccionará aleatoriamente de una lista de palabras predefinidas. La pista de la palabra se mostrará en la parte superior.
   
2. **Adivinar letras**: Para jugar, deberás escribir una letra en el campo de entrada y presionar "Adivinar" o la tecla **Enter** en tu teclado. Si la letra es correcta, se reemplazará la barra baja correspondiente en la palabra oculta. Si la letra es incorrecta, una parte del muñeco se dibujará en el lienzo.

3. **Objetivo**: El objetivo del juego es adivinar toda la palabra antes de que el muñeco sea completamente dibujado (es decir, antes de cometer 6 errores). Si adivinas correctamente la palabra, ganarás el juego.

4. **Pérdida del juego**: Si cometes 6 errores (se dibujan todas las partes del muñeco), perderás el juego y aparecerá un mensaje con la palabra correcta.

5. **Victoria**: Si adivinas la palabra antes de que se te acabe el tiempo o los errores, ganarás el juego y se reproducirá un sonido de victoria.

### Controles

- **Escribir una letra**: Ingresa una letra en el campo de texto y presiona **Enter** o haz clic en "Adivinar".
- **Reiniciar el juego**: Haz clic en el botón "Reiniciar" para comenzar un nuevo juego.

### Sonidos

El juego tiene sonidos que se reproducen en ciertos eventos:
- **Sonido de derrota**: Cuando el jugador pierde el juego (cuando el muñeco es completamente dibujado).
- **Sonido de victoria**: Cuando el jugador adivina correctamente toda la palabra.

## Estructura del Proyecto

El proyecto tiene la siguiente estructura:

. ├── index.html # El archivo principal de la aplicación ├── style.css # Estilos para la página y el lienzo ├── script.js # Lógica del juego └── sonidos/ ├── derrota.mp3 # Sonido cuando el jugador pierde └── victoria.mp3 # Sonido cuando el jugador gana



## Contribuir

Si deseas contribuir a este proyecto, puedes seguir estos pasos:

1. **Fork** este repositorio.
2. Crea una nueva rama (`git checkout -b nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Haz push a tu rama (`git push origin nueva-funcionalidad`).
5. Abre un pull request.

## Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

