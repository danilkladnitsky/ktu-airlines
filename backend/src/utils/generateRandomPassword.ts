import bcrypt from "bcrypt";

type Result = {
    hash: string;
    password: string;
    
}
export const generateRandomPassword = async (): Promise<Result> => {
    const password = Math.random().toString(36).slice(-8);
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    return { hash, password };

}