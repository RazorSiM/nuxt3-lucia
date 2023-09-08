import { eq, sql } from 'drizzle-orm'
import { db } from '../index'
import type { User } from './schema'
import { users } from './schema'

export async function selectUserByEmail(email: string): Promise<User> {
  const prepared = db
    .select()
    .from(users)
    .where(eq(users.email, sql.placeholder('email')))
    .prepare('selectUserByEmail')

  const result = await prepared.execute({ email })
  return result[0]
}

export async function selectUserByID(id: string): Promise<User> {
  const prepared = db
    .select()
    .from(users)
    .where(eq(users.id, sql.placeholder('id')))
    .prepare('selectUserByID')

  const result = await prepared.execute({ id })
  return result[0]
}

export async function modifyUsername(userId: string, username: string): Promise<User> {
  const result = await db.update(users).set({ username }).where(eq(users.id, userId)).returning()
  return result[0]
}
