
function sort_item(x,y,N){ // N = % de chance de spawnar um itens
    let perc = Math.floor(random(0,100));
    if( perc < N ){
        let sort = Math.floor(random(1,100)); // probabilidade de cada item

        if(sort <= 10){
            itens.push(new Energy_Weapon(x,y)); // energia grande da arma
        }else if(sort <= 20){
            itens.push(new Energy_Ball(x,y)); // energia grande do player
        }else if(sort <= 35){
            itens.push(new Small_Energy_Weapon(x,y));  // energia pequena da arma
        }else if(sort <= 45){
            itens.push(new Small_Energy_Ball(x,y)); // energia pequena do player
        }else if(sort <= 60){
            itens.push(new Speed_up(x,y)); // + velocidade do player
        }else if(sort <= 75){
            itens.push(new Speed_down(x,y)); // - velocidade do player
        }else if(sort <= 83){
            itens.push(new Plus_shot(x,y)); // + tiros simultaneos
        }else if(sort <= 88){
            itens.push(new Plus_special(x,y)); // + tiros especiaos simultaneos
        }else if(sort <= 98){ 
            itens.push(new Energy_tank(x,y)); // + energy tank
        }else{
            itens.push(new Life(x,y)); // + vidas
        }
    }
}

class Enemy{
    constructor(x,y){
        this.x = width + x ;
        this.y = y;
        this.value = 100;
        this.power = 5;
        this.energy = 1;
        this.hitbox = [0,0];
        this.pivot = [1,1];
        this.count = 0;
    }
}

function new_enemy_balls(N){
    for(let i=0; i<N;i++){
        enemy.push(new Enemy_ball(200 + pixel*i*20));
    }
}

class Enemy_ball extends Enemy{
    constructor(x){
        let y = Math.floor(2,4) * 100;
        super(x,y);
        this.speed = 3;
        this.name = "enemy_ball";
        this.angle = 0;
        this.fall = false;
        this.side = random(0,2);
        this.hitbox = [en_sprites.enemys[this.name].x * pixel, en_sprites.enemys[this.name].y * pixel];
    }
}

Enemy_ball.prototype.move = function(N){
    this.x -= this.speed;
    if(this.fall){
        if(this.side > 1){
            this.y -= this.speed;
        }else{
            this.y += this.speed;
        }
    }

    if(!this.fall && this.x < width/2){
        this.fall = true;
    }

    this.angle += 0.2;

    if(this.angle > 360){
        this.angle = 0;
    }

    push();
    translate(this.x, this.y);
    rotate(this.angle);
    draw_sprite(0,0,en_sprites.enemys[this.name]);
    pop();

    if(this.x < -100 || this.energy <= 0){
        if(this.energy <= 0){
            score += this.value;
            sort_item(this.x,this.y,30);
        }
        enemy.splice(N,1);
    }
}

function new_moais(N){
    enemy.push(new Moais(N));
}

class Moais extends Enemy{    
    constructor(side){
        let y = height - 90 ;
        if(side == "top"){
            y = 140;
        }
        super(200,y);
        this.speed = 3;
        this.name =  "moais_close";
        this.energy = 10;
        this.power = 15;
        this.open = false;
        this.count = 0;
        this.side = side
        this.value = 800;
        this.hitbox = [en_sprites.enemys[this.name].x * pixel, en_sprites.enemys[this.name].y * pixel];               
    }
}

Moais.prototype.move = function(N){
    this.x -= scene_speed;
    this.count ++;
    if(this.count >= 200){
        this.name = "moais_open";
        if(this.count % 10 == 0){
            if(this.side == "top"){
                enemy.push(new Enemy_ring(this.x - width - 50,this.y - 20));
            }else{
                enemy.push(new Enemy_ring(this.x - width - 50,this.y + 20));                
            }
        }

    } if(this.count > 300){
        this.count = 0;
        this.name = "moais_close";
    }

    push();
    translate(this.x,this.y);
    if(this.side == "top"){
        scale(1,-1);
    }
    draw_sprite(0,0,en_sprites.enemys[this.name]);
    pop();

    if(this.x < -100){
        enemy.splice(N,1);
    }else if(this.energy <= 0){   
        if(this.name != "moais_broken"){
            score += this.value;
            sort_item(this.x,this.y,80);

        }
        this.name = "moais_broken";
        this.count = -1000;
        this.hitbox = [0,0];
    }
}

class Enemy_ring extends Enemy{
    constructor(x,y){
        super(x,y);
        this.speed = 3;
        this.name = "ring";
        this.fall = false;
        this.value = 50;
        this.hitbox = [en_sprites.shoot[this.name].x * pixel, en_sprites.shoot[this.name].y * pixel];
        this.power = 2;
    }
}

Enemy_ring.prototype.move =  function(N){
    this.x -= this.speed;
    if(this.fall){    
        this.y -= this.speed;
    }else{
        this.y += this.speed;
    }

    if(this.y < 60){
        this.fall = false;
    }else if(this.y > height - 90){
        this.fall = true;
    }

    draw_sprite(this.x,this.y,en_sprites.shoot[this.name]);

    if(this.x < -100 || this.energy <= 0){
        if(this.energy <= 0){
            score += this.value;
        }
        enemy.splice(N,1);
    }    

}

function new_viper(N){
    for(let i=0; i<N;i++){
        enemy.push(new Viper(200 + pixel*i*50));
    }
}

class Viper extends Enemy{
    constructor(x){
        let y = Math.floor(2,4) * 300;
        super(x,y);
        this.speed = 3;
        this.name = "viper";
        this.energy = 3;
        this.power = 8;
        this.angle = 0;
        this.fall = false;
        this.count = 0;
        this.hitbox = [en_sprites.enemys[this.name].x * pixel, en_sprites.enemys[this.name].y * pixel];
    }
}

Viper.prototype.move = function(N){
    this.count ++;

    if(this.count  == 100){
        enemy.push(new Viper_shot(this.x,this.y));
        this.count = 0;
    }

    if(this.x < player.x){
        this.x += this.speed/2;        
    }else{
        this.x -= this.speed/2;        
    }

    if(this.y < player.y){
        this.y += this.speed/2;        
    }else{
        this.y -= this.speed/2;        
    }    

    this.angle = Math.atan2(  Math.floor(this.y - player.y) * pixel , (this.x - player.x) * pixel );

    push();
    translate(this.x, this.y);
    rotate(this.angle);
    draw_sprite(0,0,en_sprites.enemys[this.name]);
    pop();

    if(this.x < -100 || this.energy <= 0){
        if(this.energy <= 0){
            score += this.value;
            sort_item(this.x,this.y,40);
        }
        enemy.splice(N,1);
    }
}

class Viper_shot extends Enemy{
    constructor(x,y){
        super(x - width,y);
        this.speed = 10;
        this.name = "viper_shoot";
        this.energy = 1;

        let vet = Math.abs(x - player.x) + Math.abs(y - player.y)

        this.offset_x = (x - player.x) / vet;
        this.offset_y = (y - player.y) / vet;
        this.hitbox = [pixel,pixel];

    }
}

Viper_shot.prototype.move =  function(N){
    
    this.y -=  this.speed * this.offset_y;
    this.x -= this.speed * this.offset_x;

    draw_sprite(this.x,this.y,en_sprites.shoot[this.name]);

    if(this.x < -10 || this.x > width + 10 ||  this.y > height + 10 || this.y < -10  || this.energy <= 0){
        enemy.splice(N,1);
    }    

}

function new_walker(n=70){
    enemy.push(new Walker(100,height-n));
}

class Walker extends Enemy{
    constructor(x,y){
        super(x,y);
        this.name = "walker_01";
        this.frame = 1;
        this.energy = 30;
        this.power = 50;
        this.count = 0;
        this.hitbox = [en_sprites.enemys[this.name].x , en_sprites.enemys[this.name].y + 20];               
    }
}

Walker.prototype.move = function(N){
    this.count ++;
    this.x -= scene_speed;

    if(this.count == 20 || this.count == 60){
        this.name = "walker_02";
        this.x -= 5; 
    }else if(this.count == 40 || this.count == 80){
        this.name = "walker_01";
        this.x -= 5;
        enemy.push(new Walker_shot(this.x,this.y));
    }else if(this.count == 100){
        this.count = 0;

    }

    draw_sprite(this.x,this.y,en_sprites.enemys[this.name]);

    if(this.x < -100 || this.energy <= 0){
        if(this.energy <= 0){
            score += this.value;
            sort_item(this.x,this.y,90);

        }
        enemy.splice(N,1);
    }    
}

class Walker_shot extends Viper_shot{
    constructor(x,y){
        super(x,y);
        this.speed = 10;
        this.power = 15;
        this.nome = "walker_shoot";
    }
}


class Thunder extends Enemy{
    constructor(x,y){
        super(x,y);
        this.x -= width;
        this.blink = 2;
        this.count = 0;
        this.hitbox = [15,70];
        this.power =  25;
        this.visible = true;
    }

}

Thunder.prototype.move = function(N){
    this.x -= scene_speed;
    this.count++;

    if(this.count % 10 == 0){
        this.visible = !this.visible;
    }

    if(this.visible){
        draw_sprite(this.x,this.y,bk_sprites.sea.thunder);
    }

    if(this.count == 50){
        enemy.splice(N,1);
    }

}


function new_sea_ship(n=70){
    enemy.push(new Sea_ship(100,height-n));
}

class Sea_ship extends Enemy{
    constructor(x,y){
        super(x,y);
        this.name = "sea_ship";
        this.frame = 1;
        this.energy = 30;
        this.power = 50;
        this.count = 0;
        this.hitbox = [en_sprites.enemys[this.name].x , en_sprites.enemys[this.name].y];               
    }
}

Sea_ship.prototype.move = function(N){
    this.count ++;
    this.x -= scene_speed;

    if(this.count == 40 ){
        this.count = 0;
        enemy.push(new Walker_shot(this.x,this.y));
    }

    draw_sprite(this.x,this.y,en_sprites.enemys[this.name]);

    if(this.x < -100 || this.energy <= 0){
        if(this.energy <= 0){
            score += this.value;
            sort_item(this.x,this.y,90);
        }

        enemy.splice(N,1);
    }    
}


function new_tank(n=50){
    enemy.push(new Tank(100,height-n));
}

class Tank extends Enemy{
    constructor(x,y){
        super(x,y);

        this.name = ["L_tank","L_canyon","L_canyon_fire"];
        this.energy = 15;
        this.angle = 0;
        this.index = 1;
        this.start_y = y;
        this.speed = 1;
        this.hitbox = [en_sprites.enemys[this.name[0]].x * pixel , en_sprites.enemys[this.name[0]].y * pixel *2];
    }
}


Tank.prototype.move = function(N){

    this.count ++;
    this.x -= scene_speed;

    if(this.count <= 100){
        this.x -= this.speed;
        if(this.count % 40 == 0){
            this.y += 5;
        }else if(this.count % 20 == 0) {
            this.y -= 5;
        }
    }else if(this.count <= 130){

    }else if(this.count <= 160){

    }else if(this.count <= 200){

        this.angle = Math.atan2 ( (this.y - player.y), (this.x - player.x) );

        if(this.count % 19 == 0){
            enemy.push(new Boss_Fire(this.x,this.y));
            this.index = 2;
        } else  {
            this.index = 1;
        }

    }else if(this.count <= 250){
        this.count = 0;
        this.y = this.start_y;
    }

    push();
    translate(this.x+20, this.y);
    rotate(this.angle);
    draw_sprite(0,0,en_sprites.enemys[this.name[this.index]]);
    pop();

    draw_sprite(this.x,this.y,en_sprites.enemys[this.name[0]]);

    if(this.x < -100 || this.energy <= 0){
        if(this.energy <= 0){
            score += this.value;
            sort_item(this.x,this.y,90);
        }

        enemy.splice(N,1);
    } 

}

function new_bomber(){
    enemy.push(new Bomber(100,60));
}

class Bomber extends Enemy{
    constructor(x,y){
        super(x,y);
        this.energy = 50;
        this.name = "air_bomber";
        this.fan = "fan";
        this.speed = 1;
        this.hitbox = [en_sprites.enemys[this.name].x * pixel , en_sprites.enemys[this.name].y * pixel *2];

    }
}

Bomber.prototype.move = function(N){
    this.count ++;
    this.x -= scene_speed+this.speed;

    if(this.count % 50 == 0){
        n_bomb(this.x, this.y + 20);
    }

    if(this.count % 2 == 0){
        draw_sprite(this.x-120,this.y,en_sprites.enemys[this.fan]); 
    }

    draw_sprite(this.x,this.y,en_sprites.enemys[this.name]);


    if(this.x < -100 || this.energy <= 0){
        if(this.energy <= 0){
            score += this.value;
            sort_item(this.x,this.y,90);
        }

        enemy.splice(N,1);
    } 

}

function n_bomb(x,y){
    enemy.push(new N_bomb(x,y));
}

class N_bomb extends Enemy{
    constructor(x,y){
        super(x-width, y);
        this.energy = 10;
        this.name = "n_bomb";
        this.power = 15;
        this.speed = 10;
        this.hitbox = [en_sprites.shoot[this.name].x * pixel , en_sprites.shoot[this.name].y * pixel *2];
    }
}


N_bomb.prototype.move =  function(N){
    
    this.y +=  this.speed ;

    draw_sprite(this.x,this.y,en_sprites.shoot[this.name]);

    if( this.y > height + 10 || this.energy <= 0){
        enemy.splice(N,1);
    }    
}

function catapult(n=50){
    enemy.push(new Catapult(100,height-n));
}

class Catapult extends Enemy{
    constructor(x,y){
        super(x,y);
        this.name = ["catapult_00","catapult_01","catapult_02"];
        this.energy = 15;
        this.value = 50;
        this.index = 0;
        this.hitbox = [en_sprites.enemys[this.name[0]].x * pixel , en_sprites.enemys[this.name[0]].y * pixel *2];
    }
}

Catapult.prototype.move = function(N){

    this.count ++;
    if(scene_move){
        this.x -= scene_speed;
    }

    if(this.count <= 130){
        this.index=0
    }else if(this.count <= 135){
        this.index=1
    }else if(this.count <= 140){        
        this.index=2
        enemy.push(new Boss_Fire(this.x+40,this.y - 10));
    }else if(this.count <= 136){

    }else if(this.count <= 250){
        this.count = 0;
        
    }

    draw_sprite(this.x,this.y,en_sprites.enemys[this.name[this.index]]);

    if(this.x < -100 || this.energy <= 0){
        if(this.energy <= 0){
            score += this.value;
            sort_item(this.x,this.y,90);
        }

        enemy.splice(N,1);
    }     

}



function rocket(n=50,s="down"){
    enemy.push(new Rocket(100,height-n,s));
}

class Rocket extends Enemy{
    constructor(x,y,side){
        super(x,y);
        this.name = ["rocket_00","rocket_01"];
        this.side = side;
        this.power = 30;
        this.value = 180;
        this.energy = 15;
        this.index = 0;
        this.angle = 0.03;
        this.speed = 0;
        this.shoot = false;
        this.scale = [1,1];        
        this.hitbox = [en_sprites.enemys[this.name[0]].x * pixel , en_sprites.enemys[this.name[0]].y * pixel *2];
        if (side == "up"){
            this.scale = [1,-1];
            this.y = -50;
        }
    }
}

Rocket.prototype.move = function(N){

    this.count ++;
    this.x -= scene_speed;
    if (this.side == "up"){
        this.y += this.speed;
    }else{
        this.y -= this.speed;
    }

    if(this.count % 2 == 0){
        this.angle *= -1;
    }

    if (this.speed > 0) {
        this.angle = 0;
    }

    if(player.x >= this.x - 50 && player.x <= this.x + 50 && !this.shoot){
        this.speed = (player.speed * Math.abs(player.y-this.y)) / Math.abs(player.x-this.x);
        this.shoot = true;
        this.index = 1;
    }

    if(this.count >= 250){
        this.count = 0;    
    }


    push();
    translate(this.x, this.y);
    rotate(this.angle);
    scale(this.scale);
    draw_sprite(0,0,en_sprites.enemys[this.name[this.index]]);
    pop();

    if(this.y <= -100 || this.y >= height +100 || this.energy <= 0){
        if(this.energy <= 0){
            score += this.value;
            sort_item(this.x,this.y,90);
        }

        enemy.splice(N,1);
    }     

}

function tree(n=100){
    enemy.push(new Tree(100,height-n));
}

class Tree extends Enemy{
    constructor(x,y){
        super(x,y);
        this.name = ["arvore_01","arvore_02","arvore_03"];
        this.power = 15;
        this.value = 180;
        this.energy = 15;
        this.value = 50;
        this.index = Math.floor(random(0,2.99)) ;
        this.scale = [1,1];
        this.hitbox = [en_sprites.enemys[this.name[0]].x * pixel , en_sprites.enemys[this.name[0]].y * pixel *2];
    }
}
Tree.prototype.move = function(N){
    this.x -= scene_speed;

    push();
    translate(this.x, this.y);
    scale(this.scale);
    draw_sprite(0,0,en_sprites.enemys[this.name[this.index]]);
    pop();


    if(this.x <= -100 || this.energy <= 0){
        if(this.energy <= 0){
            score += this.value;
            sort_item(this.x,this.y,90);
        }
        enemy.splice(N,1);
    } 

}

function hell_fire(side = "down"){
    enemy.push(new Hell_fire(side));
}

class Hell_fire extends Enemy{
    constructor(side){
        let y = height - 50 ;
        let size = 1.5
        let scale = [size,size];
        if(side == "top"){
            y = 50;
            scale = [size,-size];
        }
        super(1000,y);        
        this.side = side;
        this.size = size;
        this.name = ["fire_01","fire_02","fire_03"];
        this.power = 20;
        this.value = 500;
        this.energy = 15;
        this.width = en_sprites.enemys[this.name[0]].x;
        this.height = en_sprites.enemys[this.name[0]].y;
        this.x = width + this.width * this.size * pixel;
        this.value = 50;
        this.index = 0;
        this.scale = scale;
        this.hitbox = [this.width * pixel * size , this.height * pixel * size];
    }
}

Hell_fire.prototype.move = function(N){
    if(scene_move){
        this.x -= scene_speed;
    }

    this.count ++;
    if(this.count % 9 == 0){
        this.index = 1;
    }else if(this.count % 6 == 0){
        this.index = 2;
    }else if(this.count % 3 == 0){
        this.index = 0;
//        this.count = 0;
    }


      if(this.count ==  Math.floor(this.width / scene_speed) * this.size * pixel ) {
        hell_fire(this.side);
      }

    push();
    translate(this.x, this.y);
    scale(this.scale);
    draw_sprite(0,0,en_sprites.enemys[this.name[this.index]]);
    pop();


    if(this.x <= -this.width * this.size * pixel ){
        enemy.splice(N,1);
    } 

}

Hell_fire.prototype.fill = function(){

  for(let i=0; i < width+this.width * this.size * pixel ; i+=this.width * pixel * this.size){
    hell_fire(this.side);      
      enemy[enemy.length-1].x = i;
      enemy[enemy.length-1].count = this.width * this.size * pixel * 2;
  }

}

function new_fireball(n=-60,s="down"){
    enemy.push(new Fireball(100,height-n,s));
}

class Fireball extends Rocket{
    constructor(x,y,side){
        super(x,y,side);
        this.name = ["fireball","fireball"];          
    }
}


function boss_fireball(x,side){
    let y = height;
    if(side == "up"){
        y = 0;
    }
    enemy.push(new Boss_fireball(x-width,y,side));
}


class Boss_fireball extends Fireball{
    constructor(x,y,side){
        super(x,y,side);
        this.speed = 20;
    }
}

Boss_fireball.prototype.move = function(N){

    this.x -= scene_speed;
    if (this.side == "up"){
        this.y += this.speed;
        this.scale = [1,-1]; 
    }else{
        this.y -= this.speed;
        this.scale = [1,1]; 
    }

    push();
    translate(this.x, this.y);
    scale(this.scale);
    draw_sprite(0,0,en_sprites.enemys[this.name[this.index]]);
    pop();

    if(this.y <= -100 || this.y >= height +100 || this.energy <= 0){
        if(this.energy <= 0){
            score += this.value;
            sort_item(this.x,this.y,90);
        }

        enemy.splice(N,1);
    }     

}