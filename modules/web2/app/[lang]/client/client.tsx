'use client'

import NoSsr2 from '@/app/__CORE__/components/NoSsr2'
import { FinalRootApp } from './src/main'


export default () => {
    let innerChild = <div className="w-full h-full">
        <FinalRootApp />
    </div>
    return innerChild
}
