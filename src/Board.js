import * as PIXI from 'pixi.js'
import { baseGame } from '.'
import gsap from 'gsap'

export class Board extends PIXI.Container {
    constructor() {
        super()
        this.background = this.addChild(PIXI.Sprite.from('board')) //const
        this.background.position.set(-this.background.width / 2, - this.background.height / 2)
        const { position, width, height } = baseGame
        this.gameWidth = width
        this.gameHeight = height
        this.cellSize = this.background.width / width
        this.focusGraphics = this.background.addChild(new PIXI.Graphics())
        this.destroyedGraphics = this.background.addChild(new PIXI.Graphics().lineStyle({ width: 5, color: 0 }))
        baseGame.onMove(this.drawFocus.bind(this))
        baseGame.onDestroy((position, isGameOver) => {
            this.destroy(position)
        })
        this.drawFocus(position)
        this.drawDestroy()
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
        const destroyMS = 300
        this.destroyedGraphics
            .moveTo(x * this.cellSize, y * this.cellSize)
            .lineTo((x + 1) * this.cellSize, (y + 1) * this.cellSize)
            .moveTo((x + 1) * this.cellSize, y * this.cellSize)
            .lineTo(x * this.cellSize, (y + 1) * this.cellSize)
    }

    drawDestroy() {


        const realPath = this.background.addChild(new PIXI.Graphics());
        realPath.position.set(200);

        const width = 100
        const height = 300
        const bold = 130
        //const dots = [{ x: -width / 2, y: 0 }, { x: 0, y: height / 2 }, { x: width / 2, y: 0 }, { x: width / 2, y: bold }, { x: 0, y: height }, { x: -width / 2, y: bold }]
        const dots = [[-width / 2, 0], [0, height / 2], [width / 2, 0], [width / 2, bold], [0, height], [-width / 2, bold]]
        gsap.from(dots.slice(3), { 0: 0, 1: 0, duration: 1, onUpdate: () => {
            realPath.clear().beginFill(0xffffff)
                .lineTo(...dots[0])
                .bezierCurveTo(...dots[0], ...dots[1], ...dots[2])
                .bezierCurveTo(...dots[2], ...dots[3], ...dots[4])
                .bezierCurveTo(...dots[4], ...dots[5], ...dots[0])
                .endFill()
        } })

    }
}