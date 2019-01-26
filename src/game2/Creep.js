import system from './System'
import RoomObject from './RoomObject'
import Source from './Source'
import C from './Constants'

export default class Creep extends RoomObject {
  constructor(id) {
    super(id)
    this.owner = utils.ownerWrap(id)
    this.carry = utils.storeWrap(id)
  }
  get name() { return system.object(this._id).name }
  get body() { return system.object(this._id).body }
  get my() { return system.object(this._id).user === system.state.user._id }
  get spawning() { return system.object(this._id).spawning }
  get ticksToLive() { 
    const obj = system.object(this._id)
    return obj.ageTime ? obj.ageTime - system.state.time : undefined
  }
  get carryCapacity() { return system.object(this._id).energyCapacity }
  get fatigue() { return system.object(this._id).fatigue }
  get hits() { return system.object(this._id).hits }
  get hitsMax() { return system.object(this._id).hitsMax }
  get saying() { 
    const obj = system.object(this._id)
    const {
      actionLog: { 
        say: { 
          message,
          isPublic = false 
        } = {}
      } = {}
    } = obj
    if (obj.user == system.state.user._id) {
      return message
    }
    return isPublic ? message : undefined
  }
  get memory() {
    if (this.id && !this.my) {
      return undefined
    }
    if (typeof global.Memory.creeps === 'undefined') {
      global.Memory.creeps = {}
    }
    if (typeof global.Memory.creeps !== 'object') {
      return undefined
    }
    return global.Memory.creeps[this.name] = global.Memory.creeps[this.name] || {}    
  }
  set memory(value) {
    if (this.id && !this.my) {
      throw new Error('Could not set other player\'s creep memory')
    }
    if (typeof global.Memory.creeps === 'undefined') {
      global.Memory.creeps = {}
    }
    if (typeof global.Memory.creeps !== 'object') {
      throw new Error('Could no set creep memory')
    }
    global.Memory.creeps[this.name] = value
  }
  toString() {
    return `[creep ${this.name}]`
  }
  move(target) {
    if (!this.my) {
      return C.ERR_NOT_OWNER
    }
    if (this.spawning) {
      return C.ERR_BUSY
    }
    if (target && target instanceof Creep) {
      if (!target.pos.isNearTo(this.pos)) {
        return C.ERR_NOT_IN_RANGE
      }
      state.intents.set(this.id, 'move', { id: target.id })
      return C.OK
    }
    if (this.fatigue > 0) {
      return C.ERR_TIRED
    }
    if (!_hasActiveBodyPart(this.body, C.MOVE)) {
      return C.ERR_NO_BODYPART
    }
    const direction = +target
    if (!direction || direction < 1 || direction > 8) {
      return C.ERR_INVALID_ARGS
    }
    state.intents.set(this.id, 'move', { direction })
    return C.OK
  }
  moveTo(firstArg, secondArg, opts) {
    // TODO: Creep.moveTo
  }
  moveByPath(path) {
    // TODO: Creep.moveByPath
  }
  harvest(target) {
    if (!this.my) {
      return C.ERR_NOT_OWNER
    }
    if (this.spawning) {
      return C.ERR_BUSY
    }
    if (!_hasActiveBodypart(this.body, C.WORK)) {
      return C.ERR_NO_BODYPART
    }
    if (!target || !target.id) {
      return C.ERR_INVALID_TARGET
    }
    if (system.objectExists(target.id) && target instanceof Source) {
      if (!target.energy) {
        return C.ERR_NOT_ENOUGH_RESOURCES
      }
      if (!target.pos.isNearTo(this.pos)) {
        return C.ERR_NOT_IN_RANGE
      }
      const controller = this.room.controller
      if (controller && (
      controller.owner && this.controller.owner.username !== system.state.user.username ||
      controller.reservation && this.controller.reservation.username !== system.state.user.username)) {
        return C.ERR_NOT_OWNER
      }
    } else if (system.objectExists(target.id) && target instanceof Mineral) {
      if (!target.mineralAmount) {
        return C.ERR_NOT_ENOUGH_RESOURCES
      }
      if(!target.pos.isNearTo(this.pos)) {
        return C.ERR_NOT_IN_RANGE
      }
      const extractor = target.pos.lookFor('structure').find(s => s.structureType === C.STRUCTURE_EXTRACTOR)
      if (!extractor) {
        return C.ERR_NOT_FOUND
      }
      if (extractor.owner && !extractor.my) {
        return C.ERR_NOT_OWNER
      }
      if (!extractor.isActive()) {
        return C.ERR_RCL_NOT_ENOUGH
      }
      if (extractor.cooldown) {
        return C.ERR_TIRED
      }
    } else {
      return C.ERR_INVALID_TARGET
    }
    state.intents.set(this.id, 'harvest', { id: target.id })
    return C.OK
  }
  drop(resourceType, amount) {
    // TODO: Creep.drop
  }
  transfer(target, resourceType, amount) {
    // TODO: Creep.transfer
  }
  withdraw(target, resourceType, amount) {
    // TODO: Creep.withdraw
  }
  pickup(target) {
    // TODO: Creep.pickup
  }
  attack(target) {
    // TODO: Creep.attack
  }
  rangedAttack(target) {
    // TODO: Creep.rangedAttack
  }
  rangedMassAttack(target) {
    // TODO: Creep.rangedMassAttack
  }
  heal(target) {
    // TODO: Creep.heal
  }
  rangedHeal(target) {
    // TODO: Creep.rangedHeal
  }
  repair(target) {
    // TODO: Creep.repair
  }
  build(target) {
    // TODO: Creep.build
  }
  suicide(target) {
    // TODO: Creep.suicide
  }
  say(target) {
    // TODO: Creep.say
  }
  claimController(target) {
    // TODO: Creep.claimController
  }
  attackController(target) {
    // TODO: Creep.attackController
  }
  upgradeController(target) {
    // TODO: Creep.upgradeController
  }
  reserveController(target) {
    // TODO: Creep.reserveController
  }
  notifyWhenAttacked(enabled) {
    // TODO: Creep.notifyWhenAttacked
  }
  cancelOrder(name) {
    // TODO: Creep.cancelOrder
  }
  dismantle(target) {
    // TODO: Creep.dismantle
  }
  generateSafeMode(target) {
    // TODO: Creep.generateSafeMode
  }
  signController(target, sign) {
    // TODO: Creep.signController
  }
  pull(target) {
    // TODO: Creep.pull
  }  
  getActiveBodyparts(type) {
    let count = 0;
    const body = this.body
    for(var i = body.length-1; i>=0; i--) {
      if (body[i].hits <= 0)
        break;
      if (body[i].type === type)
        count++;
    }
    return count;
  }  
}

function _hasActiveBodypart(body, type) {
  for(let i = body.length-1; i>=0; i--) {
    if (body[i].hits <= 0)
      break;
    if (body[i].type === type)
      return true;
    }
  return false;
}