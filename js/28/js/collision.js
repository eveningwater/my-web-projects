
/**
 * 
 *
 */
function fishMomFruitCollision() {
    for (var i = 0; i < global.fruitNum; i++) {
        if (global.fruit.alive[i]) {
            if (!global.score.gameStatus) {
                //the round collision detection,that's calcuted length and judge the value whether in a cirle which the distance is the square of radius
                var l = caleLength(global.fruit.x[i], global.fruit.y[i], global.fishMom.x, global.fishMom.y);
                if (l < 900) {
                    //fruit eaten
                    global.fruit.dead(i);
                    global.score.fruitNum++;
                    global.wave.born(global.fruit.x[i],global.fruit.y[i]);
                    global.fishMom.fishMomBodyCount++;
                    if (global.fishMom.fishMomBodyCount > 7) global.fishMom.fishMomBodyCount = 7;
                    if (global.fruit.fruitType[i].indexOf('blue') > -1) {
                        global.score.double = 2;
                    } else {
                        global.score.double = 1;
                    }
                }
            }
        }
    }
}

function fishMomFishSonCollision() {
    if (global.score.fruitNum > 0 && !global.score.gameStatus) {
        var d = caleLength(global.fishMom.x, global.fishMom.y, global.fishSon.x, global.fishSon.y);
        if (d < 900) {
            //fish son recover
            global.fishSon.fishSonBodyCount = 0;
            
            //score => 0
            // global.score.reset();
            //change the body of fish mom
            global.fishMom.fishMomBodyCount = 0;
            //update score
            global.score.addScore();
            //draw halo
            global.halo.born(global.fishSon.x,global.fishSon.y);
        }
    }
}