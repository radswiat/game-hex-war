import { ExtrudeGeometry, Mesh, MeshPhongMaterial, Shape, Vector3, Color } from 'three'

import config from 'config'
import randomizeRGB from 'utils/randomizeRGB'

import grassTexture from './textures/grassTexture'

export default class Hex {

  private static readonly scale = 0.965

  private readonly mesh: Mesh
  public readonly shape: Shape

  public x: number
  public y: number
  public z: number
  public h: number
  public store: any

  private static toPixels(hex: Hex): Vector3 {
    const vec3 = new Vector3()
    vec3.x = hex.x * config.cellWidth * 0.75
    vec3.y = hex.h
    vec3.z = -((hex.z - hex.y) * config.cellLength * 0.5)
    return vec3
  }

  public constructor(x: number, y: number, z: number, h: number, shape: Shape) {
    this.x = x
    this.y = y
    this.z = z
    this.h = h
    this.shape = shape

    const pos = Hex.toPixels(this)
    const extGeometry = new ExtrudeGeometry(this.shape, {
      bevelEnabled: true,
      bevelSegments: 1,
      steps: 1,
      bevelSize: 1.8,
      bevelThickness: 1.8,
      depth: this.h,
    })
    const material = new MeshPhongMaterial({
      color: randomizeRGB('200, 200, 200', 33),
      shininess: 15,
      map: grassTexture.get().color,
      displacementMap: grassTexture.get().disp,
    })
    const extMesh = new Mesh(extGeometry, material)
    extMesh.position.x = pos.x
    extMesh.position.y = pos.y
    extMesh.position.z = pos.z
    extMesh.rotation.x = Math.PI / 2
    extMesh.scale.set(Hex.scale, Hex.scale, 1)
    extMesh.name = 'hex'
    this.mesh = extMesh
  }

  public render(): Mesh {
    console.log('render')
    return this.mesh
  }

  public update() {
    if (this.store && this.store.nationId) {
      this.mesh.material.color = new Color('#ff0003')
    }
  }
}
