# Setup

## Initial Setup

NodeJS 16.9.1 is the version used for development. It is recommended to use this version.

1. Have an instance of `postgresql` running with a database. The default db name is `redm` in `.env.example`.
2. Copy `.env.example` to `.env` and make any necessary changes
3. Copy `key.pem.example` to `key.pem` and `cert.pem.example` to `cert.pem`. Replace with your own SSL key/cert - CFX/NUI doesn't support self-signed
4. Run `yarn` in root of the repo.
5. Run `yarn` in the `resources/[system]/sessionmanager-rdr3` folder
6. Run `yarn migrate` to update the database with any migrations
7. Run `yarn prisma generate` to generate the prisma artifacts if needed
8. Copy `local.cfg.example` to `local.cfg` and add your `sv_licenseKey` and `steam_webApiKey`
9. Run `yarn download-server` to download the server artifact specified in the `package.json`
