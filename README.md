# Space Invaders Console Game

Space Invaders is a console-based arcade game written in pure JavaScript (Node.js). The player controls a spaceship, shoots down alien invaders, and tries to survive as long as possible.

## Features

- **Coordinate system**: Player position is stored as X coordinate, enemies and bullets are stored in arrays with `x` and `y` properties.

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
}
```
- Game loop with recursion: The gameLoop() function calls itself using setTimeout every 100ms, creating a smooth 10 FPS animation.

Piece of code from game.js for preview:

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
- Collision detection algorithm: Double-loop checks each bullet against each enemy. When coordinates match, enemy is destroyed and score increases by 10.

Piece of code from game.js for preview:

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
- **High score persistence**: The game saves the highest score to `highscore.txt` using Node.js `fs` module, so the record is preserved between game sessions.

Piece of code from `game.js` for preview:

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
2. Clone repository: https://github.com/artemdanu3-sudo/space-invaders.git
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
