import randomInt from './randomInt'

export default function randomizeRGB(base, range) {
  var rgb = base.split(',');
  var color = 'rgb(';
  var i, c;
  range = randomInt(range);
  for (i = 0; i < 3; i++) {
    c = parseInt(rgb[i]) + range;
    if (c < 0) c = 0;
    else if (c > 255) c = 255;
    color += c + ',';
  }
  color = color.substring(0, color.length-1);
  color += ')';
  return color;
}
