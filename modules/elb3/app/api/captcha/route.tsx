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


export let getImgBase64 = (random: number): any => {
  let file = path.join(getPreCompiledDir(), `${random}.png`)
  let b = readFileSync(file)
  return b
}


export let getImgBase64Result = (random: number): string => {
  let file = path.join(getPreCompiledDir(), `${random}.txt`)
  let b = readFileSync(file, 'utf-8')
  return b
}
export async function GET(req: Request) {
  const res = new NextResponse();
  let daoRef = await dao()
  let random = Math.floor(Math.random() * 10)
  console.log('route captcha GET', random,)
  let randomID = 'VC-' + randomUUID().toString()
  daoRef.redis.setEx(randomID, 60 * 10, random + '') // expire in 10 minutes
  setCookie('vcode', randomID, { maxAge: 60 * 12, cookies })
  let response = new Response(getImgBase64(random), {
    headers: {
      "content-type": "image/png",
      "cache-control": "no-cache",
    }
  })
  return response
}