// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Thu, 22 Feb 2024
// Author:   
// Description: 
// Copyright (C) 2024 - Present, https://laf-tools.com and https://codegen.cc
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

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

