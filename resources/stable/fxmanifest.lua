fx_version 'cerulean'
games { 'rdr3' }
rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'
version '1.0.0'

lua54 'yes'
node_version '22'

server_scripts {
  "build/server.js"
}

client_scripts {
  "build/client.js"
}
