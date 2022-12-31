fx_version "adamant"
games { "rdr3" }
rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'

--wrapper_require {"prompt"}
--shared_script "@wrapper/wrapper.lua"

client_scripts {
    'hashes/flags.lua',
    'hashes/hash_*',
    'client/functions.lua',
    'client/cl_main.lua',
    'client/cl_stuff.lua',
    'client/cl_main.js',
    'client/wagon_deposit.lua',
}
