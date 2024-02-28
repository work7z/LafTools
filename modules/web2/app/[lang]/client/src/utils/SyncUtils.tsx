// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Thu, 28 Dec 2023
// Author: LafTools Team - FX <work7z@outlook.com>
// Description: 
// Copyright (C) 2023 - Present, https://laf-tools.com and https://codegen.cc
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

import _ from 'lodash'

export function sleep(val) {
    return new Promise<void>((e) => {
        setTimeout(() => {
            e && e();
        }, val);
    });
}

export function loop(fn: (times: number) => Promise<boolean>, timeval: number): () => any {
    let myref = {
        times: 0,
        still_run: true,
    };
    let mycancelFn = () => {
        myref.still_run = false;
    };
    let okfunc = () => {
        setTimeout(async () => {
            if (!myref.still_run) {
                return;
            }
            let ok = await fn(myref.times++);
            if (ok === false) {
                return;
            }
            if (!myref.still_run) {
                return;
            }
            if (_.isNil(timeval) || timeval <= 0) {
                return;
            }
            await sleep(timeval);
            if (!myref.still_run) {
                return;
            }
            okfunc();
            if (!myref.still_run) {
                return;
            }
        }, 0);
    };
    okfunc();
    return mycancelFn;
}