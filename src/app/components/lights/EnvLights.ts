import { Light, DirectionalLight, HemisphereLight } from 'three'
import GameScene from 'engine/scene'

import dat from 'helpers/dat/dat'

export default class EnvLights {

  private readonly scene: GameScene
  private readonly hemiLight: Light
  private readonly dirLight: Light

  public constructor(scene: GameScene) {
    this.scene = scene
    this.dirLight = this.createDirLight()
    this.hemiLight = this.createHemiLight()
    this.scene.add(this.dirLight)
    this.scene.add(this.hemiLight)
    this.datControls()
  }

  private createDirLight(): Light {
    const dirLight = new DirectionalLight(0xffffff)
    dirLight.position.set(150, 150, 150)
    dirLight.castShadow = true
    dirLight.intensity = 0.95
    return dirLight
  }

  private createHemiLight(): Light {
    const hemiLight = new HemisphereLight( 0x3dff98, 0x6e, 0.66 )
    hemiLight.position.set( 110, 500, 110 )
    return hemiLight
  }

  private datControls(): void {
    dat.add('EnvLights', 'hemiIntensity', {
      data: { hemiIntensity: this.hemiLight.intensity },
      opts: [0, 1, 0.0001]
    },
    (val: number): void => {
      this.hemiLight.intensity = val
    })
    dat.add('EnvLights', 'dirIntensity', {
      data: { dirIntensity: this.dirLight.intensity },
      opts: [0, 1, 0.0001]
    },
    (val: number): void => {
      this.dirLight.intensity = val
    })
  }
}
