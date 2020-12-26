
class Boss{
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.energy = 100;
		this.weak = []; // numero do indice do array de armas
		this.power = 10;
		this.not_effect = [];
		this.hitbox = [0,0];
		this.name = "";
		this.count = 0;
		this.pivot = [1,1];
		
		song.fade(0,5);
		sound_efects[7].loop();
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
		this.index = 0;
		this.size = [2,2];
		this.start = x;
	}
}


Kraken.prototype.atack = function(N){
	this.count++;
	scene = [];


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


	// show sea over the kraken (don't move anymore)
	for(let i= -this.background.x; i< width + this.background.x; i += this.background.x * pixel){
		draw_sprite(i,height - 20,this.background);
	}

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
		this.index = 0;
		this.size = [2,2];
		this.save_weak = [3];
		this.save_not_effect = [1,5,6]
		this.hitbox = [this.width * this.size[0] * pixel, this.height * this.size[1] * pixel];

	}


}

Big_Moais.prototype.atack = function(N){
	this.count++;
	scene = [];


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


	// show sea over the kraken (don't move anymore)
	for(let i= -this.background.x; i< width + this.background.x; i += this.background.x * pixel){
		draw_sprite(i,height - 20,this.background);
	}

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