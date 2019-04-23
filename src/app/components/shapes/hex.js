import { Vector3, ShapeGeometry, Shape } from 'three'

import config from 'config'

export default new class Hex {

  create() {
    // create base shape used for building geometry
    const vertices = [];
    let i = 0
    // create the skeleton of the hex
    for (i = 0; i < 6; i++) {
      vertices.push(this._createVertex(config.cellSize, i));
    }
    // copy the verts into a shape for the geometry to use
    const shape = new Shape();
    shape.moveTo(vertices[0].x, vertices[0].y);
    for (i = 1; i < 6; i++) {
      shape.lineTo(vertices[i].x, vertices[i].y);
    }
    shape.lineTo(vertices[0].x, vertices[0].y);
    shape.autoClose = true;

    const geometry = new ShapeGeometry(shape);
    return {
      geometry,
      shape,
    }
  }

  _createVertex(cellSize, i) {
    const angle = (config.TAU / 6) * i;
    return new Vector3((cellSize * Math.cos(angle)), (cellSize * Math.sin(angle)), 0);
  }


}
