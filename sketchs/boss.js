
class Boss{
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.count = 0;
		this.index = 0;
		this.energy = 0;
		this.begin = 100;
		this.power = 10;
		this.weak = []; // numero do indice do array de armas
		this.not_effect = [];
		this.name = "";
		this.background = bk_sprites.sea.agua;
		this.hitbox = [0,0];
		this.pivot = [1,1];
		this.size = [2,2];
		song.fade(0,5);
		sound_efects[7].loop();
		enemy = [];
		scene_move = false;
	}
}

Boss.prototype.come_here = function(){
    push();
    translate(this.x+this.begin, this.y);
   	scale(this.size);
    draw_sprite(0,0,en_sprites.boss[this.name[this.index]]);
    pop();
    this.begin -= 2;
    this.energy += 2;
}

Boss.prototype.draw_background = function(){
	scene = [];
		// show background (don't move anymore)
	for(let i= -this.background.x; i< width + this.background.x; i += this.background.x * pixel){
		draw_sprite(i,height,this.background);
	}
}


Boss.prototype.hit = function(N){
	if(this.weak.includes(player.weapon)){
		this.energy -= N*3;
	}else if(!this.not_effect.includes(player.weapon) ){
		this.energy -= N;
	}

}

function kraken(){
	boss.push(new Kraken(600));
}

class Kraken extends Boss{
	constructor(x){
		super(x,height);
		this.y = height - 40;
		this.name = ["kraken_head","kraken_arm"];
		this.width = en_sprites.boss.kraken_head.x;
		this.height = en_sprites.boss.kraken_head.y;
		this.weak = [8];
		this.not_effect = [1,3,4];
		this.background = bk_sprites.sea.agua;
		this.start = x;
	}
}


Kraken.prototype.atack = function(N){
	this.count++;

	if(this.index == 0){ // Levanta a cabeça pra fora d'agua
		this.x = this.start;
		this.size = [2,2];
		this.hitbox = [this.width * this.size[0] * pixel, this.height * this.size[1] * pixel];

	    if(this.count < 40){
			this.y -= 2;
		}else if(this.count < 80){

			if(this.count % 5 == 0){
				enemy.push(new Boss_Fire(this.x,this.y));
			}

		}else if(this.count < 120){
			this.y += 3;
		}else if(this.count == 300){
			this.count = 0;
			this.y = height - 40;
			this.index = 1;
		}

	}else{ // ataca com o tentáculo
		this.x -= 3;
		this.size = [3,3];

		if(this.count == 1){
			this.hitbox[1] *= 4;
		}else if(this.count < 40){
			this.y -= 2;
		}else if(this.count < 80){

			if(this.count % 20 == 0){
                enemy.push(new Thunder(this.count * 10,100));			
			}

			if(this.count % 50 == 0){
				enemy.push(new Boss_Fire(this.x,this.y));
			}

		}else if(this.count < 299){
			this.y += 3;
		}else if(this.count == 300){
			this.count = 0;
			this.y = height - 40;
			this.index = 0;
		}

	}

    push();
    translate(this.x, this.y);
   	scale(this.size);
    draw_sprite(0,0,en_sprites.boss[this.name[this.index]]);
    pop();

    this.draw_background();

}

function big_moais(){
	boss.push(new Big_Moais(600));
}

class Big_Moais extends Boss{
	constructor(x){
		super(x,height);
		this.y = height - 200;
		this.name = ["moai_close","moai_open"];
		this.width = en_sprites.boss.moai_close.x;
		this.height = en_sprites.boss.moai_close.y;
		this.weak = [3];
		this.not_effect = [1,5,6];
		this.background = bk_sprites.cavern.arvores;
		this.save_weak = [3];
		this.save_not_effect = [1,5,6]
		this.hitbox = [this.width * this.size[0] * pixel, this.height * this.size[1] * pixel];
	}

}

Big_Moais.prototype.atack = function(N){
	this.count++;

	if(this.index == 0){ // moai de boca fechada

		if(this.count == 1){
			this.weak = [];
			this.not_effect = [0,1,2,3,4,5,6,7,8];
		}

		if(this.count % 5 == 0){
			enemy.push(new Boss_Fire(this.x,this.y));			
		}

		if(this.count == 200){
			this.count = 0;
			this.index = 1;
		}

	}else{ // moai de boca aberta

		if(this.count == 1){
			this.weak = this.save_weak;
			this.not_effect = this.save_not_effect;
		}

		if(this.count % 50 == 0){
			boss_spread(this.x,this.y);
		}
		
		if(this.count == 200){
			this.count = 0;
			this.index = 0;
		}

	}

    push();
    translate(this.x, this.y);
   	scale(this.size);
    draw_sprite(0,0,en_sprites.boss[this.name[this.index]]);
    pop();

    this.draw_background();

}

// ENEMY SHOTS

class Boss_Fire extends Viper_shot{ // Viper_shot esta em enemys.js

	constructor(x,y){
		super(x,y);
		this.name = "fireball";
        this.energy = 10;
        this.speed = 25;
        this.power = 25;
        this.hitbox = [3*pixel,3*pixel];
	}
}


function boss_spread(x,y){
	for(let i=-6; i<=6; i+=2){
		enemy.push(new Boss_Spread(x,y,i));
	}

}

class Boss_Spread{
	constructor(x,y,d){
		this.x = x;
		this.y = y;
		this.direction = d;
		this.sprite = en_sprites.shoot.ring;
		this.energy = 10;
		this.speed = 12;
		this.value = 50;
		this.power = 15;
		this.size = [2,2];
		this.pivot = [1,1];
		this.hitbox = [20,20];
	}

}

Boss_Spread.prototype.move = function(N){

  this.x -= this.speed;
  if(this.direction != 0){
    this.y += this.speed  *  this.direction * 0.2;
  }
  draw_sprite(this.x,this.y,this.sprite);

  if(this.x < -10 ||  this.y > height + 10 || this.y < -10){
      enemy.splice(N,1);
  }

}

function panzer(){
    boss.push(new Panzer(width+100,height-180));
}

class Panzer extends Boss{
    constructor(x,y){
        super(x,y);
        this.name = ["panzer","panzer_cannon"];
        this.background = bk_sprites.cavern.arvores;
        this.weak = [0,8];
		this.not_effect = [2,3,4,5,6];
        this.speed = 1;
        this.angle = 0;
        this.hitbox = [en_sprites.boss[this.name[0]].x * pixel * 2, en_sprites.boss[this.name[0]].y * pixel * 2];
        this.direction = true;
    }
}

Panzer.prototype.move = function(){
    if(this.direction){
        this.x -= scene_speed + this.speed;
		this.size = [2,2];
	}else{
        this.x += scene_speed + this.speed;
		this.size = [-2,2];
	}

    if(this.count % 40 == 0){
        this.y += 5;
    }else if(this.count % 20 == 0) {
        this.y -= 5;
    }

}


Panzer.prototype.atack = function(N){
    this.count ++;
        if(this.count % 50 == 0){
            enemy.push(new Boss_Fire(this.x-15,this.y-18));
        }
    if( !((this.count >= 300 && this.count <= 400) || (this.count >= 700 && this.count <= 800)) ){
    	this.move();    	
    }

     if((this.x < 0 || this.x > width) && this.count > 800){ // turn the tank
        this.count = 0;
        this.direction = !this.direction;
    }

    push();
    translate(this.x, this.y + 20);
    scale(this.size);
    draw_sprite(0,0,en_sprites.boss[this.name[0]]);
    translate(-15,-18);
     if(this.direction){
        this.angle = Math.atan2 ( (this.y - player.y), (this.x - player.x) );
	}else{
	    this.angle = Math.atan2 ( (this.y - player.y), (this.x - player.x) * -1 );
	}
    rotate(this.angle);
    draw_sprite(0,0,en_sprites.boss[this.name[1]]);
    pop();

    this.draw_background();

}


function tower(){
    boss.push(new Tower(width - 200,height - 200));
}

class Tower extends Boss{
    constructor(x,y){
        super(x,y);
        this.name = ["tower"];
        this.background = bk_sprites.cavern.grass;
        this.weak = [8];
		this.not_effect = [2,3,4,5,6,7];
        this.hitbox = [en_sprites.boss[this.name[0]].x * pixel * 2, en_sprites.boss[this.name[0]].y * pixel * 2];
        this.direction = true;
        catapult(150);
        enemy[0].x = 700;
        catapult(430);
        enemy[1].x = 500;
    }
}

Tower.prototype.atack = function(N){
	this.count ++;

	if(this.count > 200){
		new_tank(80);
		enemy[enemy.length - 1].x -= 200;
		this.count = 0;
	}

	if(this.count % 200 == 0){
	    new_bomber();
	}

	if(this.count % 80 == 0){
	    boss_spread(this.x  - 200,this.y);
	}
	this.draw_background();

    push();
    translate(this.x, this.y);
    scale(this.size);
    draw_sprite(0,0,en_sprites.boss[this.name[0]]);
    pop();
}

function worm(){
    boss.push(new Worm(width - 200,height - 200));
}

class Worm extends Boss{
	constructor(x,y){
		super(x,y);
        this.name = ["worm_00","worm_01","worm_02"];
        this.background = bk_sprites.cavern.grass;
        this.weak = [1,8];
		this.not_effect = [2,3];
        this.hitbox = [en_sprites.boss[this.name[0]].x * pixel * 2, en_sprites.boss[this.name[0]].y * pixel * 2];
        this.direction = true;
        this.index = 1;
        this.count = 410;
	}
}

Worm.prototype.atack = function(N){
	this.count ++;
	let offset = 0;

	if(this.count < 400){

	    if(player.x >= this.x - 50 && player.x <= this.x + 50 && !this.shoot){
			enemy.push(new Boss_Fire(this.x - 15,this.y-50));
	    }

		if(this.direction){
			this.x -= 8;
		}else{
			this.x += 8;
		}

		if(this.x < 30 || this.x > width - 30){
			this.direction = !this.direction;
		}
	}else if(this.count < 410){
		this.index = 1;
		this.y -= 20;
	} else if(this.count < 560){

        if(this.count % 25 == 0){
            enemy.push(new Boss_Fire(this.x - 15,this.y-50));
        }		

		if(this.count % 5 == 0){		
		    if(this.index == 1){
		    	this.index = 2;
		    }else{
		    	this.index = 1;		    	
		    }
		}
	}else if(this.count < 570){
		this.index = 1;
		this.y += 20;
	}else{
		this.count = 0;
		this.index = 0;
	}


	this.draw_background();

    push();
    translate(this.x, this.y);
    scale(this.size);
    draw_sprite(0,0,en_sprites.boss[this.name[this.index]]);
    pop();
}

function dragon(){
    boss.push(new Dragon(width - 200,height - 40));
}

class Dragon extends Boss{
	constructor(x,y){
		super(x,y);
        this.name = ["dragon_01","dragon_02"];
        this.weak = [1,8];
		this.not_effect = [2];
        this.hitbox = [en_sprites.boss[this.name[0]].x * pixel * 2, en_sprites.boss[this.name[0]].y * pixel * 2];
        hell_fire("top");
        enemy[enemy.length-1].fill();
        hell_fire("down");
        enemy[enemy.length-1].fill();
        this.count = 10;
        this.side = 1;
	}
}

Dragon.prototype.atack = function(){
	this.count++;


    if(this.count < 25){
		this.y -= 6 * this.side;
	}else if(this.count < 80){
		this.index = 1;
		if(this.count % 5 == 0){
			enemy.push(new Boss_Fire(this.x - 20,this.y - 15));
		}

	}else if(this.count < 130){
		this.index = 0;
		this.y += 6 * this.side;
	}else if(this.count < 300){	
		if(this.count == 130 ){
			boss_fireball(100,"up");
		}else if(this.count == 140){
			boss_fireball(200,"up");
		}else if(this.count == 150){
			boss_fireball(300,"up");
		}else if(this.count == 160){
			boss_fireball(400,"up");
		}else if(this.count == 170){
			boss_fireball(500,"up");
		}else if(this.count == 180){
			boss_fireball(600,"up");
		}else if(this.count == 190){
			boss_fireball(700,"up");
		}else if(this.count == 200){
			boss_fireball(700,"down");
		}else if(this.count == 210){
			boss_fireball(600,"down");
		}else if(this.count == 220){
			boss_fireball(500,"down");
		}else if(this.count == 230){
			boss_fireball(400,"down");
		}else if(this.count == 240){
			boss_fireball(300,"down");
		}else if(this.count == 250){
			boss_fireball(200,"down");
		}else if(this.count == 260){
			boss_fireball(100,"down");



		}
	}else if(this.count == 300){
		this.count = 0;
		this.y = height - 40;
		this.x = 600;

		let x1 = 2;
		let y1 = 2;
		this.side = 1;
		if(random(0,2) > 1){
			y1 = -2;
			this.side = -1;
			this.y = 40;
		}
		
		if(random(0,2) > 1){
			x1 = -2
			this.x = 200
		}		
		
		this.size=[x1,y1];

	}

    push();
    translate(this.x, this.y);
    scale(this.size);
    draw_sprite(0,0,en_sprites.boss[this.name[this.index]]);
    pop();	

}


function farao(){
    boss.push(new Farao(width - 200,height - 200));
}

class Farao extends Boss{
	constructor(x,y){
		super(x,y);
        this.name = ["farao_01","farao_02","farao_03"];
        this.weak = [1,8];
		this.not_effect = [2];
        this.hitbox = [en_sprites.boss[this.name[0]].x * pixel * 2, en_sprites.boss[this.name[0]].y * pixel * 2];
        this.count = 0;
        this.index = 0;
        this.c_shot = 0;
	}
}

Farao.prototype.atack = function(N){
	this.count ++;

	if(this.count == 20){
		this.index = 1;
		foice(this.x-width,this.y-200);
	}else if(this.count == 25){
		this.index = 2;
	}else if(this.count == 30){
		this.index = 0;
		this.count = 0;
		this.c_shot ++;
	}


	if(this.c_shot == 8){
		scorpion(-300);
		beetle();
		this.c_shot = 0
	}
//	this.draw_background();

    push();
    translate(this.x, this.y);
    scale(this.size);
    draw_sprite(0,0,en_sprites.boss[this.name[this.index]]);
    pop();
}
