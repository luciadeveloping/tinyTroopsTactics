window.onload=function() {
    var config = {
        width: 600,
        height: 800,
        backgroundColor: 0x000000,
        scene: [EscenaInicio, EscenaJuego,EscenaAjustes, EscenaCreditos]
    }
    var game = new Phaser.Game(config);
}