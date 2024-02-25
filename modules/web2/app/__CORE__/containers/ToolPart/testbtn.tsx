'use client'

import Link from 'next/link'
import React from 'react'
import { pushClient } from '../../utils/clientUtils'
import { useRouter } from 'next/navigation'


export default () => {
    let r = useRouter()
    
    return <button type='button' className='' onClick={e => {
        // e.preventDefault()
        // pushClient("/client")
    }}>click me</button>
}