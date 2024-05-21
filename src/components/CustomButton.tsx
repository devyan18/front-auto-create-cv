'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

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
    <motion.button
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      type={type}
      onClick={onClick}
      className={`
      hover:bg-gradient-to-r hover:from-secondary hover:to-secondary transition-all duration-300 ease-in-out
      bg-gradient-to-l from-secondary to-secondary-400 rounded-full flex gap-1 justify-center items-center ${otherStyles} px-7 py-1  ${
        disabled || isLoading ? 'disabled:cursor-not-allowed disabled:bg-gradient-to-l disabled:from-secondary-800 disabled:to-secondary-800' : ''
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
          <span className={`flex-1 text-primary font-poppins font-semibold text-md ${otherStyles}`}>
            {disabled ? 'Disabled' : title}
          </span>
        </>
          )}
    </motion.button>
  )
}
