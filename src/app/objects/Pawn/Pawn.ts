import {Color, Material, Math, Mesh, MeshPhongMaterial, OBJLoader2} from "three";

export default class PawnObject {

  private static textureName: string = '12937_Wooden_Chess_Pawn_Side_B_V2_L3'

  private readonly loader = new OBJLoader2()

  public constructor() {

  }

  public create() {
    return new Promise((resolve) => {
      this.loader.loadMtl(`lib/assets/pawn2/${PawnObject.textureName}.mtl`, null, (materials: Material) => {
        this.loader.setMaterials(materials)
        this.loader.load(
          'lib/assets/pawn2/12937_Wooden_Chess_Pawn_Side_B_V2_L3.obj',
          (event: any): void => {
            this.root = event.detail.loaderRootNode;
            this.root.scale.set(10, 10, 10)
            this.root.position.x = -5
            this.root.position.y = 0
            this.root.position.z = 21
            this.root.rotation.x = Math.degToRad(-90)

            this.root.traverse(function (child) {
              if (child instanceof Mesh) {
                child.material = new MeshPhongMaterial({
                  color:     new Color('#141515'),
                  // specular:  0x050505,
                  shininess: 10,
                  // map:       texture,
                  // side:      THREE.DoubleSide
                });
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
