import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { AppProvider } from "@/provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tech.museum",
  description: "OSSで技術ブログを革新する",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
