import {Color, Material, Math, Mesh, MeshPhongMaterial, Object3D, OBJLoader2} from "three";

export default class PawnObject {

  private static textureName: string = '12937_Wooden_Chess_Pawn_Side_B_V2_L3'

  private readonly loader = new OBJLoader2()

  public constructor() {

  }

  public create(): Promise<Object3D> {
    return new Promise((resolve): void => {
      this.loader.loadMtl(`lib/assets/pawn2/${PawnObject.textureName}.mtl`, null, (materials: Material) => {
        this.loader.setMaterials(materials)
        this.loader.load(
          'lib/assets/pawn2/12937_Wooden_Chess_Pawn_Side_B_V2_L3.obj',
          (event: any): void => {
            this.root = event.detail.loaderRootNode;
            this.root.scale.set(7, 7, 7)
            this.root.position.x = -35
            this.root.position.y = 0
            this.root.position.z = 35
            this.root.rotation.x = Math.degToRad(-90)

            this.root.traverse((child) => {
              if (child instanceof Mesh) {
                child.material = new MeshPhongMaterial({
                  color:     new Color('#a31c11'),
                  shininess: 10,
                })
              }
            } );
            // this.root.rotation.z = 20
            resolve(this.root)
          },
          (xhr) => {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
          },
          (error) => {
            console.log( 'An error happened' );
          }
        )
      })
    })
  }
}
