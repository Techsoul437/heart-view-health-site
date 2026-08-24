"use client"

import Login from '@/components/admin/login/Login'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

function Page() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("labAdmin_accessToken")
    if (token) {
      router.push("/lab-admin/dashboard")
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false)
    }
  }, [router])

  if (loading) return null;

  return (
    <div>
      <Login></Login>
    </div>
  )
}

export default Page
