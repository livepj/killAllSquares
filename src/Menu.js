import * as PIXI from 'pixi.js'
import { baseGame, scores, screenHeihgt, screenWidth } from '.'

export class Menu extends PIXI.Container {
    /** @type {PIXI.Text} */
    #scoreText
    /** @type {PIXI.Text} */
    #highScoreText
    constructor() {
        super()
        this.#createBackground()
        this.#createScores()
        this.#createButton()
        baseGame.onDestroy((_, isGameOver) => {
            if (isGameOver) {
                this.#setScores()
                this.visible = true
            }
        })
        baseGame.onStart(() => {
            this.visible = false
        })
    }

    #createButton() {
        const width = 200
        const height = 100
        const button = this.addChild(new PIXI.Graphics())
            .beginFill(0)
            .drawRect(0, 0, width, height)
        button.position.set(screenWidth / 2 - width / 2, screenHeihgt / 2 - height / 2 + 100)
        button.on('pointertap', () => baseGame.start())
        button.interactive = button.buttonMode = true
        const text = button.addChild(new PIXI.Text("RESTART", { fontSize: 40, fill: 0xFFFFFF }))
        text.anchor.set(0.5)
        text.position.set(width / 2, height / 2)
    }

    #createScores() {
        this.#scoreText = this.addChild(new PIXI.Text("Score: 100", { fontSize: 50 }))
        this.#scoreText.position.set(screenWidth / 2 - 200, screenHeihgt / 2 - 170)
        this.#highScoreText = this.addChild(new PIXI.Text("Highscore: 200", { fontSize: 50 }))
        this.#highScoreText.position.set(screenWidth / 2 - 200, screenHeihgt / 2 - 70)
    }

    #createBackground() {
        this.addChild(new PIXI.Graphics())
            .beginFill(0, 0.5)
            .drawRect(0, 0, screenWidth, screenHeihgt)
        const height = 500
        const width = 500
        this.addChild(new PIXI.Graphics())
            .beginFill(0xFFFFFF)
            .drawRoundedRect(screenWidth / 2 - width / 2, screenHeihgt / 2 - height / 2, width, height, 15)
    }

    #setScores() {
        this.#scoreText.text = "Score: " + scores.score
        this.#highScoreText.text = "Highscore: " + scores.hightScore
    }
}