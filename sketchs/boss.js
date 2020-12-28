
class Boss{
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.energy = 0;
		this.weak = []; // numero do indice do array de armas
		this.power = 10;
		this.not_effect = [];
		this.hitbox = [0,0];
		this.name = "";
		this.count = 0;
		this.pivot = [1,1];
		this.begin = 100;
		this.size = [2,2];
		this.index = 0;
		this.background = bk_sprites.sea.agua;
		song.fade(0,5);
		sound_efects[7].loop();
		enemy = [];

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
		draw_sprite(i,height - 20,this.background);
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
		this.weak = [0];
		this.not_effect = [1,2];
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
//			this.hitbox[0] *= 2;
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

    if((this.count >= 300 && this.count <= 400) || (this.count >= 700 && this.count <= 800) ){

    }else{
    	this.move();
        if(this.count % 50 == 0){
            enemy.push(new Boss_Fire(this.x-15,this.y-18));           
        }    	
    }

     if((this.x < 0 || this.x > width) && this.count > 800){
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