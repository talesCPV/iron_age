// IRON AGE 2020
let screen = [800,600];
let pl_sprites;
let en_sprites;
let bk_sprites;
let pixel = 3; // tamanho do pixel
let score = 0;
let back_color = [0,0,0];
let letter_color = [255];
let pause = false;
let ready = 0;

let player = new Player();
let sprite_name = "main"

let defeat = [false,false,false,false,false,false,false,false];
let get_weapons = [1,0,0,0,0,0,0,0,0];
let energy_wep =  [1,100,100,100,100,100,100,100,100];
let weap_names = ["M.BUSTER","FIRE BALL","ICE BALL","LASER","RIPPLE","SPREAD","FORCE FIELD", "NUCLER BOMB","TORP"];

let enemy = [];
let shooting = [];
let special = [];
let itens = [];
let scene = [];
let scene_bk = [];
let boss = [];

let scene_speed = 1;
let scene_move = true;
let stage = 0;
let song;

let sound_efects = [];

function preload() {

    pl_sprites = loadJSON('assets/ironage.json');
    en_sprites = loadJSON('assets/enemys.json');
    bk_sprites = loadJSON('assets/background.json');
    font = loadFont('assets/press_start.ttf');
    sound_efects.push(loadSound('assets/efects/start.wav'));   // [0]
    sound_efects.push(loadSound('assets/efects/shot.wav'));    // [1]    
    sound_efects.push(loadSound('assets/efects/pause.wav'));   // [2]    
    sound_efects.push(loadSound('assets/efects/destroy.wav')); // [3]    
    sound_efects.push(loadSound('assets/music/loop.mp3'));     // [4]    

}

function setup() {
    createCanvas(screen[0], screen[1]);
    textSize(20);
    frameRate(30)
    textAlign(10, 10);
    textFont(font);
    sound_efects.push(loadSound('assets/efects/energy.wav'));  // [5]    
    sound_efects.push(loadSound('assets/efects/laser.wav'));   // [6]    
    sound_efects.push(loadSound('assets/music/boss.mp3'));     // [7]    
    sound_efects.push(loadSound('assets/efects/boss_defeat.wav'));     // [8]    
    sound_efects.push(loadSound('assets/efects/get_item.wav'));     // [9]    

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

    save_memory();
}

function save_memory(){

    let max_enemy = 20;
    let max_shoting = 20;
    let max_special = 20;
    let max_itens = 5;
    let max_scene = 20;
    let max_bg = 10;
    let max_boss = 1;


    if(enemy.length > max_enemy){ enemy.splice(max_enemy,1); }

    if(shooting.length > max_shoting){ shooting.splice(max_shoting,1); }

    if(special.length > max_special){ special.splice(max_special,1); }

    if(itens.length > max_itens){ itens.splice(max_itens,1); }

    if(scene.length > max_scene){ scene.splice(max_scene,1); }

    if(scene_bk.length > max_bg){ scene_bk.splice(max_bg,1); }

    if(boss.length > max_boss){ boss.splice(max_boss,1); }


}