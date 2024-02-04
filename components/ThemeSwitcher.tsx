"use client"
import React from 'react'
import { useTheme } from 'next-themes'
import { Tabs,TabsList,TabsTrigger } from './ui/tabs';
import { DesktopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';

const ThemeSwitcher = () => {
  const {theme, setTheme} = useTheme()
  // to get rid of rehydration error
  const [mounted, setMounted] = React.useState(false);

  // useEffect only runs on client , so we can safely show the UI in this trick we are avoiding the rehydration errors
  React.useEffect(() => setMounted(true), []);

  if(!mounted) {
    return null;
  }
  return (
    <Tabs defaultValue={theme}>
      <TabsList className='border dark:border-neutral-800 dark:bg:[#030303]'>
        <TabsTrigger value='light' onClick={(e)=>setTheme("light")}>
          <SunIcon className='h-[1.2rem] w-[1.2rem]' />
        </TabsTrigger>
        <TabsTrigger value='dark' onClick={(e)=>setTheme("dark")}>
          <MoonIcon className='h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0'  />
        </TabsTrigger>        
        <TabsTrigger value='system'  onClick={(e)=>setTheme("system")}>
          <DesktopIcon className='h-[1.2rem] w-[1.2rem]'  />
        </TabsTrigger>        
      </TabsList>
    </Tabs>

  )
}

export default ThemeSwitcher