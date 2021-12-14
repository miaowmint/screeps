var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var mystorage =  Game.getObjectById('6178ba95d457732963798589');

        if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
            creep.memory.repairing = true;
            creep.say('⚡ repair');
        }

        if(creep.memory.repairing) {
            const targets = creep.room.find(FIND_MY_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });
            
            targets.sort((a,b) => a.hits - b.hits);
            
            if(targets.length > 0) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else {
            if(creep.harvest(mystorage) == ERR_NOT_IN_RANGE) {
                creep.moveTo(mystorage, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleRepairer;