export class KeyboardHandler {
    #keyDict = {}
    #callBacksDict = {}
    
    constructor() {
        document.addEventListener('keydown', ({ code }) => {
            if (!this.#keyDict[code]) {
                this.#callBacksDict[code]?.forEach(callBack => callBack(code))
                this.#keyDict[code] = true
            }
        })
        document.addEventListener('keyup', e => (this.#keyDict[e.code] = false))
    }

    /**
     * @param {string} code
     * @param {() => void} callBack
     */
    onKeyDown(code, callBack) {
        if (!this.#callBacksDict[code]) {
            this.#callBacksDict[code] = [callBack]
        } else {
            this.#callBacksDict[code].push(callBack)
        }
    }
}
