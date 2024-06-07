'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import CreateLayout from './layout'
import { CustomButton } from '@/components'
import { useRouter } from 'next/navigation'

export default function Creator () {
  const { data } = useSession()
  const router = useRouter()

  return (
    <CreateLayout>
      <div className="bg-black-200 p-6 rounded-xl">
        <div className="flex flex-row w-[540px] gap-5">
          {data?.user?.avatar && (
            <Image
              src={data?.user.avatar}
              alt="avatar"
              className="rounded-full"
              width={200}
              height={200}
              priority
            />
          )}
          <div className="py-4 flex flex-col justify-between">
            <div>
              <h1
                className="font-poppins font-bold
              text-white"
              >
                {data?.user.username}
              </h1>
              <p
                className="font-poppins text-gray-400
              "
              >
                <span>{data?.user.email}</span>
                <span>{}</span>
              </p>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
              {/* Resumes button */}
              <CustomButton
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path fill="currentColor" d="m211.48 35.32l-130.25-23a20 20 0 0 0-23.18 16.22l-29.75 169a20 20 0 0 0 16.22 23.16l130.25 23a20.1 20.1 0 0 0 3.52.31A20 20 0 0 0 198 227.46l29.75-169a20 20 0 0 0-16.27-23.14M175 219.36L52.63 197.75L81 36.64l122.37 21.61ZM91.9 67a12 12 0 0 1 13.9-9.73L173 69.14A12 12 0 0 1 171 93a12.59 12.59 0 0 1-2.1-.18L101.63 80.9A12 12 0 0 1 91.9 67M85 106.39a12 12 0 0 1 13.91-9.73l67.22 11.88a12 12 0 0 1-2.13 23.81a12.5 12.5 0 0 1-2.1-.18l-67.21-11.88a12 12 0 0 1-9.69-13.9m-7 39.39a12 12 0 0 1 13.9-9.73l33.64 5.95a12 12 0 0 1-2.07 23.82a11.63 11.63 0 0 1-2.1-.19l-33.61-5.93A12 12 0 0 1 78 145.78"/></svg>
                }
                title="Resumes"
                onClick={() => {
                  console.log('Edit Profile')
                }}
              />
              {/* Skills button */}
              <CustomButton
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    >
                      <path d="M8.5 13.5L7 12l1.5-1.5m7 0L17 12l-1.5 1.5" />
                      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0m10-2.5L11 15" />
                    </g>
                  </svg>
                }
                title="Skills"
                onClick={() => {
                  router.push('/creator/skills')
                }}
              />
              {/* Experience button */}
              <CustomButton
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 11.925l-1.7 1.3q-.15.125-.3.013t-.1-.288l.65-2.1l-1.75-1.4q-.125-.125-.075-.287T8.95 9h2.15l.65-2.05q.05-.175.25-.175t.25.175L12.9 9h2.125q.175 0 .238.163t-.063.287l-1.775 1.4l.65 2.1q.05.175-.1.288t-.3-.013zM12 21l-4.675 1.55q-.5.175-.913-.125t-.412-.8v-6.35q-.95-1.05-1.475-2.4T4 10q0-3.35 2.325-5.675T12 2t5.675 2.325T20 10q0 1.525-.525 2.875T18 15.275v6.35q0 .5-.413.8t-.912.125zm0-5q2.5 0 4.25-1.75T18 10t-1.75-4.25T12 4T7.75 5.75T6 10t1.75 4.25T12 16m-4 4.025L12 19l4 1.025v-3.1q-.875.5-1.888.788T12 18t-2.113-.288T8 16.926zm4-1.55"/></svg>
                }
                title="Experience"
                onClick={() => {
                  console.log('Edit Profile')
                }}
              />
              {/* Study button */}
              <CustomButton
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><path fill="currentColor" d="M16 6.28a1.23 1.23 0 0 0-.62-1.07l-6.74-4a1.27 1.27 0 0 0-1.28 0l-6.75 4a1.25 1.25 0 0 0 0 2.15l1.92 1.12v2.81a1.28 1.28 0 0 0 .62 1.09l4.25 2.45a1.28 1.28 0 0 0 1.24 0l4.25-2.45a1.28 1.28 0 0 0 .62-1.09V8.45l1.24-.73v2.72H16zm-3.73 5L8 13.74l-4.22-2.45V9.22l3.58 2.13a1.29 1.29 0 0 0 1.28 0l3.62-2.16zM8 10.27l-6.75-4L8 2.26l6.75 4z"/></svg>
                }
                title="Studies"
                onClick={() => {
                  router.push('/creator/study')
                }}
              />
              {/* <CustomButton /> */}
              {/* <CustomButton /> */}
              {/* <CustomButton /> */}
            </div>
          </div>
        </div>
      </div>
    </CreateLayout>
  )
}
