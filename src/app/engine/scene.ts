import { WebGLRenderer, Scene, PerspectiveCamera, Color, PCFSoftShadowMap, Object3D, Fog } from 'three'


import Camera from './camera'

export default class GameScene {

  private readonly renderer: WebGLRenderer
  private readonly scene: Scene
  public readonly camera: PerspectiveCamera

  public constructor() {
    this.renderer = this.createRenderer()
    this.scene = this.createScene()
    this.camera = new Camera(this).getCamera()
    this.handleKeyEvents()
    this.render()
    document.body.appendChild(this.renderer.domElement)
  }

  public add(obj: Object3D): void {
    this.scene.add(obj)
  }

  private createRenderer(): WebGLRenderer {
    const renderer = new WebGLRenderer({ alpha: true, antialias: true })
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = PCFSoftShadowMap
    renderer.setSize(window.innerWidth, window.innerHeight)
    return renderer
  }

  private createScene(): Scene {
    const scene = new Scene()
    scene.fog = new Fog(Number(new Color('#a7ecff')), 2000, 5000)
    return scene
  }

  private handleKeyEvents(): void {
    window.addEventListener('wheel', (e: WheelEvent): void => {
      if (e.shiftKey) {
        if (this.onKeyCallbacks['wheel.shift']) this.onKeyCallbacks['wheel.shift'].forEach((fn: Function) => fn(e))
      } else
      if (e.ctrlKey) {
        if (this.onKeyCallbacks['wheel.ctrl']) this.onKeyCallbacks['wheel.ctrl'].forEach((fn: Function) => fn(e))
      } else {
        if (this.onKeyCallbacks['wheel']) this.onKeyCallbacks['wheel'].forEach((fn: Function) => fn(e))
      }
    })
  }

  private onRenderCallbacks: Function[] = []
  private onKeyCallbacks: {[key: string]: Function[]} = {}

  public onRender(cb: Function): void {
    this.onRenderCallbacks.push(cb)
  }

  public onKey(type: string, cb: Function): void {
    if (typeof this.onKeyCallbacks[type] === 'undefined') this.onKeyCallbacks[type] = []
    this.onKeyCallbacks[type].push(cb)
  }

  private render = (): void => {
    this.onRenderCallbacks.forEach((fn: Function) => { fn() })
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.render)
  }
}
