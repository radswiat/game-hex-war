import { Math, Object3D, SpotLight, SpotLightHelper, Light, Color } from 'three'

import GameScene from 'engine/scene'

import dat from 'helpers/dat/dat'

export default class SunSpotlight {

  private readonly gameScene: GameScene
  private readonly spotlight: SpotLight
  private readonly spotlightHelper: SpotLightHelper
  private readonly spotlightTarget: Object3D

  public constructor(scene: GameScene) {
    this.gameScene = scene
    // create target
    this.spotlightTarget = this.createLightTarget()
    // create spotlight
    this.spotlight = this.createLight(this.spotlightTarget)
    // create light helper
    this.spotlightHelper = this.createLightHelper(this.spotlight)
    // attach to scene
    this.gameScene.add(this.spotlightHelper)
    this.gameScene.add(this.spotlight)
    this.gameScene.add(this.spotlightTarget)

    // listen for key wheel events to move the light
    this.gameScene.onKey('wheel', (e: WheelEvent) => {
      this.spotlightTarget.position.x -= e.deltaX * 2 * -1
      this.spotlightTarget.position.z -= e.deltaY * 2 * -1
      this.spotlightHelper.update()
    })
    this.datControls()
  }

  public getSpotlight(): Light{
    return this.spotlight
  }

  private createLightTarget() {
    return new Object3D()
  }

  private createLight(lightTarget: Object3D) {
    const spotlight = new SpotLight(0x464646)
    spotlight.position.set(100, 7764, 100)
    spotlight.penumbra = 0.529
    spotlight.angle = Math.degToRad(16)
    spotlight.intensity = 11.5
    spotlight.decay = 1
    spotlight.distance = 15354
    spotlight.castShadow = true
    spotlight.shadow.mapSize.width = 1254
    spotlight.shadow.mapSize.height = 1254
    spotlight.shadow.camera.near = 1
    spotlight.shadow.camera.far = 2000
    spotlight.target = lightTarget
    return spotlight
  }

  private createLightHelper(light: Light) {
    return new SpotLightHelper(light)
  }

  private datControls(): void {
    let key = ''
    console.warn(this.spotlight.position.x)
    dat.addColor('SpotLight', 'color', {
      data: { color: this.spotlight.color.getHex() },
      opts: [0, 1, 0.0001]
    },
    (val: number): void => {
      this.spotlight.color = new Color(val)
    })

    const list = ['x', 'y', 'z']
    list.forEach((key) => {
      dat.add('SpotLight', key, {
        // @ts-ignore
        data: { [key]: this.spotlight.position[key] },
        opts: [0, 10000, 0.0001]
      },
      (val: number): void => {
        // @ts-ignore
        this.spotlight.position[key] = val
      })
    })

    key = 'distance'
    dat.add('SpotLight', key, {
      // @ts-ignore
      data: { [key]: this.spotlight[key] },
      opts: [0, 30000, 0.0001]
    },
    (val: number): void => {
      // @ts-ignore
      this.spotlight[key] = val
    })

    key = 'decay'
    dat.add('SpotLight', key, {
      // @ts-ignore
      data: { [key]: this.spotlight[key] },
      opts: [0, 20, 0.0001]
    },
    (val: number): void => {
      // @ts-ignore
      this.spotlight[key] = val
    })
  }
}
