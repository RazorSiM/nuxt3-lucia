import type { UserId } from 'lucia'
import { Lucia } from 'lucia'
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle'
import { Discord, GitHub } from 'arctic'
import { db, schemas } from './database'

const config = useRuntimeConfig()
const adapter = new DrizzlePostgreSQLAdapter(db, schemas.sessionTable, schemas.userTable)

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: config.sessionCookieName,
    attributes: {
      secure: !import.meta.dev,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
      email: attributes.email,
    }
  },
})

export interface DatabaseUserAttributes {
  username: string
  email: string
  id: UserId
}
declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: Omit<DatabaseUserAttributes, 'id'>
  }
}

const discordRedirectUri = `${config.origin}/auth/discord/callback`

export const githubAuthProvider = new GitHub(config.githubClientId, config.githubClientSecret)
export const discordAuthProvider = new Discord(config.discordClientId, config.discordClientSecret, discordRedirectUri)
