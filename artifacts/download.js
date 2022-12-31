const packageJson = require('../package.json');

const os = require('os');

const { spawn } = require('child_process');
const _7z = require('7zip')['7z'];

const isWindows = os.platform() === 'win32';

const platformFolder = isWindows ? 'build_server_windows' : 'build_proot_linux';

const url = `https://runtime.fivem.net/artifacts/fivem/${platformFolder}/master/`;

const serverVersion = packageJson.data.serverVersion;
const downloadRE = new RegExp(`${serverVersion}-[a-f0-9]+/(?:server|fx)\\.[a-z0-9.]+`, 'gim');

const http = require('https');
const fs = require('fs');

const activeDownloads = new Set();

const Delay = (ms) => new Promise((res) => setTimeout(res, Math.max(1, ms)));

if (fs.existsSync(serverVersion)) {
  console.log(`Server version ${serverVersion} already exists.`);
  process.exit(0);
}

const downloadServer = async (serverFile) => {
  const filename = `server-${serverVersion}.${serverFile.split('.').pop()}`;

  if (activeDownloads.has(filename)) {
    return;
  }
  activeDownloads.add(filename);
  console.log('Downloading: ', serverFile);

  http.get(`${url}${serverFile}`, (res) => {
    let body = Buffer.alloc(0);
    res.on('data', (chunk) => {
      body = Buffer.concat([body, chunk]);
    });

    res.on('end', async () => {
      console.log('Artifact Downloaded', body.length);
      fs.writeFileSync(filename, body);

      fs.mkdirSync(serverVersion);

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

      task.on('exit', async () => {
        console.log('Extraction Complete');
        console.log('Deleting zip...');
        fs.unlinkSync(filename);
      });
    });
  });
};

http.get(url, (res) => {
  let body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });

  res.on('end', () => {
    const matches = body.match(downloadRE);
    for (const match of matches) {
      downloadServer(match);
    }
  });
});
