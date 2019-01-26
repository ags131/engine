import system from './System'
import C from './Constants'

export default {
  ownerWrap(id) {
    return {
      get username() {
        const obj = system.object(id)
        return system.user(obj.user).username
      }
    }
  },
  storeWrap(id) {
    return new Proxy({}, {
      get(target, name) {
        if(C.RESOURCES_ALL.includes(name)) {
          const obj = system.object(id)
          if(name === 'energy') return obj.energy || 0
          return obj[name]
        }
      }
    })
  }
}