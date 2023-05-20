import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
const scryptAsync = promisify(scrypt);
export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${hash.toString('hex')}.${salt}`;
  }
  static async compare(hashedPassword: string, password: string) {
    const [passwordHash, salt] = hashedPassword.split('.');
    const hash = (await scryptAsync(password, salt, 64)) as Buffer;
    return passwordHash == hash.toString('hex');
  }
}
