"use client"

import StaffLoginPage from '@/components/admin/login/StaffLogin'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

function Page() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("staff_accessToken")
    if (token) {
      router.push("/lab-staff/dashboard")
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false)
    }
  }, [router])

  if (loading) return null;

  return (
    <div>
      <StaffLoginPage></StaffLoginPage>
    </div>
  )
}

export default Page
