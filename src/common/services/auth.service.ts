'use server'

import { cookies } from 'next/headers'
import { API_URL } from '@/common/utils/constants'

type SigninResponse = {
  access_token: string;
};

export const signin = async ({
  email,
  password
}: {
  email: string;
  password: string;
}) => {
  const request = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })

  const cookie = request.headers.get('Set-Cookie')
  const token = cookie?.split(';')[0].split('=')[1]!

  if (cookie) {
    cookies().set({
      name: 'Authorization',
      value: token,
      secure: true,
      httpOnly: true,
      sameSite: 'none'
    })
  }

  const response = await request.json()

  return response as SigninResponse
}

export const getMe = async ({
  email,
  password
}: {
  email: string;
  password: string;
}) => {
  const request = await fetch(`${API_URL}/api/auth/me`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })

  const data = await request.json()

  console.log(data)

  return data
}

export const getOAuthToken = async ({
  email,
  avatar,
  username
}: {
  email: string;
  avatar: string;
  username: string;
}) => {
  try {
    const req = await fetch(`${API_URL}/api/auth/oauth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, avatar, username })
    })

    console.log('status code:', req.status)

    const data = await req.json()

    console.log(data)
    return data
  } catch (error) {
    console.error(error)

    return { access_token: null }
  }
}
