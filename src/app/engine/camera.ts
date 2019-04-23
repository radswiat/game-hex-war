import { PerspectiveCamera, Vector3 } from "three"

import GameScene from './scene'

export default class Camera {

  private readonly scene: GameScene
  private readonly camera: PerspectiveCamera

  public constructor(scene: GameScene) {
    this.scene = scene
    this.camera = this.createCamera()
    this.keyBindings()
  }

  public getCamera(): PerspectiveCamera {
    return this.camera
  }

  private createCamera(): PerspectiveCamera {
    const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 15000)
    camera.position.y = 900
    camera.position.z = 1200
    camera.rotation.x = 1200
    camera.lookAt(new Vector3(0, 0, 0))
    return camera
  }

  private keyBindings(): void {
    this.scene.onKey('wheel.shift', (e: WheelEvent): void => {
      this.camera.rotation.x -= e.deltaX / 100
    })
    this.scene.onKey('wheel.ctrl', (e: WheelEvent): void => {
      this.camera.position.y -= e.deltaX * 2
    })
    this.scene.onKey('wheel', (e: WheelEvent): void => {
      this.camera.position.x -= e.deltaX * 2 * -1
      this.camera.position.z -= e.deltaY * 2 * -1
    })
  }
}
