import system from './System'

export class Console {
  constructor() {}
  log (...args) {
    const msg = args.map (i => {
      if (i && i.toString) return i.toString()
      if (typeof i === 'undefined') return 'undefined'
      return json.stringify(i)
    }).join(' ')
    system.console.messages.push(msg)
  }
}