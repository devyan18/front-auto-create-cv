'use client'

import { SessionProvider } from 'next-auth/react'
import React from 'react'

type Props = {
  children: React.ReactNode;
};

export default function MySessionProvider (props: Props) {
  return <SessionProvider>{props.children}</SessionProvider>
}
