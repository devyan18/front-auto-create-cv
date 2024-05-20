// ignore eslint in next line no-unused-vars

// eslint-disable-next-line
import NextAuth from 'next-auth'
import { OAuthProfile } from 'next-auth/providers'
// eslint-disable-next-line
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  // eslint-disable-next-line
  interface Session {
    user: {
      userId: string;
      avatar: string,
      email: string;
      username: string;
    };

    access_token: string;
  }

  // eslint-disable-next-line
  interface User {
    userId: string;
    avatar: string;
    username: string;
    email: string;
  }

  // eslint-disable-next-line
  interface Profile {
    id: string;
    username: string;
    email: string;
    avatar: string;
    avatar_url: string;
  }
}

declare module 'next-auth/jwt' {
  // eslint-disable-next-line
  interface JWT {
    user: {
      userId: string;
      avatar: string;
      email: string;
      username: string;
    };

    access_token: string;
  }
  // eslint-disable-next-line
  interface User {
    userId: string;
    avatar: string;
    username: string;
    email: string;
  }
}

declare module 'next-auth/providers' {

}
