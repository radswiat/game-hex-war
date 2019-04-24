// import { Hex } from 'types'
import {PerspectiveCamera, Raycaster, Object3D, Vector3, Color} from 'three'
import hexShape from './shapes/hexShape'
import Hex from './Hex'
import HexOverlay from './HexOverlay'

import randomInt from 'utils/randomInt'
import GameScene from 'engine/scene'
import config from "config";

const map = require('config/map.json')

export default class HexGrid {

  private readonly scene: GameScene
  private readonly raycaster: Raycaster
  public cells: Hex[] = []
  public cellsGroup: Object3D = null

  public constructor(scene: GameScene) {
    this.scene = scene
    this.generateGrid()
    this.renderGrid()
    this.test()
  }

  private generateGrid(): void {
    const shape = hexShape.get()
    let limit = 10
    Object.keys(map).forEach((point, idx): void => {
      // if (!limit) return
      // limit--
      const points = point.split(':')
      const x = Number(points[0]) - 45
      const y = Number(points[1]) - 75
      const modKey = ( Object.keys(map).length - idx )
      const mod = modKey / randomInt(4, 14) / 50 * modKey / 120
      this.cells.push(new Hex(x, y, -Number(x)-Number(y), randomInt(1 + mod, 8 + mod), shape ))
    })
  }

  private renderGrid(): void {
    this.cellsGroup = new Object3D()
    this.cells.forEach((cell) => {
      const renderedCell = cell.render()
      this.cellsGroup.add(renderedCell)
      this.scene.add(this.cellsGroup)
    })
  }

  _cubeRound(h) {
    var rx = Math.round(h.q);
    var ry = Math.round(h.r);
    var rz = Math.round(h.s);

    var xDiff = Math.abs(rx - h.q);
    var yDiff = Math.abs(ry - h.r);
    var zDiff = Math.abs(rz - h.s);

    if (xDiff > yDiff && xDiff > zDiff) {
      rx = -ry-rz;
    }
    else if (yDiff > zDiff) {
      ry = -rx-rz;
    }
    else {
      rz = -rx-ry;
    }

    return { x: rx, y: ry, z: rz }
  }

  pixelToCell(pos) {
    const cellSize = 50
    const q = pos.x * ((2 / 3) / cellSize)
    const r = ((-pos.x / 3) + (Math.sqrt(3)/3) * pos.z) / cellSize
    return this._cubeRound({
      q, r, s: -q-r,
    });
  }

  private createOverlay({ x, y, z, h, shape }) {
    const overlay = new HexOverlay(x, y, -Number(x)-Number(y), h + 1, shape )
    this.scene.add(overlay.render())
  }

  private test() {
    this.raycaster = new Raycaster()
    document.addEventListener('mousemove', (e: MouseEvent) => {
      const mousePosition = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      }

      console.log(`${mousePosition.x}:${mousePosition.y}`)

      this.raycaster.setFromCamera(mousePosition, this.scene.camera)
      const intersects = this.raycaster.intersectObject(this.cellsGroup, true)
      console.log(intersects)
      if (intersects.length) {
        const foundCell = this.pixelToCell(intersects[0].point)
        console.warn(foundCell)
        this.cells.forEach((cell) => {
          if (cell.x === foundCell.x && cell.y === foundCell.y && foundCell.z === cell.z) {
            console.log(cell)
            this.createOverlay(cell)
            // cell.color = '#b25d27'
            // cell.mesh.material.emissive.setHex(new Color('#601312').getHex())
            // cell.material.emissive.setHex(new Color('#5a7a89').getHex())
          }
        })
      }
    });
  }
}
