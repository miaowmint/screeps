var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var mystorage =  Game.getObjectById('6178ba95d457732963798589');

        if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            if(creep.transfer(mystorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(mystorage, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
};

module.exports = roleHarvester;