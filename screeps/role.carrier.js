var roleCarrier = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        var mystorage =  Game.getObjectById('6178ba95d457732963798589');

        if(creep.store.getFreeCapacity() > 0) {
            if(creep.harvest(mystorage) == ERR_NOT_IN_RANGE) {
                creep.moveTo(mystorage, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};

module.exports = roleCarrier;