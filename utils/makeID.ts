export default function makeID(length: number): string {
  let result = "";
  const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charLength = char.length;

  for (let i = 0; i < length; i++) {
    result += char.charAt(Math.floor(Math.random() * charLength));
  }

  return result;
}
