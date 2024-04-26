import { Howl } from 'howler'
import { baseGame } from '.'

export class Sound {
    #background = new Howl({ loop: true, src: "assets/background.mp3", volume: 0.3 })
    #start = new Howl({ src: "assets/start.mp3", volume: 1 })
    #finish = new Howl({ src: "assets/finish.mp3", volume: 1 })
    #miss = new Howl({ src: "assets/miss.mp3", volume: 1 })
    #destroyed = new Howl({ src: "assets/destroyed.wav", volume: 1 })
    constructor() {
        this.#start.on("end", () => {
            this.#background.play()
        })
        baseGame.onDestroy((_, isGameOver) => {
            this.#destroyed.play()
            if (isGameOver) {
                this.#background.stop()
                this.#finish.play()
            }
        })
        baseGame.onMiss(() => {
            this.#miss.play()
        })
        baseGame.onStart(() => {
            this.#finish.stop()
            this.#start.play()
        })
    }
}