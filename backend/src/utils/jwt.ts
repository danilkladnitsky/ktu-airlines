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