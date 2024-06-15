'use client'
import React, { useEffect, useState } from 'react'
import { BsFillMoonStarsFill, BsSun } from "react-icons/bs";
import { useTheme } from 'next-themes';

const ThemeSwitcher = ({ toggle }: { toggle: React.MouseEventHandler }) => {
  //Because this is a client component, we need to make sure it's mounted before we can use it
  //in order to avoid errors
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()
  useEffect(() => setMounted(true), [])
  //if the component is not mounted, we want to render a temoporary image to avoid
  //layout shift
  if (!mounted) {
    return <svg className='animate-spin size-6' />
  }


  if (resolvedTheme === 'dark') {
    return (
      <button className='btn-sm gap-2' onClick={(e) => {
        setTheme('light')
        toggle(e)
      }}>
        <p>Dark</p>
        <BsFillMoonStarsFill className='size-4' />
      </button>
    )
  }

  if (resolvedTheme === 'light') {
    return (
      <button className='btn-sm gap-2' onClick={(e) => {
        setTheme('dark')
        toggle(e)
      }}>
        <p>Light</p>
        <BsSun className='size-4' />
      </button>
    )
  }
}

export default ThemeSwitcher