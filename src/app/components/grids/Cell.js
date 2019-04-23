export default class Cell {
  constructor(q, r, s, h) {
    this.q = q || 0; // x grid coordinate (using different letters so that it won't be confused with pixel/world coordinates)
    this.r = r || 0; // y grid coordinate
    this.s = s || 0; // z grid coordinate
    this.h = h || 1; // 3D height of the cell, used by visual representation and pathfinder, cannot be less than 1
    this.tile = null; // optional link to the visual representation's class instance
    this.userData = {}; // populate with any extra data needed in your game
    this.walkable = true; // if true, pathfinder will use as a through node
    // rest of these are used by the pathfinder and overwritten at runtime, so don't touch
    this._calcCost = 0;
    this._priority = 0;
    this._visited = false;
    this._parent = null;
  }
}
