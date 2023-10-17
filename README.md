# Tiny Troops Tactics

**Desarrolladores - Grupo 7:**

- Ana Ordoñez Gragera - a.ordonez.2021@alumnos.urjc.es - https://github.com/anaxrdonez 

- Eduardo Sánchez Abril - e.sancheza.2021@alumnos.urjc.es  - https://github.com/edwardeveloping  

- Álvaro Moreno García - a.morenog.2021@alumnos.ujrc.es - https://github.com/fkavaro 

- Paula González Stradiotto - p.gonzalezst.2021@alumnos.urjc.es - https://github.com/stradiiotto 

## Introducción
En este documento se detalla la concepción de nuestro proyecto de prácticas para la asignatura de juegos en red: ‘Tiny Troops Tactics’. Se trata con importancia el apartado de jugabilidad y el de arte visual, ya que creemos que la experiencia que queremos dar depende esencialmente de estos.

## Sinopsis y concepto
*¡Dirige y conquista! Comienza controlando una pequeña región desde la que expandir tu poder y tu ejército. De esta manera podrás conquistar los territorios de otros imperios y tendrás la victoria asegurada.*

‘Tiny Troops Tactics’ es un juego en 2D de estrategia en tiempo real para uno o dos jugadores. El jugador domina una o varias regiones de un mapa hasta controlarlas todas. El único impedimento es la presencia de otro imperio cuyo objetivo es el mismo. El vencedor se determina según los movimientos y tácticas de las tropas con las que enfrentarse. 

De esta manera, si las tropas atacantes son superiores a las que defienden una región, esta pasa a ser conquistada. Las tropas se autogeneran y acumulan en sus respectivas regiones y solo el Comandante del ejército puede movilizarlas pasando por estas. Con el Comandante el jugador dirige la ofensiva. 

### Historia

En un mundo asolado por una guerra civil, los jugadores tendrán que convertirse en valientes comandantes que deberán liderar y dirigir a sus tropas en la conquista del territorio. La aventura comienza en un momento de caos, donde las naciones han caído y empiezan a surgir nuevos imperios. En el campo de batalla, la estrategia y la táctica son esenciales, utiliza el terreno sabiamente y elige el mejor momento para atacar, así lograrás hacerte con la victoria.

### Propósito

El propósito del juego es ofrecer al jugador una experiencia de estrategia y competitividad. Deberá poner a prueba su ingenio desarrollando estrategias para conquistar los distintos territorios y derrotar al rival.

## Aspectos de negocio y distribución

### Audiencia y plataformas

Este juego está dirigido a jugadores de todas las edades, pero se centra principalmente en un público adolescente que disfruta los juegos de estrategia y conquista. La audiencia principal incluye a amantes de los juegos de temática bélica y estética vectorial.

El juego estará disponible en PC a través de navegadores web y de forma local, de tal forma que los jugadores puedan elegir entre jugar en ordenadores distintos a través de una red, o en el mismo ordenador de manera local.

### Modelo de negocio y región

El juego seguirá un modelo de negocio “free to play”, es decir, será gratuito para jugar, pero incluirá microtransacciones, compras dentro de la aplicación para obtener distintos recursos, mejoras o ventajas competitivas. De esta forma, los jugadores interesados en el juego en sí podrán acceder a él sin necesidad de una inversión, mientras que los jugadores que deseen mejorar su experiencia, pueden gastar dinero en dichas compras opcionales.

Para este juego nos hemos decidido adscribir a la normativa PEGI (Pan European Game Information), un sistema de clasificación, dentro de la región europea, sobre el contenido de los videojuegos.


## Jugabilidad

‘Tiny Troops Tactics’ toma inspiración de juegos de estrategia y gestión en tiempo real como State.io, Microcosmun: survival of cells o Thronefall.  

El juego se divide en varios niveles. Cada nivel representa una provincia que forma parte del continente donde se desarrolla la historia. El jugador que conquiste más provincias gana la partida.  

Cada nivel contiene un mapa de varias ciudades —o nodos— con un número de población/guarnición. Estos nodos pueden ser conquistados o reconquistados por ambos jugadores.

![Gameplay State io](https://github.com/edwardeveloping/Coquestio/assets/131657047/1e1fdf19-5cd0-4c0d-9184-3d24a0bcd9f1)
![Selección de niveles State io](https://github.com/edwardeveloping/Coquestio/assets/131657047/e58d04f2-4c66-4562-8c08-f5b7fa3a191d)

*State.io Nivel (varios nodos/ciudades)* | *State.io Selector de niveles (varios niveles/provincias)*

Al inicio del nivel cada participante controla un nodo, el resto permanecen neutrales con una población fija. Los nodos controlados por jugadores generan progresivamente unidades en su interior.

Cada jugador dirige un general, una unidad que puede moverse libremente por el mapa. Este personaje tiene la capacidad de reclutar tropas en sus territorios, es decir: extraer las unidades que se generan en los nodos. Estas unidades le seguirán a donde quiera que vaya y, dada la orden pueden atacar una ciudad o guarnicionarse en ciudades aliadas.

Cuando se intenta conquistar otra ciudad que no forma parte de tu imperio las tropas atacantes se enfrentan a las defensoras. Cuando un atacante colisiona con la ciudad muere y reduce en uno la población del nodo, si esta llega a cero, el nodo pasa a ser neutral, y la próxima tropa que entre lo reclamará para su facción. 

Cuantas más tropas haya en una ciudad, más unidades serán necesarias para conquistarla. De esta manera el general puede reasignar sus fuerzas militares para expandir y defender su territorio.

Adicionalmente existirán algunas mejoras en cada nivel relacionadas con el general, las tropas o los nodos. Estas mejoras podrán desbloquearse controlando ciudades determinadas. Los jugadores paulatinamente será capaces de identificar cuales son las estrategias más viables.


### Progresión

Como ya se anticipó en el punto anterior la partida se divide en niveles/provincias. Cada nivel podrá conquistarse en una gran batalla por el control de las ciudades que lo componen. El jugador que elimine toda la presencia del oponente en una provincia reclamará un punto. Al final de la partida quien haya acumulado más puntos se alzará victorioso.

### Controles

‘Tiny Troops Tactics’ se maneja únicamente con el teclado. El juego tendrá dos versiones: Si se ejecuta en local u jugador controlará su general y los menús del juego con las teclas “wasd” y el espacio, la configuración principal. 

El otro jugador podrá utilizar las flechas y el shift derecho. En el caso de que jueguen en red desde distintos dispositivos, ambos utilizarán la configuración principal.


### Funcionalidades - MoSCoW

Entre las funcionalidades que queremos incluir en nuestro producto (ordenadas según el método MoSCoW) se encuentran:

| Must have | Should have | Could have | Will not have |
--- | --- | --- | --- 
| - Nodos que generan unidades - Control del general - Dos equipos - Combate - Al menos dos mapas/niveles | Al menos una mejora - Historia - Música y sonidos | Las unidades colisionan al vuelo - Poder elegir entre dos facciones - Visión del mapa general donde se engloba todos los niveles | Más de dos jugadores - Jugabilidad demasiado compleja 


## Arte y referencias
### Estilo visual

Como se mencionó anteriormente, ‘Tiny Troops Tactics’ será un juego 2D. Presentará gráficos planos y minimalistas generados de forma vectorial, utilizando colores vívidos y formas geométricas para crear una estética atractiva pero sin detalles complejos. Tomaremos referencias de juegos como Mini Metro o A good snowman is hard to build.

![MiniMetro](https://github.com/edwardeveloping/Coquestio/assets/131657047/1135d42f-0e9e-4636-8c81-04ff3f0f3485)  ![A good snowman is had to build](https://github.com/edwardeveloping/Coquestio/assets/131657047/59550bcd-51ae-4fb1-a6f2-3c4fdb9bef9b) 

### Diseño de interfaces

La interfaz será clara y sin distracciones, con elementos visuales nítidos y legibles para fomentar una jugabilidad con la que el usuario se familiarice pronto, permitiendo una experiencia de juego relajada que recuerda a títulos como Alto’s adventure.

![Alto's adventure](https://github.com/edwardeveloping/Coquestio/assets/131657047/b86013a6-1d14-49d0-a897-aab2d758b669)
![Alto's adventure gameplay](https://github.com/edwardeveloping/Coquestio/assets/131657047/3e34ce92-2dfb-4ee1-9028-639e120b1bff)

Constará de contadores que lleven el recuento de tropas en los terrenos y pequeños indicadores visuales que le otorguen feedback al usuario durante el progreso de la partida como que un terreno se tiña del tono del jugador que lo conquista.

### Mapa

Herramientas como Azgaar's Fantasy Map nos facilitarán el trabajo a la hora de generar los mapas necesarios para el desarrollo de nuestro juego. Una vez elegido un diseño que se adapte a nuestra idea de nivel, utilizaremos Adobe Illustrator para crear nuestro mapa definitivo.

![Mapa de azgaard](https://github.com/edwardeveloping/Coquestio/assets/131657047/b7642d3f-ceba-4fe0-abe3-fedb241fcbd3)
![Mapa propio](https://github.com/edwardeveloping/Coquestio/assets/131657047/c6f18574-4448-412f-aff1-eee8f5caaea9)


### Soldados

De la misma forma que la interfaz y el mapa, las tropas adoptarán un estilo minimalista que recordará a juegos con estética cartoon como Dumb ways to die.

![Dumb ways to die](https://github.com/edwardeveloping/Coquestio/assets/131657047/04739584-4d42-4e92-8ed8-0ac5c06fd3b5)

### Sonido

Será una melodía suave con instrumentos como el piano para crear una sensación de calma y contemplación que contribuirá a la atmósfera relajante generada por el estilo visual. Tendrá efectos de sonido sutiles al hacer click para una mayor inmersión del usuario.

https://www.youtube.com/watch?v=c0Hmvev5r7A 


