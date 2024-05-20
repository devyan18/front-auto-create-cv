'use client'

import { CustomButton, TextField } from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { loginSchema } from './validations/loginValidations'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

type loginForm = {
  email: string;
  password: string;
};

export default function LoginPage () {
  const router = useRouter()

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<loginForm>({
    resolver: zodResolver(loginSchema)
  })

  const [isLoading, setLoading] = useState<boolean>(false)

  const onSubmit = async (e: loginForm) => {
    setLoading(true)
    try {
      const response = await signIn('credentials', {
        email: e.email,
        password: e.password,
        redirect: false,
        callbackUrl: '/creator'
      })
      console.log(response)

      router.push('/creator')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border-2 border-black-100 p-4 rounded-xl">
      <h2 className="text-white text-3xl font-bold">Sign In</h2>

      <form
        className="flex flex-col gap-4 mt-6 min-w-72"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          labelTheme='light'
          label="Email"
          name="email"
          placeholder="example@test.com"
          register={register}
          errors={errors.email}
          disabled={isLoading}
        />
        <TextField
          labelTheme='light'
          disabled={isLoading}
          label="Password"
          name="password"
          isPrivate={true}
          register={register}
          errors={errors.password}
        />
        <CustomButton type='submit' title="Sign In" onClick={() => {}} isLoading={isLoading}/>
        <CustomButton
        icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.963 2.382C.554 2.621-1.82 17.93 8.852 21.602c.498.093.684-.219.684-.478v-1.68c-2.79.601-3.38-1.317-3.38-1.317a2.603 2.603 0 0 0-1.121-1.442c-.902-.612.072-.602.072-.602a2.074 2.074 0 0 1 1.536 1.038a2.167 2.167 0 0 0 2.924.819c.052-.5.275-.965.633-1.317c-2.23-.25-4.564-1.1-4.564-4.875a3.755 3.755 0 0 1 1.038-2.645a3.464 3.464 0 0 1 .103-2.634s.84-.26 2.76 1.037a9.584 9.584 0 0 1 5.02 0c1.908-1.276 2.748-1.038 2.748-1.038c.365.828.398 1.763.093 2.614a3.754 3.754 0 0 1 1.037 2.645c0 3.786-2.344 4.626-4.574 4.865c1.038.55.602 4.086.664 4.522c0 .259.176.57.695.477c10.642-3.64 8.152-18.97-3.257-19.209"/></svg>}
        type='button' title="Sign In With Github" onClick={async () => {
          const data = await signIn('github', {
            callbackUrl: '/creator',
            redirect: false
          })
          console.log(data?.status)
        }} isLoading={isLoading}/>
      </form>
      <div className="flex flex-row mt-4 gap-1 justify-center">
        <span className="text-sm">I don&apos;t have an account</span>
        <Link
          className="text-sm text-secondary hover:underline"
          href={'/auth/register'}
        >
          SignUp
        </Link>
      </div>
    </div>
  )
}
