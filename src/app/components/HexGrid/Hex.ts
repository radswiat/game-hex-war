import {Color, ExtrudeGeometry, Mesh, MeshPhongMaterial, Shape, Vector3} from 'three'

import config from 'config'
import randomizeRGB from 'utils/randomizeRGB'

export default class Hex {

  private static readonly scale = 0.965

  private readonly shape: Shape

  public x: number
  public y: number
  public z: number
  public h: number

  color = '#0f170e'

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
      depth: this.h
    })
    const material = new MeshPhongMaterial({
      color: randomizeRGB('30, 39, 30', 13),
      shininess: 15,
      specular: new Color(this.color),
    })
    const extMesh = new Mesh(extGeometry, material)
    extMesh.position.x = pos.x
    extMesh.position.y = pos.y
    extMesh.position.z = pos.z
    extMesh.rotation.x = Math.PI / 2
    extMesh.scale.set(Hex.scale, Hex.scale, 1)
    extMesh.name = 'hex'
    // setTimeout(() => {
    //   material.emissive.setHex(new Color('#5a7a89').getHex())
    // }, 100)
    this.mesh = extMesh
  }

  public render(): Mesh {
    return this.mesh
  }
}
