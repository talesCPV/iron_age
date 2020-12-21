// IRON AGE 2020
let screen = [800,600];
let pl_sprites;
let en_sprites;
let bk_sprites;
let pixel = 3; // tamanho do pixel
let score = 0;
let back_color = [0,0,0];
let pause = false;


let player = new Player();
let sprite_name = "main"

let get_weapons = [1,1,1,1,1,1,1,1,1];
let energy_wep =  [1,100,100,100,100,100,100,100,100];
let weap_names = ["M.BUSTER","FIRE BALL","ICE BALL","LASER","RIPPLE","SPREAD","NEPAL BOMB", "NUCLER BOMB","TORP"];
let itens_name = ["none","plus","laser","ripple","spread","torp"];


let enemy = [];
let shooting = [];
let bombing = [];
let itens = [];
let scene = [];

let scene_speed = 1;
let stage = 0;
let song;
let stage_length;
let stage_percent = 0;
let sound_efects = [];

function preload() {

    pl_sprites = loadJSON('assets/ironage.json');
    en_sprites = loadJSON('assets/enemys.json');
    bk_sprites = loadJSON('assets/background.json');
    font = loadFont('assets/press_start.ttf');
    sound_efects.push(loadSound('assets/efects/start.wav')) // [0]
    sound_efects.push(loadSound('assets/efects/shot.wav')) // [1]    
    sound_efects.push(loadSound('assets/efects/pause.wav')) // [2]    
    sound_efects.push(loadSound('assets/efects/destroy.wav')) // [3]    
    sound_efects.push(loadSound('assets/Loop.mp3')) // [4]    

}

function setup() {
    createCanvas(screen[0], screen[1]);
    textSize(20);
    textAlign(10, 10);
    textFont(font);

    player.hitbox = [pl_sprites.player.main.x, pl_sprites.player.main.y];

// JOYSTICK
  window.addEventListener("gamepadconnected", function(e) {
  gamepadHandler(e, true);
  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
    e.gamepad.index, e.gamepad.id,
    e.gamepad.buttons.length, e.gamepad.axes.length);      
  });
    window.addEventListener("gamepaddisconnected", function(e) {
  console.log("Gamepad disconnected from index %d: %s",
    e.gamepad.index, e.gamepad.id);      
    gamepadHandler(e, false);
  }); 


}

function draw() {
    background(back_color);
    fill(255);   
    stage_select(stage);
    
}
