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