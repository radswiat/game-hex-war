// import { Hex } from 'types'
import { Coordinates3D, Coordinates2D } from 'types'
import { Raycaster, Object3D } from 'three'

import config from 'config'
import cubeRound from 'utils/cubeRound'
import randomInt from 'utils/randomInt'
import GameScene from 'engine/scene'

import Hex from './Hex'
import HexOverlay from './HexOverlay'
import hexShape from './shapes/hexShape'
import MouseCaster from './helpers/mouseCaster'

import gameStore from 'stores/gameStore'

const map = require('config/map.json')

export default class HexGrid {

  private readonly gameScene: GameScene
  private readonly raycaster: Raycaster
  private readonly mouseCaster: MouseCaster
  public cells: Hex[] = []
  public cellsGroup: Object3D = null

  /**
   * Convert pixels ( eg mouse coords ) to cell
   * eg 8000:8000 to 12,5,-10
   * @param pos
   */
  private static pixelToCell(pos: Coordinates3D): Coordinates3D {
    const q = pos.x * ((2 / 3) / config.cellSize)
    const r = ((-pos.x / 3) + (Math.sqrt(3)/3) * pos.z) / config.cellSize
    return cubeRound(q, r, -q-r)
  }

  public constructor(scene: GameScene) {
    this.gameScene = scene
    this.generateGrid()
    this.renderGrid()
    this.raycaster = new Raycaster()
    this.mouseCaster = new MouseCaster(this.gameScene)
    this.mouseCaster.onMouseMove(this.handleMouseMove)
    this.mouseCaster.onMouseClick(this.handleMouseClick)
    this.gameScene.onRender(this.update)
  }

  /**
   * Generates hexagonal grid
   */
  private generateGrid(): void {
    const shape = hexShape.get()
    Object.keys(map).forEach((point, idx): void => {
      const points = point.split(':')
      const x = Number(points[0]) - 45
      const y = Number(points[1]) - 75
      const modKey = ( Object.keys(map).length - idx )
      const mod = modKey / randomInt(4, 14) / 50 * modKey / 120
      this.cells.push(new Hex(x, y, -Number(x)-Number(y), randomInt(1 + mod, 8 + mod), shape ))
    })
  }

  /**
   * Renders grid
   */
  private renderGrid(): void {
    this.cellsGroup = new Object3D()
    this.cells.forEach((cell) => {
      const renderedCell = cell.render()
      this.cellsGroup.add(renderedCell)
      this.gameScene.add(this.cellsGroup)
    })
  }

  /**
   * Create a single overlay hex
   * @param x
   * @param y
   * @param z
   * @param h
   * @param shape
   */
  private createOverlay({ x, y, h, shape }: Hex): void {
    const object = this.gameScene.scene.getObjectByName( 'hexOverlay' )
    this.gameScene.scene.remove(object)
    const overlay = new HexOverlay(x, y, -Number(x)-Number(y), h + 1, shape )
    this.gameScene.add(overlay.render())
  }

  private handleMouseMove = (mousePosition: Coordinates2D) => {
    this.raycaster.setFromCamera(mousePosition, this.gameScene.camera)
    const intersects = this.raycaster.intersectObject(this.cellsGroup, true)
    if (intersects.length) {
      const foundCell = HexGrid.pixelToCell(intersects[0].point)
      this.cells.forEach((cell) => {
        if (cell.x === foundCell.x && cell.y === foundCell.y && foundCell.z === cell.z) {
          this.createOverlay(cell)
        }
      })
    }
  }

  private handleMouseClick = (mousePosition: Coordinates2D) => {
    this.raycaster.setFromCamera(mousePosition, this.gameScene.camera)
    const intersects = this.raycaster.intersectObject(this.cellsGroup, true)
    if (intersects.length) {
      const foundCell = HexGrid.pixelToCell(intersects[0].point)
      this.cells.forEach((cell) => {
        if (cell.x === foundCell.x && cell.y === foundCell.y && foundCell.z === cell.z) {
          cell.store = {
            nationId: gameStore.getNationId(),
            nationControlPowers: {},
          }
        }
      })
    }
  }

  private update = () => {
    this.cells.forEach((cell) => cell.update())
  }
}
