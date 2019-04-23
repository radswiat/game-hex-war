import { Vector3, Shape } from 'three'

import config from 'config'

export default new class HexShape {
  public get(): Shape {
    const vertices = []
    let i = 0
    // create the skeleton of the hex
    for (i = 0; i < 6; i++) {
      vertices.push(this.createVertex(config.cellSize, i))
    }
    // copy the verts into a shape for the geometry to use
    const shape = new Shape()
    shape.moveTo(vertices[0].x, vertices[0].y)
    for (i = 1; i < 6; i++) {
      shape.lineTo(vertices[i].x, vertices[i].y)
    }
    shape.lineTo(vertices[0].x, vertices[0].y)
    shape.autoClose = true

    return shape
  }

  private createVertex(cellSize: number, i: number): Vector3 {
    const angle = (config.TAU / 6) * i
    return new Vector3((cellSize * Math.cos(angle)), (cellSize * Math.sin(angle)), 0)
  }
}
