const packageJson = require('../package.json');

const os = require('os');

const { spawn } = require('child_process');
const _7z = require('7zip')['7z'];

const isWindows = os.platform() === 'win32';

const platformFolder = isWindows ? 'build_server_windows' : 'build_proot_linux';

const url = `https://runtime.fivem.net/artifacts/fivem/${platformFolder}/master/`;
const serverFile = isWindows ? 'server.7z' : 'fx.tar.xz';

const serverVersion = packageJson.data.serverVersion;
// The artifacts listing page was removed, so resolve the build's commit hash from its release tag
const tagUrl = `https://api.github.com/repos/citizenfx/fivem/commits/v1.0.0.${serverVersion}`;

const http = require('https');
const fs = require('fs');

if (fs.existsSync(serverVersion)) {
  console.log(`Server version ${serverVersion} already exists.`);
  process.exit(0);
}

const fail = (...msg) => {
  console.error(...msg);
  process.exitCode = 1;
};

const downloadServer = (artifactPath) => {
  const filename = `server-${serverVersion}.${artifactPath.split('.').pop()}`;
  console.log('Downloading: ', artifactPath);

  http
    .get(`${url}${artifactPath}`, (res) => {
      if (res.statusCode !== 200) {
        res.resume();
        return fail(`Failed to download artifact: HTTP ${res.statusCode}`, `${url}${artifactPath}`);
      }

      const file = fs.createWriteStream(filename);
      res.pipe(file);

      file.on('finish', () => {
        file.close(() => {
          console.log('Artifact Downloaded', fs.statSync(filename).size);
          fs.mkdirSync(serverVersion, { recursive: true });

          console.log('Extracting...');

          let task;

          if (isWindows) {
            task = spawn(_7z, ['x', filename, '-y', `-o${serverVersion}`]);
          } else {
            task = spawn('tar', ['-xf', filename, '-C', serverVersion]);
          }

          task.stdout.on('data', (data) => {
            console.log(data.toString());
          });

          task.stderr.on('data', (data) => {
            console.error(data.toString());
          });

          task.on('exit', (code) => {
            if (code !== 0) {
              return fail(`Extraction failed (exit code ${code}).`);
            }

            console.log('Extraction Complete');
            console.log('Deleting archive...');
            
            fs.unlinkSync(filename);
          });
        });
      });
    })
    .on('error', (err) => fail('Connection error:', err.message));
};

const headers = { 'User-Agent': 'pioneer-village-download', Accept: 'application/vnd.github+json' };

http
  .get(tagUrl, { headers }, (res) => {
    let body = '';
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      body += chunk;
    });

    res.on('end', () => {
      if (res.statusCode !== 200) {
        return fail(
          `Could not find tag v1.0.0.${serverVersion}: HTTP ${res.statusCode}`,
          'Check data.serverVersion in package.json.',
        );
      }

      const { sha } = JSON.parse(body);
      downloadServer(`${serverVersion}-${sha}/${serverFile}`);
    });
  })
  .on('error', (err) => fail('Connection error:', err.message));
