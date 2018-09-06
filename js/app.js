// Enemies our player must avoid
var Enemy = function(x, y, rate) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = 511;
    this.y = y + 60;
    this.rate = rate;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
        this.x += this.rate * dt;
    }
    else {
        this.x = -101;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player class
class Hero {
    constructor() {
        //player properties that track the points given and lives available
        //initial position and sprite image
        this.points = 0;
        this.lives = 3;
        this.x = 202;
        this.y = 390;
        this.sprite = 'images/char-boy.png';
    }

    //This method reguarly updates the position of the player as well as the enemies on the board
    update() {
        //constants set for point and life tracking
        const pointCount = document.querySelector('.points')
        const lifeCount = document.querySelector('.lives')
        //for loop tracks the position of enemies and determines if
        //any collisions occur with player
        for (let enemy of allEnemies) {
            if (this.y === (enemy.y - 2) && (enemy.x + 70 > this.x && enemy.x < this.x + 90)) {
                this.lives--;
                this.x = 202;
                this.y = 390;
                lifeCount.innerHTML = (this.lives);
                //if player runs out of lives, trigger game over modal
                if (this.lives === 0) {
                    //modal styling from Tristan Edwards + contributors @ https://sweetalert.js.org/guides/
                    swal({
                        title: 'Game Over!',
                        text: "Do you want to play again!",
                        icon: 'warning',
                        buttons: ['Exit', 'Play Again'],
                    })
                    .then((reset) => {
                        //resets lives and points
                        if(reset) {
                            pointCount.innerHTML = 0;
                            lifeCount.innerHTML = 3;
                            this.points = 0;
                            this.lives = 3;
                        }
                        else {
                            swal('Thanks bye!');
                            pointCount.innerHTML = 0;
                            lifeCount.innerHTML = 3;
                            this.points = 0;
                            this.lives = 3;
                        }
                    });
                }
            }
        }
        //sends player back to initial position and increments point counter When
        //player reaches end of the board
        if (this.y == -25) {
            this.points++;
            setTimeout(() => {
                this.x = 202;
                this.y = 390;
                pointCount.innerHTML = this.points;
            }, 10);

        }
    }
    //renders character image
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    //this method is for handling key presses
    handleInput(keyDir) {
        if (keyDir == 'left') {
            this.x -= 101;
            if (this.x < 0) {
                this.x += 101;
            }
        }
        if (keyDir == 'up'){
            this.y -= 83;
            if (this.y < -166) {
                this.y += 83;
            }
        }
        if (keyDir == 'right') {
            this.x += 101;
            if (this.x > 404) {
                this.x -= 101;
            }
        }
        if (keyDir == 'down') {
            this.y += 83;
            if (this.y > 415) {
                this.y -= 83;
            }
        }
    }
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Hero();
const bug1 = new Enemy(0, 0, 353);
const bug2 = new Enemy(0, 83, 152);
const bug3 = new Enemy(0, 166, 303);
const allEnemies = [];
allEnemies.push(bug1, bug2, bug3);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
