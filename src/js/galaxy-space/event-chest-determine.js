define(['jquery', 'eventChestStatusDo'], ($, eventChestStatusDo) => {// eslint-disable-line
  return (chest, targets, isUnlockingChestExisted) => {
    switch (chest.status) {
      case 'LOCKED':
        eventChestStatusDo.locked(chest, targets, isUnlockingChestExisted)
        break

      case 'UNLOCKING':
        eventChestStatusDo.unLocking(chest, targets)
        break

      case 'READY':
        eventChestStatusDo.ready(chest, targets)
        break
    }
  }
})
