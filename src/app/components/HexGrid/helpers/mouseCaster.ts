import { Raycaster } from 'three'
import { Coordinates2D } from "types"

import GameScene from "engine/scene"

export default class MouseCaster {

  private readonly gameScene: GameScene
  private readonly raycaster: Raycaster
  private mousePosition: Coordinates2D
  private onMouseMoveCb: Function[] = []
  private onMouseClickCb: Function[] = []

  private static mouseEventToCoordinates2d(e: MouseEvent): Coordinates2D {
    return {
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    }
  }

  public constructor(scene: GameScene) {
    this.gameScene = scene
    this.raycaster = new Raycaster()
    document.addEventListener('mousemove', (e: MouseEvent) => {
      this.mousePosition = MouseCaster.mouseEventToCoordinates2d(e)
      this.onMouseMoveCb.forEach((fn: Function) => fn(this.mousePosition))
    })
    document.addEventListener('click', (e: MouseEvent) => {
      this.mousePosition = MouseCaster.mouseEventToCoordinates2d(e)
      this.onMouseClickCb.forEach((fn: Function) => fn(this.mousePosition))
    })
  }

  public onMouseMove(fn: Function) {
    this.onMouseMoveCb.push(fn)
  }

  public onMouseClick(fn: Function) {
    this.onMouseClickCb.push(fn)
  }

}


