const CANVAS_WIDTH = 320;
const CANVAS_HEIGHT = 240;

type Ctx = CanvasRenderingContext2D;

export class CanvasRenderer {
    _parentElement: HTMLElement;
    _canvas: HTMLCanvasElement;
    _canvasHeight: number;
    _canvasWidth: number;
    _ctx: Ctx;
    _scaleFactor: number

    constructor(parentElement: HTMLElement) {
        const canvas = document.createElement('canvas');
        this._canvas = canvas;
        this._parentElement = parentElement;
        this._parentElement.appendChild(this._canvas);

        // Create canvas and context
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Cannot create canvas context');
        }
        ctx.imageSmoothingEnabled = false;

        this._ctx = ctx;

        // These will be updated
        this._scaleFactor = 1;
        this._canvasWidth = 320;
        this._canvasHeight = 240;
        this.scaleCanvas();

        // Attach event listeners
        window.onresize = () => this.scaleCanvas();


    }

    calculateScalingFactor(): number {
        const boundingRect = this._parentElement.getBoundingClientRect();
        return Math.min(
            Math.floor(boundingRect.width / CANVAS_WIDTH),
            Math.floor(boundingRect.height / CANVAS_HEIGHT)
        );
    }

    scaleCanvas() {
        const scalingFactor = this.calculateScalingFactor();
        this._canvasWidth = CANVAS_WIDTH * scalingFactor;
        this._canvasHeight = CANVAS_HEIGHT * scalingFactor;

        this._canvas.width = this._canvasWidth;
        this._canvas.height = this._canvasHeight;
    }
}