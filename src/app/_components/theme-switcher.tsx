'use client'
import React, { useEffect, useState } from 'react'
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from 'next-themes';

const ThemeSwitcher = () => {
  //Because this is a client component, we need to make sure it's mounted before we can use it
  //in order to avoid errors
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()
  useEffect(() => setMounted(true), [])
  //if the component is not mounted, we want to render a temoporary image to avoid
  //layout shift
  if (!mounted) (
    <svg className='animate-spin size-6' />
  )
  return (
    <button
      type="button"
      className="flex text-lg rounded-md gap-2 inset-0 max-w-[30vw] justify-evenly bg-slate-400 p-1"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      <h1>{resolvedTheme === 'dark' ? 'Light' : 'Dark'}</h1>
      {
        resolvedTheme === 'dark' ? (
          <FaSun className='size-6' />
        ) : (
          <FaMoon className='size-6' />
        )
      }
    </button>
  )
}

export default ThemeSwitcher