import { CanvasRenderer } from "./CanvasRenderer";
import './index.css';

const SPRITE_SIZE = 32;

const root = document.createElement('div');
document.body.appendChild(root);
root.id = 'root';

const canvas = new CanvasRenderer(root);

canvas.clear();

const img = new Image();
img.src = './Ground.png';
img.onload = () => {
    canvas.drawSprite(img, 0, 0, SPRITE_SIZE, SPRITE_SIZE, 32, 32, 32, 32);
    canvas.drawSprite(img, 0, 0, SPRITE_SIZE, SPRITE_SIZE, 64, 32, 32, 32);
    canvas.drawSprite(img, 0, 0, SPRITE_SIZE, SPRITE_SIZE, 48, 40, 32, 32);
}
