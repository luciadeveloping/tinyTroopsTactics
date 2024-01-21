# Tiny Troops Tactics

**Desarrolladores - Grupo 7:**

- Ana Ordóñez Gragera - a.ordonez.2021@alumnos.urjc.es - https://github.com/anaxrdonez 

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

## Cambios y progreso.

A medida que el desarrollo avanza muchas ideas han tenido que adaptarse a la realidad del proyecto pero en general se ha implementado el núcleo jugable. 
Si analizamos la matriz MoSCoW inicial la mayor parte de la columna del Must Have está incluída en el juego, la parte que no ha podido completarse es la de realizar varios niveles que era la que menos prioridad tenía para la entrega.


## Escenas

Los jugadores interactúan y se mueven en todas las escenas con sus respectivas teclas e interactúan con los botones también con estas.

### Init y Bootloader

Estos ficheros auxiliares están encargados de inicializar y configurar la clase de juego de Phaser y cargar los assets necesarios respectivamente. 
Init crea el juego. En el se realiza la configuración del game y la del audio. Se importarán las escenas que componen el juego para construir un array de estas en la configuración.
Bootloader carga las imágenes de los jugadores, el mapa y sus zonas, los elementos de la interfaz y los audios que se usarán en las demás escenas.

### StartScene

La escena de inicio implementa el menú principal donde los usuarios pueden acceder a otras escenas.
En ella los dos jugadores podrán moverse por el espacio e interactuar con tres botones haciendo que las texturas de estos cambien. El botón PLAY inicia la GameScene y con ella la competición entre los jugadores. El botón CREDITS inicia la CreditsScene y el botón SETTING nos permite ir al menú de ajustes. 

![mainmenu](https://github.com/edwardeveloping/tinyTroopsTactics/assets/131657047/5274cfcc-e179-402e-96d2-62852e61bc96)


### SettingScene
La escena de ajustes es la encargada de la gestión del sonido. En ella los jugadores podrán moverse con sus respectivos controles e interactuar con dos botones, uno para habilitar o inhabilitar la música y otro para los efectos. Un tercer botón permitirá a los jugadores volver a la escena de inicio. 

![settings](https://github.com/edwardeveloping/tinyTroopsTactics/assets/131657047/319e97f0-bbf3-4d80-91ce-422c0fbc8fdf)


### GameScene

En la escena de juego se desarrolla la competición entre los dos jugadores. La escena se estructura con la ayuda de una familia de clases con una clase padre (SceneObject) que contiene métodos y atrubutos útiles para entidades dentro del mapa de juego, entre ellas se encuentran: Player, Node, Soldier y Plane. Todas contienen el groso de la implementación de la jugabilidad y se construyen por encima del motor de phaser. 
La funcionalidad de cada objeto está encapsulada en su clase correspondiente para mejor comprensión y limpieza del código. Así, player implementa su movimiento, la selección de nodos, la aparición de soldados...

Al principio del gameplay se muestra una guía.
![tutorial](https://github.com/edwardeveloping/tinyTroopsTactics/assets/131657047/34d7b843-7f06-440e-87b3-4d8a8e7fe21e)

![gameplay](https://github.com/edwardeveloping/tinyTroopsTactics/assets/131657047/007edf38-a289-455a-9ad3-beb583bddda3)


### FinalScene
Es la escena final donde se muestra al ganador de la competición según la condición de victoria implementada en la GameScene. 

![winP1](https://github.com/edwardeveloping/tinyTroopsTactics/assets/131657047/8fb66e9e-b2c8-4667-8546-f70c3871159b)
![winP2](https://github.com/edwardeveloping/tinyTroopsTactics/assets/131657047/fc92b52f-647e-49ba-a569-d37a4bd844fa)
![gameOver](https://github.com/edwardeveloping/tinyTroopsTactics/assets/131657047/7b3012da-f3b2-4dd4-9d2e-532a1e8b3a84)


### CreditsScene
En ella el movimiento de los jugadores está implementado como en el resto de escenas. Se asemeja la FinalScene ya que consta de un único botón con el que interactuar para retornar a la StartScene pero a diferencia de esta en la CreditsScene se muestra el logo del equipo y el nombre de cada uno de sus integrantes.

![credits](https://github.com/edwardeveloping/tinyTroopsTactics/assets/131657047/877f7852-8df8-4188-8614-49779108b49d)

## Diagrama de flujo.

![diagram](https://github.com/edwardeveloping/tinyTroopsTactics/assets/131657047/612624aa-2642-4673-a81e-2bd4dcadcf16)

# RED Y WEBSOCKET
Para la implementación del juego en red se utilizó la comunicación entre WebScokets a travése de un servidor.

![Captura de pantalla 2024-01-21 201204](https://github.com/edwardeveloping/tinyTroopsTactics/assets/138675155/6d4e0a96-4df8-4601-be7e-f427f0f0f921)

Se levantó un servidor a través de la biblioteca Spring y se configuró el uso de webscokets.
Utilizamos un "protocolo" propio para la comunicación entre diferentes clientes. Los dispositivos construyen un objeto JSON con los campos type y content, una vez los envían al servidor este lo propaga al otro cliente. Este a su vez es capaz de reconocer cada uno de los tipos de mensaje y codificar la información de vuelta al juego.

De esta manera el cliente es capaz de reconocer y almacenar su identificador dentro del juego (type=SesionID), leer la información del otro jugador (type=InputUpdate), etc.

Así mismo, debido a la observada poca fiabilidad de los websockets se han implementado sistemas auxiliares que ayudan a sincronizar el juego entre dos sesiones diferentes: (type=GameState) codifica la información de la pantalla de juego y la envía al otro usuario o (type=SceneChange) que ejecuta una segunda instrucción para cambiar de escena.
