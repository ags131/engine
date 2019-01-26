import system from './System'

export default class Room {
  constructor(roomName) {
    this._name = roomName
  }
  get name() { return this._name }
}