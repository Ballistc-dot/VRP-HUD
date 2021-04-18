
-- hud top info
Citizen.CreateThread(function()
while true do
  local player = GetPlayerPed(-1)
  local coords = GetEntityCoords(player)
  local streetHash = GetStreetNameAtCoord(coords.x,coords.y,coords.z)
  local street = GetStreetNameFromHashKey(streetHash)
  local hours = GetClockHours()
  local minutes = GetClockMinutes()
  local isInCar = IsPedInAnyVehicle(player)

  
  SendNUIMessage({
    type = 'hud_update_info_top',
    street_name = street,
    hours = hours,
    minutes = minutes,
    isInCar = isInCar
 })
 Citizen.Wait(10)
  end
end)



-- user stats
Citizen.CreateThread(function()
  while true do
    local player = GetPlayerPed(-1)
    
    local health = GetEntityHealth(player) - 100
    local armor = GetPedArmour(player)

    SendNUIMessage({
      type = 'hud_update_info',
      health= health,
      armor = armor
   })
    Citizen.Wait(10)
  end
end)


-- speedometer
Citizen.CreateThread(function()
  while true do
    local player = GetPlayerPed(-1)
    local vehicle = GetVehiclePedIsIn(player,false)
    local speed = GetEntitySpeed(vehicle) * 3.6
    
    SendNUIMessage({
      type = 'hud_update_info_speedometer',
      speed = speed
  })
    Citizen.Wait(10)
  end
end)