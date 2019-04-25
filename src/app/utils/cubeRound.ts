import { Coordinates3D } from 'types'

export default function cubeRound(q: number, r: number, s: number): Coordinates3D {
  let rx = Math.round(q)
  let ry = Math.round(r)
  let rz = Math.round(s)

  const xDiff = Math.abs(rx - q)
  const yDiff = Math.abs(ry - r)
  const zDiff = Math.abs(rz - s)

  if (xDiff > yDiff && xDiff > zDiff) {
    rx = -ry-rz
  }
  else if (yDiff > zDiff) {
    ry = -rx-rz
  }
  else {
    rz = -rx-ry
  }

  return { x: rx, y: ry, z: rz }
}
