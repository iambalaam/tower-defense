import { CanvasRenderer } from "./CanvasRenderer";
import './index.css';

const root = document.createElement('div');
document.body.appendChild(root);
root.id = 'root';

new CanvasRenderer(root);