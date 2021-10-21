/* guarding functionality */

module.exports = {

    /* guarding creep */
    guarder: function(creep) {
        // riceball overrides all
        var riceball = Game.flags.RiceBall;
        if (riceball) {
            creep.moveTo(riceball);
            var closest_enemy = creep.pos.findNearest(Game.HOSTILE_CREEPS);
            if (closest_enemy) {
                creep.attack(closest_enemy);
            }
        } else {
            // if there is no riceball, go to and attack an enemy, or rally
            var closest_enemy = creep.pos.findNearest(Game.HOSTILE_CREEPS);
            if (closest_enemy) {
                creep.moveTo(closest_enemy);
                creep.attack(closest_enemy);
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

    /* list of guarding creeps */
    get_guarders: function() {
        var guarders = [];
        for (var i in Game.creeps) {
            var creep = Game.creeps[i];
            if (creep.memory.job == 'guarding') {
                guarders.push(creep);
            }
        }
        return guarders;
    },

    /* initialize a new guarding creep */
    spawn_guarder: function(spawn) {
        return spawn.createCreep([
            Game.TOUGH,
            Game.TOUGH,
            Game.TOUGH,
            Game.ATTACK,
            Game.MOVE
        ], undefined, {job: 'guarding'});
    }

}
