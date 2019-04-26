import {PlaneGeometry, MeshBasicMaterial, DoubleSide, Mesh, TextureLoader, RepeatWrapping} from 'three'

export default class TeamEmblems {

  constructor(scene) {
    this.gameScene = scene

    const loader = new TextureLoader()
    const texture = loader.load("lib/assets/kraken.png")
    // texture.wrapS = RepeatWrapping
    // texture.wrapT = RepeatWrapping
    // texture.repeat.set(0.008, 0.008)

    var geometry = new PlaneGeometry( 500, 500, 32 );
    var material = new MeshBasicMaterial( {color: 0xffff00, side: DoubleSide, map: texture, transparent: true, opacity: 0.25 } );
    var plane = new Mesh( geometry, material );
    plane.position.set(0, 15, 0)

    plane.rotation.x -= Math.PI / 2
    this.gameScene.add( plane );
  }

}
