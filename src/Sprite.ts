interface Crop { x: number, y: number, w: number, h: number };
interface Sprites { [name: string]: Crop };

export function loadSpritesheet(url: string): Promise<ImageBitmap> {
    return new Promise((res, _rej) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
            createImageBitmap(img).then(res)
        }
    });
}

export class Sprite {
    constructor(public img: HTMLImageElement | ImageBitmap, public crop: Crop, public flipX = false) { }
}