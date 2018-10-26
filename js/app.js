// player avatars array
const avatars = [
        "images/char-boy.png",
        "images/char-cat-girl.png",
        "images/char-horn-girl.png",
        "images/char-horn-girl.png",
        "images/char-pink-girl.png"
]

//randomly choosing the avatar for the player, each time the game loads
const totalAvatars = avatars.length;
let avatarsIndex = Math.floor((Math.random() * 10) + 1) % totalAvatars;
let avatar = avatars[avatarsIndex];

//player class, with its location in x-y plane, its initial speed and avatar
let Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = avatar;
};

//this class requires an update(), render() and a handleInput() method.
Player.prototype.update = function() {
    //doesn't allow player from moving outside canvas
    if (this.y > 380) {
        this.y = 380;
    }
    if (this.x > 400) {
        this.x = 400;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    //position of the player resets, on entering the top of the canvas
    if (this.y < 0) {
        this.x = 100;
        this.y = 380;
    }
};

//draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//measure of what the player can travel on each key press
//50x30 is added to X-asis and Y-axis respectively, because of the ground sprite size
//this makes the player move exactly 1 square per key press
Player.prototype.handleInput = function(inputKey) {
    switch (inputKey) {
        case 'left':
            this.x -= this.speed + 50;
            break;
        case 'up':
            this.y -= this.speed + 30;
            break;
        case 'right':
            this.x += this.speed + 50;
            break;
        case 'down':
            this.y += this.speed + 30;
            break;
    }
};

//ememies class, with its location in x-y plane, its minimum and maximum speed and its avatar
let Enemy = function(x, y) {
    //variables applied to each of our instances go here,
    //we've provided one for you to get started
    this.x = x;
    this.y = y;
    maxSpeed = 500;
    minSpeed = 50;
    this.speed = Math.floor(Math.random() * maxSpeed) + minSpeed;
    //the image/sprite for our enemies, this uses
    //a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

//update the enemy's position, required method for game
//parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //you should multiply any movement by the dt parameter
    //which will ensure the game runs at the same speed for
    //all computers.
    this.x += this.speed * dt;

    //condition that resets enemies postion when they cross the canvas
    if (this.x > 480) {
        this.speed = Math.floor(Math.random() * maxSpeed) + minSpeed;
        this.x = -50;
    }

    //checks for collision between player and enemies,
    //if successfull returns player to its initial location in x-y plane
    if (player.x < this.x + 60 &&
        player.x + 37 > this.x &&
        player.y < this.y + 25 &&
        player.y + 30 > this.y) {
        player.x = 200;
        player.y = 380;
    }
};

//draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//now instantiate your objects.
//place all enemy objects in an array called allEnemies
let allEnemies = [
    new Enemy(0, 63),
    new Enemy(-50, 146),
    new Enemy(-20, 229)
];

//place the player object in a variable called player
let player = new Player(200, 380, 50);

//this listens for key presses and sends the keys to your
//Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});