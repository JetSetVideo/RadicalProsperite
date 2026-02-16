import { scryptSync, randomBytes, timingSafeEqual } from 'crypto'

const SALT_LENGTH = 32
const KEY_LENGTH = 64
const SCRYPT_PARAMS = { N: 16384, r: 8, p: 1 }

export const hashPassword = (password: string): string => {
  const salt = randomBytes(SALT_LENGTH).toString('hex')
  const hash = scryptSync(password, salt, KEY_LENGTH, SCRYPT_PARAMS).toString('hex')
  return `${salt}:${hash}`
}

export const verifyPassword = (password: string, storedHash: string): boolean => {
  const [salt, hash] = storedHash.split(':')
  if (!salt || !hash) return false

  const derivedKey = scryptSync(password, salt, KEY_LENGTH, SCRYPT_PARAMS)
  const storedKey = Buffer.from(hash, 'hex')

  if (derivedKey.length !== storedKey.length) return false
  return timingSafeEqual(derivedKey, storedKey)
}
