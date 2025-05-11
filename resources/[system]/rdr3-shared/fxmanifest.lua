fx_version 'cerulean'
games { 'rdr3' }
rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'

lua54 'yes'

files {
    'resources/*.json',
    'components/*.json',
    'components-ui/*.json',
}

client_script {
  'client/IPL.lua',
  'client/stuck_wagons.lua',
  --'client/rdr3_universal.js',
  'client/rdr3_natives.js',
  --'client/log-component-names.js',
}
