# cebo

`cebo`, or `c'est beau` in french, is a very simple library that allow to display spinners in terminals.

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the [npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/) v14.X.X or higher.

Installation is done using the [npm install command](https://docs.npmjs.com/downloading-and-installing-packages-locally):

```bash
npm install cebo
```

## Features

- Simple tasker with fail or success exit
- Simple spinner runner
- can be used with [cli-spinners](https://www.npmjs.com/package/cli-spinners)

## Quick start

For a simple spinner :

```javascript
import { Spinner } from 'cebo'

const spinner = new Spinner('Connecting to database')
setTimeout(() => {
  spinner.success('Connected to database')
}, 2000)
```

For a hole task :

```javascript
import { Task } from 'cebo'

await new Task('Connecting to database...', async task => {
  // Doing stuff here ...
  await new Promise(resolve => setTimeout(resolve, 2000))
  task.fail('Connected to database')
}).run()
await new Task('Creating http server...', async task => {
  // Doing stuff here ...
  await new Promise(resolve => setTimeout(resolve, 3000))
  task.success('HTTP server listening on port 8000')
}).run()
```

## Documentation

Promise, all stuff is very simple and quick.

### Spinner

#### Spinner(options)

Create a new spinner. Options can be a string that will be used as spinner text.

Also options can be an object as (here with default values):

```javascript
new Spinner({
  text: '',
  color: 'yellow',
  spinner: {
    interval: 100,
    frames: ['◜', '◠', '◝', '◞', '◡', '◟'],
  },
  autoStart: true,
  successChar: '✔',
  successCharColor: 'green',
  failChar: '✖',
  failCharColor: 'red',
})
```

#### Spinner.start()

Start the spinner, already started by default.

#### Spinner.stop()

Pause the spinner.

#### Spinner.fail(text)

Stop and mark as fail the spinner.

#### Spinner.success(text)

Stop and mark as success the spinner.

### Task

#### Task(text, callback, ?spinner)

`text` parameter is the pending spinner text.

`callback` receive task instance as parameter, can be asynchronous.

`spinner` is optionnal, provide a custom spinner.

#### Task.run()

This method is an async because of async callbacks.

## Pilosophy

This package follow the following rule :

```text
If it is useless, so it is necessary.
```

That's all, have a good day =D

## License

Please check the [MIT License](./LICENSE)
