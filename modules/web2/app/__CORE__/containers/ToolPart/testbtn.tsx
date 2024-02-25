'use client'

import Link from 'next/link'
import React from 'react'
import { pushClient } from '../../utils/clientUtils'
import { useRouter } from 'next/router'


export default () => {
    let r = useRouter()
    
    return <button type='button' className='' onClick={e => {
        // e.preventDefault()
        // pushClient("/client")
        r.push("/client", undefined, { shallow: true })
    }}>click me</button>
}