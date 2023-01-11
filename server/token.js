
const TOKEN_LENGTH = 32;
const ALPHA_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const ALPHA_LOWER = 'abcdefghijklmnopqrstuvwxyz';
const ALPHA = ALPHA_UPPER + ALPHA_LOWER;
const DIGITS = '0123456789';
const ALPHA_DIGIT = ALPHA + DIGITS;

const generateToken = () => {
  const base = ALPHA_DIGIT.length;
  let key = '';
  for (let i = 0; i < TOKEN_LENGTH; i++) {
    const index = Math.floor(Math.random() * base);
    key += ALPHA_DIGIT[index];
  }
  return key;
};

module.exports = { generateToken };