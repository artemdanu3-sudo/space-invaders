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
