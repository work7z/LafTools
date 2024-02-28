'use client'

import Link from 'next/link'
import React from 'react'
import { pushClient } from '@/app/__CORE__/utils/clientUtils'
import { useRouter } from 'next/navigation'


let TestBtn = () => {
    let r = useRouter()

    return <button type='button' className='' onClick={e => {

    }}>click me</button>
}
export default TestBtn;