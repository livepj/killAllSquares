
import * as PIXI from 'pixi.js';
import { Input } from './assets/Input';
import { Board } from './Board';
import { Logic } from './Logic';

const width = 1920, height = 1080
const app = new PIXI.Application({ width, height, backgroundColor: 0x27c2a7 });
document.body.appendChild(app.view);
globalThis.__PIXI_APP__ = app;
export const logic = new Logic()
app.loader
    .add('board', "assets/board.png")
    .load(() => {
        const board = app.stage.addChild(new Board());
        board.position.set(width / 2, height / 2)
        new Input()
    });
window.logic = logic
