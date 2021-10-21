/* guarding functionality */

module.exports = {

    /* ranged guarding creep */
    ranged_guarder: function(creep) {
        // riceball overrides all
        var riceball = Game.flags.RiceBall;
        if (riceball) {
            creep.moveTo(riceball);
            var closest_enemy = creep.pos.findNearest(Game.HOSTILE_CREEPS);
            if (closest_enemy) {
                creep.rangedAttack(closest_enemy);
            }
        } else {
            // if there is no riceball, go to and attack an enemy, or rally
            var closest_enemy = creep.pos.findNearest(Game.HOSTILE_CREEPS);
            if (closest_enemy) {
                creep.moveTo(closest_enemy);
                creep.rangedAttack(closest_enemy);
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

    /* list of ranged guarding creeps */
    get_ranged_guarders: function() {
        var ranged_guarders = [];
        for (var i in Game.creeps) {
            var creep = Game.creeps[i];
            if (creep.memory.job == 'ranged_guarding') {
                ranged_guarders.push(creep);
            }
        }
        return ranged_guarders;
    },

    /* initialize a new ranged guarding creep */
    spawn_ranged_guarder: function(spawn) {
        return spawn.createCreep([
            Game.TOUGH,
            Game.TOUGH,
            Game.TOUGH,
            Game.RANGED_ATTACK,
            Game.MOVE
        ], undefined, {job: 'ranged_guarding'});
    }

}
