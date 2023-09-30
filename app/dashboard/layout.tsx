"use client"

import withAuth from "@/hoc/withAuth"

function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export default withAuth(Layout)
