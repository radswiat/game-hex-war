import './app/lib/polyfills/objloader'

import Scene from 'engine/scene'
import HexGrid from 'components/HexGrid'
import SunSpotlight from 'components/lights/SunSpotlight'
import EnvLights from 'components/lights/EnvLights'
import OceanWater from 'components/oceanWater'
import Pawn from 'objects/Pawn'

export default new class App {

  protected readonly scene: Scene

  public constructor() {
    this.scene = new Scene()
    new HexGrid(this.scene)
    this.init()
  }

  private async init(): Promise<void> {
    new SunSpotlight(this.scene)
    // new EnvLights(this.scene)
    new OceanWater(this.scene)
    const p = new Pawn()
    this.scene.add(await p.create())
  }
}
