const crypto = require('crypto');

export const generateRandomIntId = (): number => {
  return crypto.randomBytes(4).readUInt32BE(0);
};
