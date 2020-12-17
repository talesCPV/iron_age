function sort_item(x,y,N){
    let perc = Math.floor(random(0,100));
    if( perc < N ){
        let max =  itens_name.length;
        let sort = Math.floor(random(1,max));
        itens.push(new Itens(x,y,sort));
    }
}

class Enemy{
    constructor(x,y){
        this.x = width + x ;
        this.y = y;
        this.value = 100;
        this.power = 1;
        this.energy = 1;
        this.hitbox = [0,0];
        this.pivot = [1,1];
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
        let y = height - 110 ;
        if(side == "top"){
            y = 140;
        }
        super(200,y);
        this.speed = 3;
        this.name =  "moais_close";
        this.energy = 10;
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
        this.power = 3;
        this.energy = 1;

        let vet = Math.abs(x - player.x) + Math.abs(y - player.y)

        this.offset_x = Math.abs(x - player.x) / vet;
        this.offset_y = Math.abs(y - player.y) / vet;
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


function new_walker(){
    enemy.push(new Walker(100,height-90));
}

class Walker extends Enemy{
    constructor(x,y){
        super(x,y);
        this.name = "walker_01";
        this.frame = 1;
        this.energy = 30;
        this.power = 50;
        this.count = 0;
        this.hitbox = [en_sprites.enemys[this.name].x , en_sprites.enemys[this.name].y];               
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
        this.power = 10;
        this.nome = "walker_shoot";

    }
}