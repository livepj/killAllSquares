import * as PIXI from 'pixi.js'
import { scores, screenWidth } from '.'

export class Panel extends PIXI.Container {
    #style = this.addChild(new PIXI.Text('0', { fontSize: 190 }))
    #score = this.addChild(new PIXI.Text('0', { fontSize: 70 }))
    #timeBar = this.addChild(new PIXI.Graphics())
    constructor() {
        super()
        this.#style.position.set(196, 350)
        this.#style.anchor.set(0.5)
        this.#score.position.set(10, 100)
        this.#timeBar.beginFill(0xFF00000).drawRect(0, 0, screenWidth, 30).endFill()
        PIXI.Ticker.shared.add(() => {
            const { style, levelProgress, score, level } = scores
            this.#timeBar.scale.set(level && levelProgress, 1)
            this.#score.text = "Score: " + score.toString()
            this.#style.text = style
        })
    }
}