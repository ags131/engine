import system from './System'

export class RoomPosition {
  constructor (x, y, roomName) {
    this.x = x,
    this.y = y,
    this.roomName = roomName
  }
  get room() {
    return system.room(this.roomName)
  }
}