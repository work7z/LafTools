import os from 'os'
import path from 'path';
import fileSystem from 'fs'
import { readFileSync } from 'fs';
import dao from '@/app/__CORE__/dao';
import { setCookie, getCookie } from 'cookies-next';
export const dynamic = 'force-dynamic' // defaults to auto


export let getImgBase64 = (random: number): any => {
  let elb3Root = process.env["ELB3_ROOT"] || ''
  let file = path.join(elb3Root, 'precompiled', 'dev', `${random}.png`)
  let b = readFileSync(file)
  return b
}

export async function GET(request: Request) {
  let daoRef = await dao()
  daoRef.redis.set('', '')
  let random = Math.floor(Math.random() * 10)

  let response = new Response(getImgBase64(random), {
    headers: {
      "content-type": "image/png",
      "cache-control": "no-cache",
    }
  })
  return response
}