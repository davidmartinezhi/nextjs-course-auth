import { hash } from "brcyptjs";

export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashPassword;
}
