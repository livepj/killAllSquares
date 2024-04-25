
import * as PIXI from 'pixi.js';
import { Input } from './assets/Input';
import { Board } from './Board';
import { KeyboardHandler } from './KeyboardHandler';
import { BaseGame } from './BaseGame';
import { Panel } from './Panel';
import { Scores } from './Scores';
import { Sound } from './Sound';

export const screenWidth = 1920, screenHeihgt = 1080
const app = new PIXI.Application({ width: screenWidth, height: screenHeihgt, backgroundColor: 0x27c2a7 });
document.body.appendChild(app.view);
globalThis.__PIXI_APP__ = app;
export const keyboardHandler = new KeyboardHandler()
export const baseGame = new BaseGame()
export const scores = new Scores()
export const sound = new Sound()
app.loader
    .add('board', "assets/board.png")
    .load(() => {
        const board = app.stage.addChild(new Board());
        board.position.set(screenWidth / 2, screenHeihgt / 2)
        app.stage.addChild(new Panel())
        new Input()
    });
window.baseGame = baseGame
