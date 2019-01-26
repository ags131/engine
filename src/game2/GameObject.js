import system from './System'
import RoomPosition from './RoomPosition'

export default class RoomObject {
  constructor (id) {
    this._id = id
  }
  get id() { return this._id },
  get pos() { 
    const obj = system.object(this._id)
    return new RoomPosition(obj.x, obj.y, obj.room)
  }
}