const fs = require('fs');
const path = require('path');
const udp = require('dgram');

const findResourceName = (filePath) => {
  const dirName = path.dirname(filePath);
  if (fs.existsSync(path.resolve(dirName, 'fxmanifest.lua'))) {
    return path.basename(dirName);
  } else if (filePath === '.') {
    return null;
  }
  return findResourceName(dirName);
};

class HotReloadPlugin {
  constructor(address = '127.0.0.1', port = 30110, password = 'qwerty') {
    this.chunkVersions = {};
    this.ensureQueue = [];
    this.running = false;
    this.address = address;
    this.port = port;
    this.password = password;
  }
  async processEnsureQueue() {
    if (this.running || this.ensureQueue.length === 0) {
      return;
    }
    this.running = true;
    const resource = this.ensureQueue.shift();
    await new Promise((res) => setTimeout(res, 500));
    // const command = `ensure ${resource}`;
    const command = `restart ${resource}`; // Using restart only restarts running resources
    let socketClosed = false;
    const connection = udp.createSocket('udp4');
    connection.unref();
    connection.on('close', () => {
      socketClosed = true;
    });
    connection.on('error', function (err) {
      connection.close();
    });
    const buffer = Buffer.alloc(11 + this.password.length + command.length);
    buffer.writeUInt32LE(0xffffffff, 0);
    buffer.write('rcon ', 4);
    buffer.write(this.password, 9, this.password.length);
    buffer.write(' ', 9 + this.password.length, 1);
    buffer.write(command, 10 + this.password.length, command.length);
    buffer.write('\n', 10 + this.password.length + command.length, 1);
    connection.send(buffer, 0, buffer.length, this.port, this.address, () => {
      connection.close();
      this.running = false;
      this.processEnsureQueue();
    });
    setTimeout(() => {
      if (!socketClosed) {
        connection.close();
        // connection = null;
      }
    }, 1e3);
  }
  apply(compiler) {
    compiler.hooks.done.tapAsync('HotReloadPlugin', (compilation, callback) => {
      const outputPath = compilation.compilation.outputOptions.path;
      const resources = Array.from(compilation.compilation.chunks).reduce((acc, chunk) => {
        const oldVersion = this.chunkVersions[chunk.name];
        this.chunkVersions[chunk.name] = chunk.hash;
        if (oldVersion && chunk.hash !== oldVersion) {
          chunk.files.forEach((file) => {
            const resource = findResourceName(path.resolve(outputPath, file));
            acc.add(resource);
          });
        }
        return acc;
      }, new Set());
      resources.forEach((resource) => {
        if (!this.ensureQueue.includes(resource)) {
          this.ensureQueue.push(resource);
        }
        this.processEnsureQueue();
      });
      callback();
    });
  }
}

module.exports = HotReloadPlugin;
