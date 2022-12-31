games {'gta5', 'rdr3'}

fx_version 'bodacious'

rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'

description 'Define zones of different shapes and test whether a point is inside or outside of the zone'
version '2.5.0'

client_scripts {
  'client.lua',
  'BoxZone.lua',
  'EntityZone.lua',
  'CircleZone.lua',
  'ComboZone.lua',
  'creation/*.lua'
}

server_scripts {
  'creation_sv.lua',
  'server.lua'
}
