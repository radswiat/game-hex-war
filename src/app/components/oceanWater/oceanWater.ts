import * as THREE from 'three'
import {
  Light,
  DirectionalLight,
  PlaneBufferGeometry,
  CubeCamera,
  TextureLoader,
  LinearMipMapLinearFilter,
  RepeatWrapping,
  Mesh
} from 'three'

import './objects/ocean'
import './objects/sky'

import dat from 'helpers/dat/dat'

import GameScene from 'engine/scene'

export default class OceanWater {

  private readonly scene: GameScene
  private readonly light: Light
  private readonly water: Mesh
  private readonly cubeCamera: CubeCamera
  private readonly sky: Mesh

  private static opts = {
    inclination: 0.2938,
    azimuth: 0.1825,
    distance: 1
  }

  public constructor(scene: GameScene) {
    this.scene = scene

    // create ocean and sky light
    this.light = this.createLight()

    // create ocean water
    this.water = this.createWater(this.light)

    // create cube camera ( reflection camera )
    this.cubeCamera = this.createReflectionCamera()

    // create sky
    this.sky = this.createSky()

    // add to scene
    this.scene.add(this.light)
    this.scene.add(this.water)

    this.update()
    this.datControls()
  }

  private createLight(): Light {
    return new DirectionalLight( 0xffffff, 0.0 )
  }

  private createWater(light: Light): Mesh {
    const waterGeometry = new PlaneBufferGeometry( 20000, 20000 )
    // @ts-ignore
    const water = new THREE.Water(
      waterGeometry,
      {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new TextureLoader().load( 'lib/assets/waternormals.jpg', ( texture: any ): void => {
          texture.wrapS = texture.wrapT = RepeatWrapping
        }),
        alpha: 1.0,
        sunDirection: light.position.clone().normalize(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 3.7,
      }
    )
    water.rotation.x = - Math.PI / 2
    return water
  }

  private createReflectionCamera(): CubeCamera {
    const cubeCamera = new CubeCamera( 0.1, 1, 512 )
    cubeCamera.renderTarget.texture.generateMipmaps = true
    cubeCamera.renderTarget.texture.minFilter = LinearMipMapLinearFilter
    // @ts-ignore
    this.scene.scene.background = cubeCamera.renderTarget
    return cubeCamera
  }

  private createSky(): Mesh {
    // @ts-ignore
    return new THREE.Sky()
  }

  private update(): void {
    this.scene.onRender((): void => {
      const theta = Math.PI * ( OceanWater.opts.inclination - 0.5 )
      const phi = 2 * Math.PI * ( OceanWater.opts.azimuth - 0.5 )
      this.light.position.x = OceanWater.opts.distance * Math.cos( phi )
      this.light.position.y = OceanWater.opts.distance * Math.sin( phi ) * Math.sin( theta )
      this.light.position.z = OceanWater.opts.distance * Math.sin( phi ) * Math.cos( theta )
      // @ts-ignore
      this.sky.material.uniforms[ 'sunPosition' ].value = this.light.position.copy( this.light.position )
      // @ts-ignore
      this.water.material.uniforms[ 'sunDirection' ].value.copy( this.light.position ).normalize()
      // @ts-ignore
      this.water.material.uniforms[ 'time' ].value += 1.0 / 60.0
      // @ts-ignore
      this.cubeCamera.update( this.scene.renderer, this.sky )
    })
  }

  private datControls(): void {
    dat.add('Water', 'inclination', {
      data: { inclination: OceanWater.opts.inclination },
      opts: [0, 0.5, 0.0001]
    },
    (val: number): void => {
      OceanWater.opts.inclination = val
    })
    dat.add('Water', 'azimuth', {
      data: { azimuth: OceanWater.opts.azimuth },
      opts: [0, 1, 0.0001]
    },
    (val: number): void => {
      OceanWater.opts.inclination = val
    })
  }
}
