import { baseGame } from "..";
import { keyboardHandler } from "..";

export class Input {
    constructor() {
        keyboardHandler.onKeyDown('ArrowLeft', () => baseGame.moveHorisontal(false))
        keyboardHandler.onKeyDown('ArrowRight', () => baseGame.moveHorisontal(true))
        keyboardHandler.onKeyDown('ArrowUp', () => baseGame.moveVertical(false))
        keyboardHandler.onKeyDown('ArrowDown', () => baseGame.moveVertical(true))
        keyboardHandler.onKeyDown('Enter', () => baseGame.destroy())
    }
}