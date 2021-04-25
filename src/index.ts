import { App } from "./App";
import { CanvasRenderer } from "./CanvasRenderer";
import './index.css';

const root = document.createElement('div');
document.body.appendChild(root);
root.id = 'root';

const canvas = new CanvasRenderer(root);
const app = new App(canvas);