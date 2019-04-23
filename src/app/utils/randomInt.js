export default function randomInt(min, max) {
  if (arguments.length === 1) {
    return (Math.random() * min) - (min * 0.5) | 0;
  }
  return (Math.random() * (max - min + 1) + min) | 0;
}
