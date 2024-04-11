import * as PIXI from 'pixi.js'
import { logic } from '.'

export class Board extends PIXI.Container {
    constructor() {
        super()
        this.background = this.addChild(PIXI.Sprite.from('board')) //const
        this.background.position.set(-this.background.width / 2, - this.background.height / 2)
        const { position, width, height } = logic
        this.gameWidth = width
        this.gameHeight = height
        this.cellSize = this.background.width / width
        this.focusGraphics = this.background.addChild(new PIXI.Graphics())
        this.destroyedGraphics = this.background.addChild(new PIXI.Graphics().lineStyle({ width: 5, color: 0 }))
        logic.onMove(this.drawFocus.bind(this))
        logic.onDestroy((position, isGameOver) => {
            this.destroy(position)
        })
        this.drawFocus(position)
    }

    /**
     * @param {[number, number]} position 
     */
    drawFocus([x, y]) {
        this.focusGraphics.clear().lineStyle({ color: 0xffffff, width: 5, alpha: 0.4 })
            .drawRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize)
    }

    /**
     * @param {[number, number]} position 
     */
    destroy([x, y]) {
        this.destroyedGraphics
            .moveTo(x * this.cellSize, y * this.cellSize)
            .lineTo((x + 1) * this.cellSize, (y + 1) * this.cellSize)
            .moveTo((x + 1) * this.cellSize, y * this.cellSize)
            .lineTo(x * this.cellSize, (y + 1) * this.cellSize)
    }
}