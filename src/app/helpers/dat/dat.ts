import * as dat from 'dat.gui'

export default new class Dat {

  folders = {}

  constructor() {
    this.gui = new dat.GUI()
    // folder.add( parameters, 'azimuth', 0, 1, 0.0001 ).onChange( updateSun );
    // var folder = this.gui.addFolder( 'Sky' );
    // folder.add( { inclination: 1 }, 'inclination', 0, 0.5, 0.0001 ).onChange( () => {} );
    // folder.open()

    // folder.open();
  }

  ensureFolder(folder) {
    if (typeof this.folders[folder] === 'undefined') {
      this.folders[folder] = this.gui.addFolder( folder )
      this.folders[folder].open()
    }
  }

  add(folder, label, { data, opts }, cb ) {
    this.ensureFolder(folder)
    this.folders[folder].add( data, label, ...opts ).onChange( cb );
  }

  addColor(folder, label, { data, opts }, cb) {
    this.ensureFolder(folder)
    this.folders[folder].addColor( data, label, ...opts ).onChange( cb );
  }
}
