# Setup

## Initial Setup

NodeJS 16.13.2 is the version used for development. It is recommended to use this version. CFX Still uses a custom version of 16.9.1 but prisma v5 requires 16.13.x at the least. There shouldn't be any real conflicts for the CFX stuff.

1. Have an instance of `postgresql` running with a database. The default db name is `redm` in `.env.example`.
2. Copy `.env.example` to `.env` and make any necessary changes
3. Run `yarn` in root of the repo.
4. Run `yarn` in the `resources/[system]/sessionmanager-rdr3` folder
5. Run `yarn migrate` to update the database with any migrations
6. Run `yarn prisma generate` to generate the prisma artifacts if needed
7. Copy `local.cfg.example` to `local.cfg` and add your `sv_licenseKey` and `steam_webApiKey`
8. Run `yarn download-server` to download the server artifact specified in the `package.json`
