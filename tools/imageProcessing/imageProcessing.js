import fs from 'fs'
import path from 'path'
import Jimp from 'jimp'

Jimp.read(path.resolve(process.cwd(), 'tools/imageProcessing/uk.png'), (err, image) => {
  image.resize(80, 80)
  const coords = {}
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
    const { r, g, b } = Jimp.intToRGBA(image.getPixelColor(x, y))
    if ( r && g && b) {
      coords[`${x}:${y}`] = `${r},${g},${b}`
    }

    if (x == image.bitmap.width - 1 && y == image.bitmap.height - 1) {
      fs.writeFileSync(path.resolve(process.cwd(), 'src/app/config/map.json'), JSON.stringify(coords), 'utf8')
      console.log(`world size: ${Object.keys(coords).length}`)
    }
  });
})
