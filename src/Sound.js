import { Howl } from 'howler'
import { baseGame } from '.'

export class Sound {
    #background = new Howl({ loop: true, src: "assets/background.mp3", volume: 0.3 })
    #start = new Howl({ src: "assets/start.mp3", volume: 0.3 })
    #finish = new Howl({ src: "assets/finish.mp3", volume: 0.3 })
    #miss = new Howl({ src: "assets/miss.mp3", volume: 0.3 })
    #destroyed = new Howl({ src: "assets/destroyed.mp3", volume: 0.3 })
    #levelUp = new Howl({ src: "assets/levelUp.mp3", volume: 0.3 })
    constructor() {
        this.#start.once("end", () => {
            this.#background.play()
        })
        baseGame.onDestroy((_, isGameOver) => {
            this.#destroyed.play()
            if (isGameOver) {
                this.#finish.play()
            }
        })
    }
}