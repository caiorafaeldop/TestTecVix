import crypto from "crypto";

const ALGORITHM = "aes-256-cbc";
const SECRET_KEY = process.env.CRYPTO_SECRET || "vituax-test-secret-key-32bytes!";
const IV_LENGTH = 16;

/**
 * Encrypts a string using AES-256-CBC
 * @param text - The plain text to encrypt
 * @returns The encrypted string in format: iv:encryptedData
 */
export function encrypt(text: string): string {
  if (!text) return "";
  
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    ALGORITHM,
    Buffer.from(SECRET_KEY.slice(0, 32)),
    iv
  );
  
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  
  return `${iv.toString("hex")}:${encrypted}`;
}

/**
 * Decrypts an encrypted string
 * @param encryptedText - The encrypted string in format: iv:encryptedData
 * @returns The decrypted plain text
 */
export function decrypt(encryptedText: string): string {
  if (!encryptedText || !encryptedText.includes(":")) return "";
  
  try {
    const [ivHex, encrypted] = encryptedText.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv(
      ALGORITHM,
      Buffer.from(SECRET_KEY.slice(0, 32)),
      iv
    );
    
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    
    return decrypted;
  } catch (error) {
    console.error("Decryption error:", error);
    return "";
  }
}
