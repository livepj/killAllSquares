import * as PIXI from 'pixi.js'
import { baseGame } from '.'
import gsap from 'gsap'

export class Board extends PIXI.Container {
    /** @type {{blade:PIXI.Container, timeline: GSAPTimeline}[][]} */
    #destroyAnimations = []

    constructor() {
        super()
        this.background = this.addChild(PIXI.Sprite.from('board')) //const
        this.background.position.set(-this.background.width / 2, - this.background.height / 2)
        const { position, width, height } = baseGame
        this.gameWidth = width
        this.gameHeight = height
        this.cellSize = this.background.width / width
        this.destroyedGraphics = this.background.addChild(new PIXI.Graphics().lineStyle({ width: 5, color: 0 }))
        baseGame.onMove(this.#drawFocus.bind(this))
        baseGame.onDestroy((position) => {
            this.#destroy(position)
        })
        this.#drawDestroyAnimations()
        this.focusGraphics = this.background.addChild(new PIXI.Graphics())
        this.#drawFocus(position)
    }

    /**
     * @param {[number, number]} position 
     */
    #drawFocus([x, y]) {
        this.focusGraphics.clear().lineStyle({ color: 0xffffff, width: 5, alpha: 0.4 })
            .drawRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize)
    }

    /**
     * @param {[number, number]} position 
     */
    #destroy([x, y]) {
        const {timeline, blade, fade} = this.#destroyAnimations[x][y]
        fade.visible = blade.visible = true
        timeline.play(0)
    }

    #drawDestroyAnimations() {
        const height = this.cellSize * 1.5
        const width = height / 10
        const bold = height * 0.45
        const backContainer = this.background.addChild(new PIXI.Container())
        const frontContainer = this.background.addChild(new PIXI.Container())

        for (let x = this.gameWidth; x--;) {
            this.#destroyAnimations[x] = []
            for(let y = this.gameHeight; y--;) {
                const bladeContainer = frontContainer.addChild(new PIXI.Container())
                bladeContainer.position.set(x*this.cellSize, y*this.cellSize)
                bladeContainer.visible = false

                const fadeContainer = backContainer.addChild(new PIXI.Container())
                fadeContainer.position = bladeContainer.position


                const fade = fadeContainer.addChild(new PIXI.Graphics()).beginFill(0).drawRect(0,0,this.cellSize,this.cellSize)
                const blades = [-45, 45].map((angle, i) => {
                    const container = bladeContainer.addChild(new PIXI.Container())
                    container.angle = angle
                    container.x = i * this.cellSize
                    const blade = container.addChild(new PIXI.Graphics())
                    const mask = container.addChild(new PIXI.Graphics())
                    blade.mask = mask
                    const maskRect = {x:-width/2-1, y:-height -1, width: width + 2, height: height*2+2 }
                    mask.beginFill(0)
                        .drawRect(maskRect.x, maskRect.y, maskRect.width,maskRect.height)
                        .endFill()
                        .beginHole()
                        .moveTo(maskRect.x + 1, maskRect.y + 1)
                        .lineTo(maskRect.x + maskRect.width - 1, maskRect.y +1)
                        .lineTo(maskRect.x + maskRect.width - 1, maskRect.y + maskRect.height / 2)
                        .bezierCurveTo(maskRect.x + maskRect.width - 1, maskRect.y + maskRect.height / 2, maskRect.x + maskRect.width /2 , maskRect.y + maskRect.height/2 + width/2, maskRect.x + 1, maskRect.y + maskRect.height/2)
                        .lineTo(maskRect.x + 1, maskRect.y + 1)
                        .closePath()
                        .endHole()
                    
                    const dots = [[-width / 2, 0], [0, height / 4], [width / 2, 0], [width / 2, bold], [0, height], [-width / 2, bold]]
                    blade.beginFill(0xEEEEEE)
                        .moveTo(...dots[0])
                        .lineTo(...dots[2])
                        .bezierCurveTo(...dots[2], ...dots[3], ...dots[4])
                        .bezierCurveTo(...dots[4], ...dots[5], ...dots[0])
                        .endFill()
                    return blade
                });
                const timeline = gsap.timeline({paused:true})
                    .from(blades, { y: -height, duration: 0.5, ease:'power3.in'})
                    .fromTo(fade, { alpha: 0, duration: 2}, {alpha:1})

                this.#destroyAnimations[x][y] = { blade: bladeContainer, timeline, fade: fadeContainer }
            }
        }
  

    }

    reset() {
        this.#destroyAnimations.forEach(innerArr => innerArr.forEach(({blade, fade})=> fade.visible = blade.visible = false))
        this.#drawFocus([0,0])
    }
}