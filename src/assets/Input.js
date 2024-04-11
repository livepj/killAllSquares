import { logic } from "..";
import { keyboardHandler } from "../KeyboardHandler";

export class Input {
    constructor() {
        keyboardHandler.onKeyDown('ArrowLeft', () => logic.moveHorisontal(false))
        keyboardHandler.onKeyDown('ArrowRight', () => logic.moveHorisontal(true))
        keyboardHandler.onKeyDown('ArrowUp', () => logic.moveVertical(false))
        keyboardHandler.onKeyDown('ArrowDown', () => logic.moveVertical(true))
        keyboardHandler.onKeyDown('Enter', () => logic.destroy())
    }
}