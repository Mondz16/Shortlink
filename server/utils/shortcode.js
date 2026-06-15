// Pre-shuffled alphabet — position-to-symbol mapping is non-sequential
const ALPHABET = "kR3mX9fZqA5vJwY2nHpLs7CtGbD8eN4iUoE6TxBjVMK0PuQhWgSryIOlFcadz1";

// Knuth's multiplicative hash constant — coprime to 2^32, so the mapping is bijective
const PRIME = 2654435761n;
const MASK  = 0xFFFFFFFFn;
// XOR salt shifts all outputs away from the raw hash values
const SALT  = 0xA3B1C4D5n;

export default function toBase64(num) {
  let n = ((BigInt(num) * PRIME) ^ SALT) & MASK;
  if (n === 0n) n = 1n;
  let code = "";
  while (n > 0n) {
    code = ALPHABET[Number(n % 62n)] + code;
    n = n / 62n;
  }
  return code;
}