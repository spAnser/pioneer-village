fx_version 'cerulean'
games { 'rdr3' }
rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'
version '1.0.0'

lua54 'yes'
use_experimental_fxv2_oal 'yes'

client_scripts {
  --"@rdr3-shared/client/rdr3_universal.js",
  "@rdr3-shared/client/rdr3_natives.js",
  "build/client.js"
}
