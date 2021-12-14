var roleTransfer =
{
    run:function(creep)
    {
        if(creep.memory.transfing && creep.store[RESOURCE_ENERGY] == 0)
        {
            creep.say('取出能量，转移')
            creep.memory.transfing = false;
        }
        if(!creep.memory.transfing && creep.store.getFreeCapacity() == 0)
        {
            creep.say('储存至仓库')
            creep.memory.transfing = true;
        }

        if(creep.memory.transfing)
        {
            var storage = creep.pos.findClosestByRange(FIND_STRUCTURES,
                {
                    filter:(structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
            if(creep.transfer(storage,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(storage)
            }
        }
        else
        {
            var container = creep.pos.findClosestByRange(FIND_STRUCTURES,
                {
                    filter:(structure) => {
                       return (structure.structureType == STRUCTURE_CONTAINER)&&
                       structure.store[RESOURCE_ENERGY]  > 0
                    }
                });
            if(creep.withdraw(container,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(container)
            }
        }
    }
}

module.exports = roleTransfer