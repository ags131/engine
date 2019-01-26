export default {
  state: {
    rooms: new Map(),
    objects: new Map(),
    users: new Map(),
    time: 0,
  },
  intents: {},
  cache: {
    room: new Map(),
    object: new Map()
  },
  classRegister: new Map(),
  objectExists(id) {
    return this.state.objects.has(id)
  },
  object(id) { return this.state.objects.get(id) },
  user(id) { return this.state.users.get(id) },
  room(id) { return this.state.rooms.get(id) },
  cleanupCache() {
    for(const key of this.cache.room.keys()) {
      if(!this.state.rooms.has(key)) {
        this.cache.room.delete(key)
      }
    })
    for(const key of this.cache.object.keys()) {
      if(!this.state.objects.has(key)) {
        this.cache.object.delete(key)
      }
    })
  },
  createObject(id) {
    if(!this.cache.object.has(id)) {
      const data = this.object(id)
      if (!data) return undefined
      const constr = this.classRegister.get(data.type)
      this.cache.object.set(id, new constr(data))
    }
    return this.cache.object.get(id)
  },
  createRoom(roomName) {
    if(!this.cache.room.has(roomName)) {
      const data = this.room(roomName)
      if (!data) return undefined
      const constr = this.classRegister.get('room')
      this.cache.room.set(roomName, new constr(data))
    }
    return this.cache.room.get(roomName)
  },
  console: {
    messages: [],
    reset() {
      messages: [],
      commandResults: [],
      visual: {},
      visualSize(roomName = '') {
        return (this.visual[roomName] || '').length
      },
      clearVisual(roomName = '') {
        this.visual[roomName] = ''
      }
    }
  }
}