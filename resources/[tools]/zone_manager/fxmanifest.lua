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

client_script './client/*.lua'
