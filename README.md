# Space Invaders Console Game

Space Invaders is a console-based arcade game written in pure JavaScript (Node.js).

## Features

### Coordinate system

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
}
```
Game loop

```javascript
function gameLoop() {
    if (!gameOver) {
        moveEnemies();
        moveBullets();
        checkCollisions();
        if (checkWin()) {
            console.clear();
            drawGame();
            console.log('\n========== YOU WIN! ==========');
            process.exit();
        }
```
```javascript
Collision detection
javascript
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
```
```javascript
High score persistence
javascript
const fs = require('fs');
const HIGHSCORE_FILE = 'highscore.txt';

function loadHighScore() {
    if (fs.existsSync(HIGHSCORE_FILE)) {
        highScore = parseInt(fs.readFileSync(HIGHSCORE_FILE, 'utf8')) || 0;
    }
}

function saveHighScore() {
    if (score > highScore) {
        fs.writeFileSync(HIGHSCORE_FILE, score.toString());
    }
}
```
Requirements

1. Install (https://nodejs.org/)
2. Clone repository:
3. Run the game: node game.js
```
```
Controls
Key	Action
A / ←	Move left
D / →	Move right
SPACE	Shoot
Q	Exit

## Asciinema

- [Gameplay recording](https://asciinema.org/a/Zq48vMqL4klmAuFN)
