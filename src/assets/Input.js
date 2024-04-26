import { baseGame } from "..";
import { keyboardHandler } from "..";

export class Input {
    #isPlaying = true
    constructor() {
        keyboardHandler.onKeyDown('ArrowLeft', () => this.#isPlaying && baseGame.moveHorisontal(false))
        keyboardHandler.onKeyDown('ArrowRight', () => this.#isPlaying && baseGame.moveHorisontal(true))
        keyboardHandler.onKeyDown('ArrowUp', () => this.#isPlaying && baseGame.moveVertical(false))
        keyboardHandler.onKeyDown('ArrowDown', () => this.#isPlaying && baseGame.moveVertical(true))
        keyboardHandler.onKeyDown('Enter', () => this.#isPlaying && baseGame.destroy())
        baseGame.onDestroy((_, isGameOver) => {
            this.#isPlaying = !isGameOver
        })
        baseGame.onStart(() => {
            this.#isPlaying = true
        })
    }
}