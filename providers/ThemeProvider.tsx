"use client"
import React, { ReactNode } from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";

export function ThemeProvider({children}:{children : ReactNode}){
    return <NextThemeProvider attribute="class" enableSystem>{children}</NextThemeProvider>
}
