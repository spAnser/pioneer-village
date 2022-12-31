fx_version 'cerulean'
games { 'rdr3' }
rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'
version '1.0.0'

-- const strings = LoadResourceFile('research', 'files/strings.txt').split('\n');
files {
    'files/*',
}

server_scripts {
  "build/server.js"
}

client_scripts {
  "lua/client.lua",
  "@rdr3-shared/client/rdr3_universal.js",
  "build/client.js"
}
