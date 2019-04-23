// import './playground/index'

import {Vector3, ShapeGeometry, Shape, Geometry, Mesh, MeshPhongMaterial, Color, ExtrudeGeometry, Object3D} from 'three'
import './app/lib/polyfills/objloader'

import shapeHex from 'components/shapes/hex'
import Scene from 'engine/scene'
import randomizeRGB from 'utils/randomizeRGB'
import HexGrid from 'components/grids/HexGrid'
import SunSpotlight from 'components/lights/SunSpotlight'
import EnvLights from 'components/lights/EnvLights'
import OceanWater from 'components/oceanWater'

import Pawn from 'objects/Pawn'

import config from 'config'

// OBJLoader(THREE)

export default new class App {

  constructor() {
    this.grid = new HexGrid()
    this.scene = new Scene()
    this.init()
  }

  async init() {
    const sunSpotlight = new SunSpotlight(this.scene)
    new EnvLights(this.scene)
    new OceanWater(this.scene, sunSpotlight.getSpotlight())
    this.addPawn()
    this.render()
  }

  async addPawn() {
    const p = new Pawn()
    this.scene.add(await p.create())
  }

  // init() {
  //   // create base shape used for building geometry
  //   const vertices = [];
  //   let i = 0
  //   // create the skeleton of the hex
  //   for (i = 0; i < 6; i++) {
  //     vertices.push(this._createVertex(50, i));
  //   }
  //   // copy the verts into a shape for the geometry to use
  //   const shape = new Shape();
  //   shape.moveTo(vertices[0].x, vertices[0].y);
  //   for (i = 1; i < 6; i++) {
  //     shape.lineTo(vertices[i].x, vertices[i].y);
  //   }
  //   shape.lineTo(vertices[0].x, vertices[0].y);
  //   shape.autoClose = true;
  //
  //   this.cellShapeGeo = new ShapeGeometry(shape);
  // }

  render() {
    const { geometry, shape } = shapeHex.create()
    this._vec3 = new Vector3()

    this.grid.cells.forEach(({x, y, z, h}) => {
      this.renderGridHex(shape, x, y, z, h)
    })
  }

  // grid cell (Hex in cube coordinate space) to position in pixels/world
  cellToPixel(cell) {
    this._vec3.x = cell.x * config.cellWidth * 0.75;
    this._vec3.y = cell.h;
    this._vec3.z = -((cell.z - cell.y) * config.cellLength * 0.5);
    return this._vec3;
  }

  renderGridHex(shape, x, y, z, h) {
    const pos = this.cellToPixel({ x, y, z, h })
    const extGeometry = new ExtrudeGeometry(shape, {
      bevelEnabled: true,
      bevelSegments: 1,
      steps: 1,
      bevelSize: 1.8,
      bevelThickness: 1.8,
      depth: h
    })
    const material = new MeshPhongMaterial({
      color: randomizeRGB('30, 39, 30', 13),
      // specular: 0x050505,
      shininess: 800,
    });
    const extMesh = new Mesh(extGeometry, material);
    extMesh.position.x = pos.x;
    extMesh.position.y = pos.y;
    extMesh.position.z = pos.z;
    extMesh.rotation.x = 90 * 0.0174532925
    const scale = 0.965
    extMesh.scale.set(scale, scale, 1);
    // extMesh.rotateOnAxis(this._vec3,  Math.PI/2);
    this.scene.scene.add(extMesh)
  }
}
