function getStateValue(entityId, key)
    if not entityId then
        return nil
    end
    return Entity(entityId).state[key]
end

exports('getStateValue', getStateValue)

function getChildEntity(entityId, name)
  if not entityId then
    return nil
  end
  local childEntityId = getStateValue(entityId, name)
  if childEntityId then
    return childEntityId
  end
  local childNetId = getStateValue(entityId, name .. 'NetId')
  if childNetId then
    childEntityId = NetworkGetEntityFromNetworkId(childNetId)
    Entity(entityId).state.set(name, childEntityId, false)
    return childEntityId
  end
end

exports('getChildEntity', getChildEntity)
