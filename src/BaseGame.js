export class BaseGame {
    #width = 9
    #height = 8
    #position = [0, 0]
    #onMoveCallbacks = []
    #onDestroyCallbacks = []
    #onMissCallbacks = []
    #onStartCallbacks = []
    #board = 0

    get height() {
        return this.#height
    }

    get width() {
        return this.#width
    }

    get position() {
        return this.#position.concat()
    }

    /**
     * @param {boolean} isRight 
     */
    moveHorisontal(isRight) {
        let x = this.#position[0] + (isRight ? 1 : -1)
        if (x >= this.width) {
            x -= this.width
        } else if (x < 0) {
            x += this.width
        }
        this.#position[0] = x
        this.#onMoveCallbacks.forEach(callback => callback(this.position))
    }

    /**
     * @param {boolean} isDown 
     */
    moveVertical(isDown) {
        let y = this.#position[1] + (isDown ? 1 : -1)
        if (y >= this.height) {
            y -= this.height
        } else if (y < 0) {
            y += this.height
        }
        this.#position[1] = y
        this.#onMoveCallbacks.forEach(callback => callback(this.position))
    }

    destroy() {
        const [x, y] = this.#position
        const cell = 1n << BigInt(y * this.#width + x)
        if (!(this.#board & cell)) {
            this.#onMissCallbacks.forEach(callback => callback(this.position, this.#board === 0n))
            return
        }
        this.#board &= ~cell
        this.#onDestroyCallbacks.forEach(callback => callback(this.position, this.#board === 0n))
    }

    /**
     * @param {(position: [number, number]) => void} callback
     */
    onMove(callback) {
        this.#onMoveCallbacks.push(callback)
    }

    /**
     * @param {(position: [number, number], isGameOver: boolean) => void} callback
     */
    onDestroy(callback) {
        this.#onDestroyCallbacks.push(callback)
    }

    /**
     * @param {() => void} callback
     */
    onMiss(callback) {
        this.#onMissCallbacks.push(callback)
    }

    /**
     * @param {() => void} callback
     */
    onStart(callback) {
        this.#onStartCallbacks.push(callback)
    }

    start() {
        this.#position = [0, 0]
        this.#board = (1n << BigInt(this.#width * this.#height)) - 1n
        this.#onStartCallbacks.forEach(callback => callback())
    }
}