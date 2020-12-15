
let button_press = false;
let time = 0;

function draw_screen(sel_stage){



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
                song.playMode('restart');
                song.play();
                stage_length = Math.floor(song.duration());
                stage = 1;
                button_press = false;
            }

        }

        if(keyIsDown(ENTER) ) {
            button_press = true;
        }
        
    }else if(sel_stage == 1){

        text("SCORE: "+score, 10, 25, 200, 150);
        text("SHIELD: "+shield+"%", 210, 25, 200, 150);
        stage_percent = Math.floor(song.currentTime()/stage_length*100) ;

        //enemys span
        if(time < stage_percent){
            time = stage_percent;
            if(time == 1){
                new_moais("down");
            }else if(time == 2){
                new_viper(5);
            }else if(time == 5){
                new_enemy_balls(6);
            }else if(time == 8){
                new_enemy_balls(6);
                new_moais("down");
            }else if(time == 10){
                new_moais("top");
            }else if(time == 3){
                new_enemy_balls(6);
                new_moais("top");
            }

        }

        // show all shottings
        for(let i=0;i<shooting.length;i++){
            shooting[i].move(i);
        }
    
        // show all enemys
        for(let i=0;i<enemy.length;i++){
            enemy[i].move(i);
        }

        // show background    
        for(let i=0;i<scene.length;i++){
            scene[i].move(i);
        }

        hit();    
        joystick();

        // draw player
        draw_sprite(p1.x,p1.y,pl_sprites.player[sprite_name]);

    }

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

    let sh_x = shoot_hitbox[0]/2;
    let sh_y = shoot_hitbox[1]/2;

    let ph_x = p1.hitbox[0]/2;
    let ph_y = p1.hitbox[1]/2;

    for(let i=0; i<enemy.length;i++){
        let e_x = enemy[i].x;
        let e_y = enemy[i].y;

        let eh_x = enemy[i].hitbox[0]/2;
        let eh_y = enemy[i].hitbox[1]/2;

        // atack
        for(let j=0; j<shooting.length;j++){
            let s_x = shooting[j].x;
            let s_y = shooting[j].y;
            if(collision([s_x,s_y,sh_x,sh_y],[e_x,e_y,eh_x,eh_y])){
                enemy[i].energy -= shooting[j].power;
                shooting.splice(j,1);
            }            
        }

        // defense
        if(collision([p1.x,p1.y,ph_x,ph_y],[e_x,e_y,eh_x,eh_y])){
            shield -= enemy[i].power ;
            enemy[i].energy -= 5;
        }

    }
}

function collision(obj1,obj2){
    // axis X
    if( Math.abs(obj1[0]-obj2[0]) < Math.abs(obj1[2]+obj2[2])){
        // axis Y
        if( Math.abs(obj1[1]-obj2[1]) < Math.abs(obj1[3]+obj2[3])){
            return true;
        }
    }
    return false;
}