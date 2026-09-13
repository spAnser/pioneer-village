fx_version 'cerulean'
games { 'rdr3' }
rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'
version '1.0.0'

lua54 'yes'

-- Track geometry is read straight out of the trains resource with
-- LoadResourceFile rather than duplicated here. On the client that native only
-- reads files the OWNING resource lists in its own files{} block, and only
-- while that resource is started -- trains/fxmanifest.lua lists
-- "resources/*.json", so both conditions already hold.
dependencies {
  'trains'
}

client_scripts {
  "@rdr3-shared/client/rdr3_natives.js",
  "build/client.js"
}

files {
  "index.html",
  "build/ui.js",
  "build/ui.css",
}

ui_page "index.html"
