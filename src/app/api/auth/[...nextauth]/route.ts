import NextAuth, { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getMe, getOAuthToken } from '@/common/services/auth.service'

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      async profile (profile: any) {
        const data = {
          id: profile.id,
          userId: profile.id,
          username: profile.name,
          email: profile.email,
          avatar: profile.avatar_url
        }

        return data
      }
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize (credentials, _req) {
        if (!credentials?.email || !credentials?.password) return null

        const data = await getMe({
          email: credentials.email,
          password: credentials.password
        })

        return data
      }
    })
  ],

  callbacks: {
    async jwt ({ token, user, account, profile }) {
      if (account?.provider === 'github' && profile) {
        token.user = {
          userId: profile.id as string,
          username: profile.name as string,
          email: profile.email as string,
          avatar: profile.avatar_url as string
        }

        const { avatar, email, username } = token.user

        if (!avatar || !email || !username) throw new Error('No avatar, email or username')

        console.log(username, avatar, email)

        const { access_token } = await getOAuthToken({
          email: profile.email as string,
          avatar: profile.avatar_url as string,
          username: profile.name as string
        })

        if (!access_token) throw new Error('No access token')
        console.log(access_token)
        token.access_token = access_token
      }

      if (user) return { ...token, ...user }
      if (profile) return { ...token, ...profile }

      return token
    },

    async session ({ token, session }) {
      session.user = token.user
      session.access_token = token.access_token

      return session
    }
  },

  pages: {
    signIn: '/auth/login'
  }

}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
