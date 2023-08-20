const fs = require('fs');
const { loadImage, createCanvas } = require('canvas');

const files = fs.readdirSync('./palettes');

(async () => {
  for (const file of files) {
    if (!file.endsWith('.png') || file.includes('thumbs')) continue;
    const filename = file.split('.').shift();

    const image = await loadImage(`./palettes/${file}`);
    processPalette(image);

    function processPalette(image) {
      const canvas = createCanvas(image.width, image.height);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0);

      const thumnailsCanvas = createCanvas(image.width, image.height);
      const thumbnailsCtx = thumnailsCanvas.getContext('2d');

      let xOffset = 0;
      let yOffset = 0;
      for (let n = 0; n < image.height; n++) {
        for (let i = 0; i < image.width; i += 8) {
          yOffset = Math.floor(n / 8) * 8 + i / 8;
          xOffset = (n % 8) * 8;

          const pixelData = ctx.getImageData(i, n, 8, 1);
          thumbnailsCtx.putImageData(pixelData, xOffset, yOffset);
        }
      }
      const buffer = thumnailsCanvas.toBuffer('image/png');
      fs.writeFileSync(`./palettes/${filename}_thumbs.png`, buffer);
    }
  }
})();
