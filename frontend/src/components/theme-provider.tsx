"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  // next-themes injects a script tag that causes hydration errors 
  // if not rendered correctly inside body with suppressHydrationWarning.
  // In Next.js App Router, the provider works perfectly by wrapping children directly.
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
