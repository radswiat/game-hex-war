import config from 'config'

import randomInt from 'utils/randomInt'

const map = require('config/map.json')

export default class HexGrid {

  size = config.size
  cellSize = config.cellSize

  cells = []

  constructor() {
    this.generate()
  }

  generate() {

    Object.keys(map).forEach((point) => {
      const points = point.split(':')
      const x = points[0] - 45
      const y = points[1] - 75
      this.cells.push({ x, y, z: -x-y, h: randomInt(1, 8) })
    })

    // let x, y, z, c
    // for (x = -this.size; x < this.size+1; x++) {
    //   for (y = -this.size; y < this.size+1; y++) {
    //     z = -x-y;
    //     if (Math.abs(x) <= this.size && Math.abs(y) <= this.size && Math.abs(z) <= this.size) {
    //       // c = new vg.Cell(x, y, z);
    //       this.cells.push({ x, y, z, h: randomInt(1, 8) })
    //     }
    //   }
    // }
  }
}
