/* harvesting functionality */

module.exports = {

    /* energy harvesting creep */
    harvester: function(creep) {
        if (creep.energy < creep.energyCapacity) {
            var closest_source = creep.pos.findNearest(Game.SOURCES);
            if (closest_source) {
                creep.moveTo(closest_source);
                creep.harvest(closest_source);
            }
        } else {
            var closest_spawn = creep.pos.findNearest(Game.MY_SPAWNS, {
                filter: function(delivery_candidate_spawn) {
                    return delivery_candidate_spawn.energy < delivery_candidate_spawn.energyCapacity;
                }
            });
            if (closest_spawn) {
                creep.moveTo(closest_spawn);
                creep.transferEnergy(closest_spawn);
            }
        }
    },

    /* list of harvesting creeps */
    get_harvesters: function() {
        var harvesters = [];
        for (var i in Game.creeps) {
            var creep = Game.creeps[i];
            if (creep.memory.job == 'harvesting') {
                harvesters.push(creep);
            }
        }
        return harvesters;
    },

    /* initialize a new harvesting creep */
    spawn_harvester: function(spawn) {
        return spawn.createCreep([
            Game.WORK,
            Game.CARRY,
            Game.MOVE
        ], undefined, {job: 'harvesting'});
    }

}
