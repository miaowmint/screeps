/* healing functionality */

module.exports = {

    /* healing creep */
    healer: function(creep) {
        var closest_needy_creep = creep.pos.findNearest(Game.MY_CREEPS, {
            filter: function(patient_candidate_creep) {
                return patient_candidate_creep.hits < patient_candidate_creep.hitsMax;
            }
        });
        if (closest_needy_creep) {
            creep.moveTo(closest_needy_creep);
            creep.heal(closest_needy_creep);
        } else {
            // if no creeps are hurt, move to a fighting creep, or rally
            var closest_fighting_creep = creep.pos.findNearest(Game.MY_CREEPS, {
                filter: function(rally_candidate_creep) {
                    return [
                        'guarding',
                        'ranged_guarding'
                    ].indexOf(rally_candidate_creep.memory.job) > -1;
                }
            });
            if (closest_fighting_creep) {
                creep.moveTo(closest_fighting_creep);
            } else {
                var rally_point = Game.flags.RallyPoint;
                if (!rally_point) {
                    rally_point = creep.pos.findNearest(Game.MY_SPAWNS);
                }
                if (rally_point) {
                    creep.moveTo(rally_point);
                }
            }
        }
    },

    /* list of healing creeps */
    get_healers: function() {
        var healers = [];
        for (var i in Game.creeps) {
            var creep = Game.creeps[i];
            if (creep.memory.job == 'healing') {
                healers.push(creep);
            }
        }
        return healers;
    },

    /* initialize a new healing creep */
    spawn_healer: function(spawn) {
        return spawn.createCreep([
            Game.TOUGH,
            Game.TOUGH,
            Game.TOUGH,
            Game.HEAL,
            Game.MOVE
        ], undefined, {job: 'healing'});
    }

}
