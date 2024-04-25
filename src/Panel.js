import * as PIXI from 'pixi.js'
import { scores } from '.'

export class Panel extends PIXI.Container {
    #style = this.addChild(new PIXI.Text('0', { fontSize: 50 }))
    #score = this.addChild(new PIXI.Text('0', { fontSize: 50 }))
    #timeBar = this.addChild(new PIXI.Graphics())
    constructor() {
        super()
        this.#style.position.set(20, 20)
        this.#score.position.set(20, 100)
        this.#timeBar.beginFill(0xffffff).drawRect(0, -3, 100, 8).endFill()
        PIXI.Ticker.shared.add(() => {
            const { style, levelProgress, score, level } = scores
            this.#timeBar.scale.set(level && levelProgress, 1)
            this.#score.text = score.toString()
            this.#style.text = style
        })
    }
}