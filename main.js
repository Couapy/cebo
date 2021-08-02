import colors from 'colors'

export class Spinner {
  static enable = true

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

  static enable(status) {
    Spinner.enable = status
  }

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

  __newLine(text) {
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    process.stdout.write(text)
  }

  start() {
    if (Spinner.enable) {
      this.__clock = setInterval(() => {
        this.__iteration++
        const frame = this.spinner.frames[this.__iteration % this.spinner.frames.length]
        this.__newLine(`${colors[this.color](frame)} ${colors.dim(this.text)}`)
      }, this.spinner.interval)
    } else {
      this.__newLine(this.text)
    }
  }

  stop() {
    if (this.__clock) {
      clearInterval(this.__clock)
      this.__clock = undefined
    }
    this.__newLine(this.text)
  }

  success(text) {
    this.stop()
    if (Spinner.enable) {
      this.__newLine(`${colors[this.successCharColor](this.successChar)} ${text}\n`)
    } else {
      this.__newLine(text)
    }
  }

  fail(text) {
    this.stop()
    if (Spinner.enable) {
      this.__newLine(`${colors[this.failCharColor](this.failChar)} ${text}\n`)
    } else {
      this.__newLine(text)
    }
  }
}

export class Task {
  constructor(text, callback, spinner = undefined) {
    this.__spinner = undefined

    this.text = text
    this.callback = callback
    this.spinnerParams = spinner
  }

  async run() {
    this.__spinner = new Spinner(this.text)
    const stopCallback = () => {
      spinner.stop(this.text)
    }
    await this.callback(this)
  }

  success(text) {
    this.__spinner.success(text)
  }

  fail(text) {
    this.__spinner.fail(text)
  }
}
