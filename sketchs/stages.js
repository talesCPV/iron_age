
let button_press = false;

let sel_opt = [1,1];
let next_stage = 0;
let boss_defeat = false;

let stage_length = 0;
let stage_percent = 0;
let timer = [0,0]; // [ % stage, total sec, current sec]
let time = 0;

function clock(){
        let sec = second();
        if( sec != timer[1]){
            timer[1] = sec;
            timer[0]++;
        }
        stage_percent = Math.floor(timer[0]/stage_length*100) ;
        if(stage_percent == 100){
            timer[0]--;
        }
}


function stage_select(sel_stage){

    if(sel_stage == 0){

        draw_sprite(width/2 - 85 * pixel / 2,250,pl_sprites.splash["logo"]);
        fill(255);

        text("PUSH ENTER TO START ", 210, 400, width, 150);
        text("2020 - by Tales C. Dantas ", 160, 550, width, 150);

        if(button_press){
            if(!sound_efects[0].isPlaying()){
                sound_efects[0].play();                                
            }  

            if( Math.floor(sound_efects[0].duration()) <  Math.ceil(sound_efects[0].currentTime()) ){
                stage = 1;
                button_press = false;
                sound_efects[4].setLoop(true);
                sound_efects[4].play();                                
            }

        }

        if(keyIsDown(ENTER) ) {
            button_press = true;
        }
        
        
    }else if(sel_stage == 1){ // SELECY STAGE

        back_color = [0,121,248];
        timer = [0,0];
        stage_percent = 0;
        time = 0;        

        noStroke();
        text("SELECT STAGE", 280, 50, width, 150);

        select_strip(100);
        stage_frame(150,75);
        stage_frame(350,75);
        stage_frame(550,75);

        select_strip(275);
        stage_frame(150,250);
        stage_frame(350,250);
        stage_frame(550,250);

        select_strip(450);
        stage_frame(150,425);
        stage_frame(350,425);
        stage_frame(550,425);

        fill(255);

// if(!get_weapons[x]){  } só mostrar as fases que ainda não passamos
        text("THE", 150, 200, 100, 150);
        text("TROOPER", 150, 225, 150, 150);

        text("THE EVIL ", 350, 200, 200, 150);
        text("THAT MAN", 350, 225, 200, 150);
        text("DO", 350, 250, 200, 150);

        text("WASTED", 550, 200, 200, 150);
        text("YEARS", 550, 225, 200, 150);

        text("CAN I", 150, 375, 200, 150);
        text("PLAY WITH", 150, 400, 200, 150);
        text("MADNESS", 150, 425, 150, 150);

        text("RUN TO", 550, 375, 200, 150);
        text("THE HILLS", 550, 400, 200, 150);

        text("ACES", 150, 550, 200, 150);
        text("HIGH", 150, 575, 200, 150);

        text("HALLOWED", 350, 550, 200, 150);
        text("BE THY", 350, 575, 200, 150);
        text("NAME", 350, 600, 200, 150);

        text("FEAR OF", 550, 550, 200, 150);
        text("THE DARK", 550, 575, 200, 150);


        if(!defeat[0]){
            draw_sprite(202,120,pl_sprites.splash["eddie_trooper"]); // THE TROOPER
        }
        if(!defeat[1]){
            draw_sprite(402,120,pl_sprites.splash["eddie_beast"]); // THE EVIL THAT MAN DO
        }
        if(!defeat[2]){
            draw_sprite(602,120,pl_sprites.splash["eddie_mind"]); // WASTED YEARS
        }
        if(!defeat[3]){
            draw_sprite(202,298,pl_sprites.splash["eddie_egito"]); //CAN I PLAY WITH MADNESS
        }
        if(!defeat[4]){
            draw_sprite(602,298,pl_sprites.splash["eddie_hammer"]); // RUN TO THE HILLS
        }
        if(!defeat[5]){
            draw_sprite(202,476,pl_sprites.splash["eddie_aces"]); //ACES HIGH
        }
        if(!defeat[6]){
            draw_sprite(402,476,pl_sprites.splash["eddie_hallowed"]); //HALLOWED BY THY NAME
        }
        if(!defeat[7]){
            draw_sprite(602,476,pl_sprites.splash["eddie_fear"]); // FEAR OF THE DARK
        }


        joystick();

        let x = 150;
        let y = 75;
        let B = 15

        if(sel_opt[0] == 1){
            x = 350;
        }else if(sel_opt[0] == 2){
            x = 550;
        }

        if(sel_opt[1] == 1){
            y = 250;
        }else if(sel_opt[1] == 2){
            y = 425;
        }

        fill(255);
        rect(x,y,B,B);  
        rect(x+85,y,B,B);  
        rect(x,y+85,B,B);  
        rect(x+85,y+85,B,B);  

    }else if(sel_stage == 2){ // LOADING STAGE

        player.draw();
        player.x += 0.5;
        text("LOADING...", 310, 400, width, 150);
        time = 0;
        stage_percent = 0;
        scene_move = true;

        if(song.isLoaded()){
            sound_efects[4].stop();                                
            stage = next_stage;
            player.x = 100;
            ready = 100;
            player.delay = 100;
            song.playMode('restart');
            song.play();
            song.jump(timer[0])
            stage_length = Math.floor(song.duration());
        }

    }else if(sel_stage == 3){ // GAME OVER

        song.stop();
        sound_efects[7].stop();

        text("GAME OVER!!!", 300, 250, width, 150);
        text("PRESS F5  AND TRY AGAIN ", 180, 550, width, 150);

    }else if(sel_stage == 4){ // The Trooper
        

        //enemys span
        if(time < stage_percent){
            time = stage_percent;
            if(time == 1){
                new_enemy_balls(6);
            }else if(time == 3){
                new_viper(5);
            }else if(time == 6){
                new_walker();
            }else if(time == 9){
                new_enemy_balls(6);
                new_moais("down");
            }else if(time == 12){
                new_moais("top");
            }else if(time == 15){
                new_enemy_balls(6);
                new_viper(5);
            }else if(time == 18){
                new_walker();
                new_moais("top");
            }else if(time == 21){
                new_moais("down");
                new_viper(5);
            }else if(time == 24){
                new_walker();
            }else if(time == 27){
                new_enemy_balls(5);
            }else if(time == 30){
                new_viper(5);
            }else if(time == 33){
                new_viper(5);
            }else if(time == 33){
                new_viper(5);
                new_walker();
            }else if(time == 39){
                new_walker();
            }else if(time == 42){                
                new_moais("top");            
            }else if(time == 45){                
                new_enemy_balls(5);
                new_walker();
            }else if(time == 48){                
                new_walker();
            }else if(time == 49){                
                new_viper(5);
            }else if(time == 51){                
                new_moais("top");
                new_moais("down");
            }else if(time == 54){                
                new_viper(10);
            }else if(time == 57){                
                new_walker();
            }else if(time == 60){                
                new_viper(5);
            }else if(time == 63){                
                new_moais("top");
                new_enemy_balls(6);
                new_moais("down");
            }else if(time == 66){                
                new_moais("top");
                new_enemy_balls(6);
            }else if(time == 69){                
                new_viper(5);
            }else if(time == 72){                
                new_walker();
                new_moais("down");
            }else if(time == 75){                
                new_moais("top");
                new_enemy_balls(6);
                new_moais("down");
            }else if(time == 76){                
                new_moais("top");
                new_viper(5);
            }else if(time == 78){                
                new_moais("top");
                new_moais("down");
            }else if(time == 80){                
                new_moais("top");
                new_moais("down");
            }else if(time == 82){                
                new_moais("top");
                new_moais("down");
            }else if(time == 84){                
                new_enemy_balls(6);
            }else if(time == 86){                
                new_viper(5);
            }else if(time == 88){       
                new_walker();
                new_moais("top");
            }else if(time == 90){                
                new_enemy_balls(6);
                new_walker();
            }else if(time == 91){                               
                new_walker();
            }else if(time == 92){                

            }else if(time == 93){                

            }else if(time == 98){                

                big_moais();
            }

        }

        draw_screen();
    }else if(sel_stage == 6){ //Wasted Years

        stage_percent = Math.floor(timer[0]/stage_length*100) ;

        if(time < stage_percent){
            time = stage_percent;
            if(time == 1){
                new_enemy_balls(6);
                new_sea_ship();
                scene.push(new Cloud(150));
                enemy.push(new Thunder(300,100));
            }else if(time == 3){
                new_viper(5);
                enemy.push(new Thunder(300,100));
            }else if(time == 5){
                new_bomber();
                new_viper(5);
            }else if(time == 8){
                new_sea_ship();
            }else if(time == 10){
                scene.push(new Cloud(150));
                new_viper(5);
            }else if(time == 12){
                new_sea_ship();
                enemy.push(new Thunder(300,100));
                new_viper(5);
            }else if(time == 13){
                new_viper(5);
            }else if(time == 15){
                new_enemy_balls(6);                
            }else if(time == 18){
                scene.push(new Cloud(150));
                new_bomber();
                new_sea_ship();
            }else if(time == 20){
                new_sea_ship();
            }else if(time == 21){
                scene.push(new Cloud(150));
                new_viper(5);
            }else if(time == 23){
                new_bomber();
                new_enemy_balls(6);                
            }else if(time == 25){
                scene.push(new Cloud(150));
                new_sea_ship();
            }else if(time == 27){
                scene.push(new Cloud(150));
                new_sea_ship();
                new_bomber();
            }else if(time == 30){
                new_enemy_balls(6);                
            }else if(time == 32){
                scene.push(new Cloud(150));
                new_viper(5);
            }else if(time == 33){
                enemy.push(new Thunder(300,100));
                new_bomber();
                new_enemy_balls(6);                
            }else if(time == 35){
                scene.push(new Cloud(150));
            }else if(time == 37){
                new_sea_ship();
            }else if(time == 39){
                scene.push(new Cloud(150));
                new_sea_ship();
            }else if(time == 40){
                new_enemy_balls(6);                
                new_bomber();
            }else if(time == 42){
                enemy.push(new Thunder(300,100));
            }else if(time == 45){
                scene.push(new Cloud(150));
                new_enemy_balls(6);                
            }else if(time == 47){
                new_sea_ship();
            }else if(time == 50){
                new_sea_ship();
            }else if(time == 52){
                scene.push(new Cloud(150));
                new_viper(5);
            }else if(time == 53){
                scene.push(new Cloud(150));
            }else if(time == 55){
                new_bomber();
                new_sea_ship();
            }else if(time == 56){
                new_sea_ship();
                scene.push(new Cloud(150));
            }else if(time == 59){
                new_enemy_balls(6);                
            }else if(time == 61){
                enemy.push(new Thunder(300,100));
                new_bomber();
                new_enemy_balls(6);                
            }else if(time == 63){
                scene.push(new Cloud(150));
            }else if(time == 65){
                new_sea_ship();
            }else if(time == 69){
                new_viper(5);
                scene.push(new Cloud(150));
            }else if(time == 70){
                new_enemy_balls(6);                
                new_sea_ship();
            }else if(time == 72){
                scene.push(new Cloud(150));
                new_bomber();
            }else if(time == 74){
                new_sea_ship();
            }else if(time == 77){
                scene.push(new Cloud(150));
                new_sea_ship();
            }else if(time == 79){
                enemy.push(new Thunder(300,100));
                new_viper(5);
            }else if(time == 80){
                scene.push(new Cloud(150));
            }else if(time == 83){
                new_sea_ship();
            }else if(time == 84){
                enemy.push(new Thunder(300,100));
                scene.push(new Cloud(150));
            }else if(time == 85){
                new_sea_ship();
                new_bomber();
            }else if(time == 87){
                scene.push(new Cloud(150));
            }else if(time == 89){
                new_sea_ship();
            }else if(time == 90){
                scene.push(new Cloud(150));
                new_sea_ship();
            }else if(time == 92){
                enemy.push(new Thunder(300,100));
                new_viper(5);
                new_sea_ship();
            }else if(time == 94){
                new_sea_ship();
            }else if(time == 96){
                scene.push(new Cloud(150));
                kraken();
            }
        }        

        draw_screen();
    }else if(sel_stage == 7){ // Can I play with madness

        stage_percent = Math.floor(timer[0]/stage_length*100) ;
                if(time < stage_percent){
            time = stage_percent;
            if(time == 1){
                kraken();
            }else if(time == 3){
//                new_viper(5);
            }else if(time == 4){

            }else if(time == 5){

            }
        }   
        draw_screen();

    }else if(sel_stage == 5){ // The Evil That Man Do

        stage_percent = Math.floor(timer[0]/stage_length*100) ;
                if(time < stage_percent){
            time = stage_percent;
            if(time == 1){
                new_tank();
            }else if(time == 3){
                new_viper(5);
            }else if(time == 4){
                new_tank();
            }else if(time == 5){
                new_viper(5);
                scene.push(new Cloud(150));
            }else if(time == 8){
                new_moais("down");
            }else if(time == 10){
                new_tank();
                new_bomber();
            }else if(time == 12){
                new_viper(5);
            }else if(time == 15){
                new_viper(5);
                new_moais("down");
            }else if(time == 18){
                scene.push(new Cloud(150));
            }else if(time == 20){
                new_tank();
            }else if(time == 23){
                new_viper(5);
            }else if(time == 24){
                new_bomber();
            }else if(time == 27){
                new_viper(5);
            }else if(time == 30){
                new_moais("down");
            }else if(time == 32){
                new_tank();
            }else if(time == 33){
                new_viper(5);
            }else if(time == 35){
                new_moais("down");
            }else if(time == 38){
            }else if(time == 41){
                new_tank();
            }else if(time == 44){
                new_viper(5);
            }else if(time == 47){
                scene.push(new Cloud(150));
            }else if(time == 49){
                new_bomber();
            }else if(time == 51){
                new_tank();
            }else if(time == 53){
                scene.push(new Cloud(150));
            }else if(time == 56){
            }else if(time == 59){
                new_viper(5);
            }else if(time == 61){
                new_tank();
            }else if(time == 63){
                new_tank();
            }else if(time == 66){
                new_viper(5);
            }else if(time == 69){
                new_viper(5);
            }else if(time == 72){
                scene.push(new Cloud(150));
            }else if(time == 75){
                scene.push(new Cloud(150));
            }else if(time == 77){
                new_tank();
            }else if(time == 80){
                new_viper(5);
            }else if(time == 82){
                scene.push(new Cloud(150));
            }else if(time == 85){
                new_tank();
                new_viper(5);
            }else if(time == 87){
                scene.push(new Cloud(150));
            }else if(time == 90){
                new_viper(5);
            }else if(time == 92){
                new_tank();
            }else if(time == 94){
                scene.push(new Cloud(150));
            }else if(time == 96){
                panzer();
            }
        } 

        draw_screen();

    }else if(sel_stage == 11){ // FEAR OF THE DARK

        stage_percent = Math.floor(timer[0]/stage_length*100) ;
        if(time < stage_percent){
            time = stage_percent;
            if(time == 1){
                tower();                
            }else if(time == 3){
//                new_tank(80);
            }else if(time == 5){
//               new_moais("down");
            }else if(time == 7){
            }else if(time == 9){
            }
        }

        draw_screen();
    }

}


function draw_screen(){

        if(!pause){

            clock();

            // show background    
            for(let i=0;i<scene_bk.length;i++){
                scene_bk[i].move(i);         
            }


            // show control screen
            fill(letter_color);
            text("SCORE: "+score, 10, 25, 300, 150);
            text("HI-SCORE", 310, 25, 300, 150);
            text(weap_names[player.weapon], 610, 25, 300, 150);



            // show all shottings
            for(let i=0;i<shooting.length;i++){
                shooting[i].move(i);
            }
        
            // show bomb
            for(let i=0;i<special.length;i++){
                special[i].move(i);
            }
            // show all enemys
            for(let i=0;i<enemy.length;i++){
                enemy[i].move(i);
            }

            // show background    
            for(let i=0;i<scene.length;i++){
                scene[i].move(i);         
            }

            // show itens    
            for(let i=0;i<itens.length;i++){

                if(collision(player,itens[i])){
                    itens[i].hit();  

                }else{
                    itens[i].move(i);
                }

            }

            // show boss
            if(boss.length > 0 && !boss_defeat){
                if(boss[0].begin == 0){
                    boss[0].atack(0);
                    if(sound_efects[5].isPlaying()){
                        sound_efects[5].stop();
                    }
                }else{
                    boss[0].come_here();
                    if(boss[0].begin % 50){
                        sound_efects[5].playMode("restart");
                        sound_efects[5].play();    
                    }
                }

                for(let i=0; i<boss[0].energy; i+=5){
                    draw_sprite(width-60,150-i,pl_sprites.player["energy_bar"]);
                }                  
            }

            // show energy bars
            for(let i=0; i<player.shield; i+=5){
                draw_sprite(30,150-i,pl_sprites.player["energy_bar"]);
            }
            if(player.weapon > 0){
                for(let i=0; i<energy_wep[player.weapon]; i+=5){
                    draw_sprite(60,150-i,pl_sprites.player["energy_bar"]);
                }            
            }

            hit();    
            player.draw();
        }else{
            weapon_menu();
        }

        joystick();
}

function draw_pixel(x,y,N){
    let x2 = pixel;
    let y2 = pixel;

    for(let i=0;i<N.length;i++){
        let color = N[i].color;
        fill(color);
        for(let j=0; j<N[i].data.length; j++){
            let x1 = x + N[i].data[j][0]*pixel;
            let y1 = y - N[i].data[j][1]*pixel;
            if(N[i].data[j].length > 2){
              x2 =  N[i].data[j][2]*pixel;
              y2 =  N[i].data[j][3]*pixel;
            }
            rect(x1,y1, x2, y2);
        }
    }
}


function draw_sprite(x,y,JSON){
    let dots = JSON.dots
    draw_pixel(x,y,dots);

    let lines = JSON.lines
    draw_pixel(x,y,lines);
}

function hit(){

    for(let i=0; i<enemy.length;i++){

        // hit enemys
        for(let j=0; j<shooting.length;j++){
            if(collision(shooting[j],enemy[i])){          
                enemy[i].energy -= shooting[j].power;
                shooting.splice(j,1);                
            }else if(boss.length > 0){

                if(collision(shooting[j],boss[0])){
                    boss[0].hit(shooting[j].power);
                    shooting.splice(j,1);                
                }
            }
        }

        for(let j=0; j<special.length;j++){
            if(collision(special[j],enemy[i])){          
                enemy[i].energy -= special[j].power;
                if(special[j].name != "atomic"){
                    special.splice(j,1);
                }
            }else  if(boss.length > 0){
                if(collision(special[j],boss[0])){
                    boss[0].hit(special[j].power);
                    special.splice(j,1);
                }
            }            
        }

        // hit player
        if(collision(player,enemy[i])){
            player.hit(enemy[i].power);
            enemy[i].energy -= 5;
        }        
    }
    
    if(boss.length > 0 && !boss_defeat){
        // boss hiting player
        if(collision(player,boss[0])){
            player.hit(boss[0].power);
        }

        // Boss defeat
        if(boss[0].energy <= 0 ){
            sound_efects[7].stop(); // stop the boss music
            sound_efects[8].play(); 
            boss_defeat = true;
            scene_move = true;
            boss = [];
            timer = [0,0];
        }
    }


    if(boss_defeat){
        player.x += 5;

        if(player.x >= width + 200){
            get_weapons[stage-3] = 1;
            defeat[stage-4] = true;
            stage = 1;
            sound_efects[4].setLoop(true);
            sound_efects[4].play(); 
            boss_defeat = false;
            energy_wep =  [1,100,100,100,100,100,100,100,100];                       
        }
    }
}

function collision(obj1,obj2){

    // axis X
    let x1 = obj1.x;
    let hx1 = obj1.hitbox[0] / 2;

    if(obj1.pivot[0] == 0){
        x1 += hx1;
    }else if(obj1.pivot[0] == 2){
        x1 -= hx1;
    }

    let x2 = obj2.x;
    let hx2 = obj2.hitbox[0] / 2;

    if(obj2.pivot[0] == 0){
        x2 += hx2;
    }else if(obj2.pivot[0] == 2){
        x2 -= hx2;
    }

    if( Math.abs(x1-x2) < hx1+hx2){
        // axis Y
        let y1 = obj1.y;
        let hy1 = obj1.hitbox[1] / 2;

        if(obj1.pivot[1] == 0){
            y1 += hy1;
        }else if(obj1.pivot[1] == 2){
            y1 -= hy1;
        }

        let y2 = obj2.y;
        let hy2 = obj2.hitbox[1] / 2;

        if(obj2.pivot[1] == 0){
            y2 += hy2;
        }else if(obj2.pivot[1] == 2){
            y2 -= hy2;
        }    
        if( Math.abs(y1-y2) < hy1+hy2){
            return true;
        }
    }
    return false;
}


function stage_frame(x,y){
        // rect
        let B = 15
        fill(0);
        rect(x,y,100,100);
        fill(255);
        rect(x+B,y+2,100 - 2*B,2);
        rect(x+B,y+97,100 - 2*B,2);
        rect(x+2,y+B,2,100 - 2*B);
        rect(x+97,y+B,2,100 - 2*B);
        fill(0,236,220);
        rect(x+B,y+5,100 - 2*B,B-5);
        rect(x+B,y+86,100 - 2*B,B-5);
        rect(x+5,y+B,B-5,100 - 2*B);
        rect(x+86,y+B,B-5,100 - 2*B);
}


function select_strip(y){
        fill(0,236,220);
        rect(0,y,width,pixel); 
        y += 2*pixel       
        rect(0,y,width,pixel);        
        y += 2*pixel       
        rect(0,y,width,pixel*8);        
        y += 9*pixel       
        rect(0,y,width,pixel);        
        y += 2*pixel       
        rect(0,y,width,pixel);   
}

function weapon_menu(){
    background(25,20,158);
    fill(108,184,225);
    rect(30,30,width-60,height-260);

    rect(30,height-220, (width-100)/3, 200 );
    rect(37 + (width-80)/3,height-220, (width-80)/3, 200 );
    rect(50 + 2*(width-80)/3,height-220, (width-80)/3, 200 );

    fill(0)
    rect(35,35,width-70,height-270);

    rect(35,height-215, (width-130)/3, 190 )
    rect(52 + (width-110)/3,height-215, (width-110)/3, 190 )
    rect(75 + 2*(width-110)/3,height-215, (width-110)/3, 190 )

    fill(255)
    text("WEAPONS ENERGY", 250, 70, width, 150);

// show weapon energy
    energy_wep[0] = player.shield;
    let x = 120;
    let y = 110;
    for(let i=0; i<9; i++){
        if(i == 5){
            x = 450;
            y = 110;
        }                
        if(get_weapons[i]){
            text(weap_names[i], x, y , 300, 150);

            if(i == player.weapon){
                draw_sprite(x - 20 ,y  ,pl_sprites.splash["seta"]);                
            }
            y += 10;

            for(let j=0; j<energy_wep[i]; j+=3){
                draw_sprite(x+j*2,y ,pl_sprites.player["energy_bar_v"]);
            }
            y += 40;
        }
    }

// show lifes
    text("LIFES", width/2 - 50, height-180, 200, 150);
    text("x"+ player.life, width/2 -20, height-50, 200, 150);
    draw_sprite(width/2 ,height-130,pl_sprites.player["main"]);

    text("SHOT    "+player.max_shot+"x" , 50, height-150, 200, 150);
    text("SPECIAL "+player.max_special+"x" , 50, height-120, 200, 150);
    text("SPEED   +"+ (player.speed - 3) , 50, height-90, 200, 150);

    if(have_joy){
        text("USE SELECT", width/2 + 150, height-180, 300, 150);
    }else{
        text("PRESS SHIFT", width/2 + 140, height-180, 300, 150);
    }
    draw_sprite(width/2 + 250,height-130,pl_sprites.itens.energy_tank);
    text("x"+ player.tank, width/2 + 230, height-50, 200, 150);



} 


function start_stage(N){

    enemy = [];
    shooting = [];
    special = [];
    itens = [];
    scene = [];
    boss_defeat = false;
    next_stage = 0;
    pause = false;
    player.shield = 100;
    player.x = 50;
    player.y = 200;
    next_stage = N;
                            
    if(song != undefined){ // stop the music, if is playing
        song.stop();
    }

    sound_efects[7].stop();

    if(boss.length == 0){ // ainda não chegou no boss

        timer[0] =  Math.floor( (stage_length/100) * time / 2  );     
        stage = 2;      

        if(N == 4){ // THE TROOPER
            back_color = [0,0,0];
            song = loadSound('assets/music/Trooper.mp3');
            fill_second_plan(["cave_01","cave_02","cave_01","cave_02"]);
            scene.push(new Ground("cavern","montanhas",true));
            scene.push(new Ground("cavern","arvores"));
            scene[scene.length-1].fill();

        }else if(N == 5){ // THE EVIL THAT MAN DO
            back_color = [25,20,158];
            song = loadSound('assets/music/Evil.mp3');
            fill_second_plan(["degrade_01","degrade_02","degrade_03","degrade_04"]);
            scene.push(new Ground("cavern","arvores"));
            scene[scene.length-1].fill();

        }else if(N == 6){ // WASTED YEARS
            back_color = [25,20,158];
            song = loadSound('assets/music/Wasted.mp3');
            scene.push(new Ground("sea","agua",false,true));
            scene[scene.length-1].fill();

        }else if(N == 7){ // CAN I PLAY WITH MADNESS
            back_color = [0,0,0];
            song = loadSound('assets/music/Madness.mp3');
            fill_second_plan(["cave_01","cave_02","cave_01","cave_02"]);
            scene.push(new Ground("cavern","arvores"));
            scene[scene.length-1].fill();

        }else if(N == 11){ // FEAR OF THE DARK
            back_color = [0,0,0];
            song = loadSound('assets/music/Fear.mp3');
            fill_second_plan(["trees_00","trees_01","trees_02","trees_02"]);
            scene.push(new Ground("cavern","grass"));
            scene[scene.length-1].fill();

        }


    }else{ // ja chegou no boss... reinicia ele
        boss = [];
        stage_percent = 99;
        ready = 100;
        player.delay = 100;

        if(N == 4){ // THE TROOPER
            big_moais();
        }else if(N == 5){ // THE EVIL THA MAN DO
            panzer();
        }else if(N == 6){ // WASTED YEARS
            kraken();
        }else if(N == 7){ // CAN I PLAY WITH MADNESS
            big_moais();
        }else if(N == 8){ // RUN TO THE HILLS
        }else if(N == 9){ // ACES HIGH
        }else if(N == 10){ // HALLOWED BE THY NAME
        }else if(N == 11){ // FEAR OF THE DARK
            tower();        
        }

    }

}