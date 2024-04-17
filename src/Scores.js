import * as PIXI from 'pixi.js'
import { baseGame } from '.'

export class Scores {
    #level = 0
    #styles = ' DCBAS'
    #score = 0
    #dificultyFactor = 0.7
    #baseResivedDuration = 1700
    #dropDuration = 2000
    #totalTime = 0
    #maxTime = this.#styles.length * this.#dropDuration - 1
    #baseScoreValue = 10
    constructor() {
        PIXI.Ticker.shared.add(() => {
            const { deltaMS } = PIXI.Ticker.shared
            if (this.totalTime > 0) {
                this.totalTime -= deltaMS
            }
        })
        baseGame.onDestroy(() => {
            this.#score += this.#baseScoreValue * (this.#level + 1)
            this.#totalTime += this.#dificultyFactor ** this.#level * this.#baseResivedDuration
        })
        baseGame.onMiss(() => {
            this.totalTime = 0
        })
    }

    /**
     * @param {number} value
     */
    set totalTime(value) {
        this.#totalTime = value < 0 ? 0 : value > this.#maxTime ? this.#maxTime : value
        this.#level = Math.floor(this.#totalTime / this.#dropDuration)
    }

    get totalTime() {
        return this.#totalTime
    }

    get score() {
        return this.#score
    }

    get levelProgress() {
        return (this.#totalTime % this.#dropDuration) / this.#dropDuration
    }

    get style() {
        return this.#styles[this.#level]
    }

    get level() {
        return this.#level
    }
}