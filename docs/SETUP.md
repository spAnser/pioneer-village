# Setup

## Initial Setup

1. Have an instance of `postgresql` running with a usable. The default db name is `redm` in `.env.example`.
2. Copy `.env.example` to `.env` and make any necessary changes
3. Run yarn in root of the repo.
4. Run `yarn migrate` to update the database with any migrations
5. Copy `local.cfg.example` to `local.cfg` and add your `sv_licenseKey` and `steam_webApiKey`
6. Run `yarn download-server` to download the server artifact specified in the `package.json`
