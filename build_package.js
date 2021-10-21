/* building functionality */

module.exports = {

    /* building creep */
    builder: function(creep) {
        if (creep.energy === 0) {
            var closest_spawn = creep.pos.findNearest(Game.MY_SPAWNS);
            if (closest_spawn) {
                creep.moveTo(closest_spawn);
                if (Memory.use_energy_for_building) {
                    closest_spawn.transferEnergy(creep);
                }
            }
        } else {
            var closest_construction_site = creep.pos.findNearest(Game.CONSTRUCTION_SITES);
            if (closest_construction_site) {
                creep.moveTo(closest_construction_site);
                creep.build(closest_construction_site);
            }
        }
    },

    /* list of building creeps */
    get_builders: function() {
        var builders = [];
        for (var i in Game.creeps) {
            var creep = Game.creeps[i];
            if (creep.memory.job == 'building') {
                builders.push(creep);
            }
        }
        return builders;
    },

    /* initialize a new building creep */
    spawn_builder: function(spawn) {
        return spawn.createCreep([
            Game.WORK,
            Game.WORK,
            Game.CARRY,
            Game.MOVE
        ], undefined, {job: 'building'});
    }

}
