// IRON AGE 2020
let screen = [800,600];
let sprites;
let back_sprites;
let pixel = 3; // tamanho do pixel
let score = 0;
let player_speed = 3;
let sprite_name = "main"
let player_weapon = "laser";
let player_bomb = "bomb";
let enemys = [];
let shooting = [];
let bombing = [];
let scene = [];
let scene_speed = 1;
let stage = 0;
let song;
let stage_length;
let stage_percent = 0;

let player = {
    x :  screen[0] / 2,
    y : screen[1] /2
}

let p1 = player;
let enemy = [];

function preload() {
    sprites = loadJSON('assets/ironage.json');
    back_sprites = loadJSON('assets/background.json');
    font = loadFont('assets/press_start.ttf');
//    song = loadSound('assets/Trooper.mp3');

}

function setup() {
    createCanvas(screen[0], screen[1]);
    textSize(20);
    textAlign(10, 10);
    textFont(font);

    scene.push(new Background("top","cavern","montanhas"));
    scene.push(new Background("down","cavern","arvores"));
    enemy.push(new Enemy_ball(200,200));
}

function draw() {
    background(0, 0, 0);
    fill(255);
    draw_screen(stage);
}