import colors from 'colors'

/**
 * @typedef SpinnerOptions
 * @property {string} text Spinner text
 * @property {string} color Spinner color
 * @property {object} spinner Custom spinner
 * @property {boolean} autoStart Start spinner on creation
 * @property {string} successChar Success character
 * @property {string} successCharColor Color of the success character
 * @property {string} failChar Fail character
 * @property {string} failCharColor Color of the fail character
 */

/**
 * Terminal spinner.
 */
export class Spinner {
  static enabled = true

  /**
   * Instanciate a spinner.
   *
   * @param {SpinnerOptions} options Spinner options
   */
  constructor(options) {
    this.__iteration = 0
    this.__clock = undefined
    this.text = ''
    this.color = 'yellow'
    this.spinner = {
      interval: 100,
      frames: ['◜', '◠', '◝', '◞', '◡', '◟'],
    }
    this.autoStart = true

    this.successChar = '✔'
    this.successCharColor = 'green'
    this.failChar = '✖'
    this.failCharColor = 'red'

    if (typeof options === 'string') {
      this.text = options
    } else {
      this.__parseParams(options)
    }
    if (this.autoStart) {
      this.start()
    }
  }

  /**
   * Enable or disable spinner
   *
   * @param {boolean} status true or false
   */
  static enable(status) {
    Spinner.enabled = status
  }

  /**
   * Parse spinner options.
   *
   * @param {SpinnerOptions} options Spinner options
   */
  __parseParams(options) {
    if (options?.text) this.text = text
    if (options?.color) this.color = color
    if (options?.spinner) this.spinner = spinner
    if (options?.autoStart) this.autoStart = autoStart
    if (options?.successChar) this.successChar = options.successChar
    if (options?.successCharColor) this.successCharColor = options.successCharColor
    if (options?.failChar) this.failChar = options.failChar
    if (options?.failCharColor) this.failCharColor = options.failCharColor
  }

  /**
   * Rewrite a line.
   *
   * @param {string} text Text to write out
   */
  __newLine(text) {
    if (Spinner.enabled) {
      process.stdout.clearLine()
      process.stdout.cursorTo(0)
      process.stdout.write(text)
    } else {
      console.log(text)
    }
  }

  /**
   * Start the spinner.
   */
  start() {
    if (Spinner.enabled) {
      this.__clock = setInterval(() => {
        this.__iteration++
        const frame = this.spinner.frames[this.__iteration % this.spinner.frames.length]
        this.__newLine(`${colors[this.color](frame)} ${colors.dim(this.text)}`)
      }, this.spinner.interval)
    } else {
      this.__newLine(this.text)
    }
  }

  /**
   * Pause the spinner.
   */
  stop() {
    if (this.__clock) {
      clearInterval(this.__clock)
      this.__clock = undefined
    }
    if (Spinner.enabled) {
      this.__newLine(this.text)
    }
  }

  /**
   * Mark the spinner as successful.
   *
   * @param {strin} text Success text
   */
  success(text) {
    this.stop()
    if (Spinner.enabled) {
      this.__newLine(`${colors[this.successCharColor](this.successChar)} ${text}\n`)
    } else {
      this.__newLine(text)
    }
  }

  /**
   * Mark the spinner as failed.
   *
   * @param {strin} text Success text
   */
  fail(text) {
    this.stop()
    if (Spinner.enabled) {
      this.__newLine(`${colors[this.failCharColor](this.failChar)} ${text}\n`)
    } else {
      this.__newLine(text)
    }
  }
}

/**
 * Terminal task.
 */
export class Task {
  /**
   * Instanciate a Task.
   *
   * @param {string} text Pending spinner text
   * @param {async (Task) => {}} callback Callback task
   * @param {object} spinner Custom spinner
   */
  constructor(text, callback, spinner = undefined) {
    this.__spinner = undefined

    this.text = text
    this.callback = callback
    this.spinnerParams = spinner
  }

  /**
   * Execute the task.
   */
  async run() {
    this.__spinner = new Spinner(this.text)
    await this.callback(this)
  }

  /**
   * Mark the task as successful.
   */
  success(text) {
    this.__spinner.success(text)
  }

  /**
   * Mark the task as failed.
   */
  fail(text) {
    this.__spinner.fail(text)
  }
}
