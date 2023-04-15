var jwt = require('jsonwebtoken');

export const verifyJwt = <T,>(value: string): T | null => {
    try {
        const payload: T = jwt.verify(value, process.env.JWT_TOKEN);
        return payload;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export const signJwt = <T extends object>(value: T) => {
    return jwt.sign(value, process.env.JWT_TOKEN);
}