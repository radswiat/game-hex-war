import {RepeatWrapping, Texture, TextureLoader} from "three"

export default new class GrassTexture {

  public readonly color: Texture
  public readonly norm: Texture
  public readonly disp: Texture

  public constructor() {
    const loader = new TextureLoader()
    this.color = loader.load("lib/assets/grass/Grass_001_COLOR.jpg")
    this.norm = loader.load("lib/assets/grass/Grass_001_NORM.jpg")
    this.disp = loader.load("lib/assets/grass/Grass_001_DISP.jpg")
    this.color.wrapS = RepeatWrapping
    this.color.wrapT = RepeatWrapping
    this.color.repeat.set(0.008, 0.008)
    this.norm.wrapS = RepeatWrapping
    this.norm.wrapT = RepeatWrapping
    this.norm.repeat.set(0.008, 0.008)
    this.disp.wrapS = RepeatWrapping
    this.disp.wrapT = RepeatWrapping
    this.disp.repeat.set(0.008, 0.008)
  }

  public get() {
    return {
      color: this.color,
      norm: this.norm,
      disp: this.disp,
    }
  }
}
