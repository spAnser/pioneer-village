fx_version 'adamant'
games { 'rdr3' }
rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'

lua54 'yes'

dependencies {
  'zones'
}

ui_page 'public/ui.html'

files {
    'public/**/*.*',
}

shared_script './**/sh_*.lua'
client_script {
    'hashes/hash_*',
    './**/cl_*.lua'
}
server_script './**/sv_*.lua'
