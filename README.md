# Space Invaders Console Game

Space Invaders is a console-based arcade game written in pure JavaScript (Node.js). The player controls a spaceship, shoots down alien invaders, and tries to survive as long as possible.

## Features

- **Coordinate system**: The game field is a grid of characters. Player position is stored as X coordinate, enemies and bullets are stored in arrays with `x` and `y` properties.

Piece of code from `game.js` for preview:

```javascript
let playerX = Math.floor(WIDTH / 2);
let enemies = [];
let bullets = [];

function createEnemies() {
    enemies = [];
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 8; col++) {
            enemies.push({
                x: 5 + col * 4,
                y: 3 + row * 2,
                alive: true
            });
        }
    }
}# space-invaders

Game loop with recursion: The gameLoop() function calls itself using setTimeout every 100ms, creating a smooth 10 FPS animation.

Piece of code from game.js for preview:
function gameLoop() {
    if (!gameOver) {
        moveEnemies();
        moveBullets();
        checkCollisions();
        
        if (checkWin()) {
            console.clear();
            drawGame();
            console.log('\n========== YOU WIN! ==========');
            console.log('Your score: ' + score);
            process.exit();
        }
    }
    
    console.clear();
    drawGame();
    setTimeout(gameLoop, 100);
}

Collision detection algorithm: Double-loop checks each bullet against each enemy. When coordinates match, enemy is destroyed and score increases by 10.

Piece of code from game.js for preview:
function checkCollisions() {
    for (let i = 0; i < bullets.length; i++) {
        for (let j = 0; j < enemies.length; j++) {
            if (enemies[j].alive && 
                bullets[i].x === enemies[j].x && 
                bullets[i].y === enemies[j].y) {
                enemies[j].alive = false;
                bullets.splice(i, 1);
                score += 10;
                break;
            }
        }
    }
}

function checkCollisions() {
    for (let i = 0; i < bullets.length; i++) {
        for (let j = 0; j < enemies.length; j++) {
            if (enemies[j].alive && 
                bullets[i].x === enemies[j].x && 
                bullets[i].y === enemies[j].y) {
                enemies[j].alive = false;
                bullets.splice(i, 1);
                score += 10;
                break;
            }
        }
    }
}
