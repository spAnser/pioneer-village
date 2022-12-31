fx_version "adamant"

rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'

game "rdr3"

lua54 'yes'
use_fxv2_oal 'yes'

client_scripts {
  'client/handler.lua',
  'client/class.lua'
}