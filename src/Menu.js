import * as PIXI from 'pixi.js'
import { screenHeihgt, screenWidth } from '.'

export class Menu extends PIXI.Container {
    constructor() {
        super()
        this.addChild(new PIXI.Graphics())
            .beginFill(0, 0.5)
            .drawRect(0,0,screenWidth, screenHeihgt)
    }

    createButtons() {

    }
}