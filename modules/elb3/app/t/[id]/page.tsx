import React from 'react'
import { PageProps } from '../../__CORE__/types/pages'
import GrailLayoutWithUser from '@/app/__CORE__/containers/GrailLayoutWithUser'
import { AuthInfoProps, CombindSearchProps } from '@/app/page'
import CardPanel from '@/app/__CORE__/components/CardPanel';
import _ from 'lodash'

export default function Page(props: PageProps<{ id: number }, {}>) {
    let { searchParams, params } = props;
    let combindSearchProps = props;
    return <GrailLayoutWithUser combindSearchProps={combindSearchProps} main={(p) => {
        return (
            <div className='space-y-2 flex-1'>
                <CardPanel className={''} style={{
                    flex: '1'
                }}>

                    <div className='p-2 min-h-20'>
                        求推荐个 Node.js 的 orm 轮子,看轮子都看花眼了
                    </div>
                </CardPanel>
                {
                    _.fill(Array(10), 1).map((x, d) => {
                        return <CardPanel className={''} style={{
                            flex: '1'
                        }}>

                            <div className='p-2'>
                                {'這是一個測試連接'}
                            </div>
                        </CardPanel>

                    })
                }
            </div>
        )
    }}></GrailLayoutWithUser>
}