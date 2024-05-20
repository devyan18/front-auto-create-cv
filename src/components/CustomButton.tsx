'use client'

import type { ReactNode } from 'react'

type CustomButtonProps = {
  onClick: () => void;
  title: string;
  disabled?: boolean;
  isLoading?: boolean;
  icon?: ReactNode;
  otherStyles?: string;
  type?: 'button' | 'submit';
};

export default function CustomButton ({
  disabled,
  onClick,
  title,
  icon,
  isLoading,
  otherStyles,
  type = 'button'
}: CustomButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
      hover:bg-gradient-to-r hover:from-secondary hover:to-secondary transition-all duration-300 ease-in-out
      bg-gradient-to-l from-secondary to-secondary-400 rounded-full flex gap-1 justify-center items-center ${otherStyles} px-7 py-1  ${
        disabled || isLoading ? 'opacity-50 disabled:cursor-not-allowed' : ''
      }`}
      disabled={disabled || isLoading}
    >
      {isLoading
        ? (
        <div className="loader text-black-200 flex items-center"></div>
          )
        : (
        <>
          <span className='text-primary font-poppins text-md'>{icon}</span>
          <span className={`flex-1 text-left text-primary font-poppins font-semibold text-md ${otherStyles}`}>
            {title}
          </span>
        </>
          )}
    </button>
  )
}
