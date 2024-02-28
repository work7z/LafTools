
import os from 'os'
import path from 'path';
import fileSystem from 'fs'
import { readFileSync } from 'fs';
import dao from '@/app/__CORE__/dao';
import { setCookie, getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic' // defaults to auto
import { randomUUID } from 'crypto';
import { getPreCompiledDir, isDevEnv } from '@/app/__CORE__/hooks/env';


export let handleImgBase64 = (random: number): any => {
    let file = path.join(getPreCompiledDir(), `${random}.png`)
    let b = readFileSync(file)
    return b
}


export let handleImgBase64Result = (random: number): string => {
    let file = path.join(getPreCompiledDir(), `${random}.txt`)
    let b = readFileSync(file, 'utf-8')
    return b
}
