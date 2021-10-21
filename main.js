/* CONTROL */

var creep_priority_list = [
    'harvest',
    'guard',
    'heal',
    'ranged_guard',
    'build'
];

var creep_limits = {
    'harvest': 0,
    'build': 0,
    'guard': 0,
    'heal': 0,
    'ranged_guard': 0
}

Memory.use_energy_for_building = true;


/* REQUIREMENTS */

var harvest_package = require('harvest_package');
var build_package = require('build_package');
var guard_package = require('guard_package');
var heal_package = require('heal_package');
var ranged_guard_package = require('ranged_guard_package');


/* GLOBALS */

var main_spawn = Game.spawns.MainSpawn;

var harvesters = harvest_package.get_harvesters();
var builders = build_package.get_builders();
var guarders = guard_package.get_guarders();
var healers = heal_package.get_healers();
var ranged_guarders = ranged_guard_package.get_ranged_guarders();
var creep_lists = {
    'harvest': harvesters,
    'build': builders,
    'guard': guarders,
    'heal': healers,
    'ranged_guard': ranged_guarders
}


/* SPAWNING CREEPS */

var spawn_functions = {
    'harvest': function() {return harvest_package.spawn_harvester(main_spawn);},
    'build': function() {return build_package.spawn_builder(main_spawn);},
    'guard': function() {return guard_package.spawn_guarder(main_spawn);},
    'heal': function() {return heal_package.spawn_healer(main_spawn);},
    'ranged_guard': function() {return ranged_guard_package.spawn_ranged_guarder(main_spawn);}
}

for (var creep_type_idx in creep_priority_list) {
    if (!main_spawn.spawning) {
        var creep_type = creep_priority_list[creep_type_idx];
        var num_creeps_of_type = creep_lists[creep_type].length;
        var creep_type_limit = creep_limits[creep_type];
        if (num_creeps_of_type < creep_type_limit) {
            var spawn_res = spawn_functions[creep_type]();
            if (typeof spawn_res == 'string') {
                console.log('There are '+num_creeps_of_type+' '+creep_type+'.');
                console.log('The limit for '+creep_type+' is '+creep_type_limit+'.');
                console.log('Starting spawn of another '+creep_type+'.');
                console.log(spawn_res);
                console.log('---');
                break;
            }
        }
    }
}


/* ASSIGNING TASKS */

for (var i in harvesters) {
    harvest_package.harvester(harvesters[i]);
}
for (var i in builders) {
    build_package.builder(builders[i]);
}
for (var i in guarders) {
    guard_package.guarder(guarders[i]);
}
for (var i in healers) {
    heal_package.healer(healers[i]);
}
for (var i in ranged_guarders) {
    ranged_guard_package.ranged_guarder(ranged_guarders[i]);
}
