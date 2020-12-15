// IRON AGE 2020
let screen = [800,600];
let pl_sprites;
let en_sprites;
let bk_sprites;
let pixel = 3; // tamanho do pixel
let score = 0;

let player_speed = 3;
let shield = 100;
let sprite_name = "main"
let player_bomb = "bomb";
let shooting = [];
let bombing = [];
let shoot_hitbox = [3*pixel,pixel];

let enemys = [];
let scene = [];
let scene_speed = 1;
let stage = 0;
let song;
let stage_length;
let stage_percent = 0;
let sound_efects = [];
let sel_weapon = 0;
let p_bomb = ["bomb"]

let player = {
    x :  screen[0] / 2,
    y : screen[1] /2,
    hitbox : [0,0],
    power : 5

}

let p1 = player;
let enemy = [];

function preload() {

    pl_sprites = loadJSON('assets/ironage.json');
    en_sprites = loadJSON('assets/enemys.json');
    bk_sprites = loadJSON('assets/background.json');
    font = loadFont('assets/press_start.ttf');
    sound_efects.push(loadSound('assets/efects/start.wav')) // [0]
    sound_efects.push(loadSound('assets/efects/shot.wav')) // [1]    
    song = loadSound('assets/Trooper.mp3');

}

function setup() {
    createCanvas(screen[0], screen[1]);
    textSize(20);
    textAlign(10, 10);
    textFont(font);

    p1.hitbox[0] = pl_sprites.player.main.x;
    p1.hitbox[1] = pl_sprites.player.main.y;
    scene.push(new Background("up","cavern","montanhas"));
    scene.push(new Background("down","cavern","arvores"));
    new_viper(1);

}

function draw() {
    background(0, 0, 0);
    fill(255);
    draw_screen(stage);
}
