import * as fs from 'fs';

// TODO node error 코드 문서(https://nodejs.org/api/errors.html#errors_err_ambiguous_argument)
// 위 내용을 제공하는 enum같은 건 없을까?
// const enum StatErrorCode {
//     FileNotExists = 'ENOENT',
// }

type StatResult = {
    stats ?: fs.Stats,
    error ?: NodeJS.ErrnoException
}

export async function exists(path: string): Promise<boolean>;
export async function exists(paths: string[]): Promise<boolean[]>;
export async function exists(paths: string | string[]): Promise<boolean| boolean[]> {
    if (Array.isArray(paths)) {
        return await _exists(paths);
    } else {
        const results = [] = await _exists([paths]);
        return results[0];
    }
};
async function _exists(paths: string[]): Promise<boolean[]> {
    // WARN: fail-fast behaviour
    const statResultList = await Promise.all(paths.map(path => stat(path)));
    return statResultList.map(({stats, error}) => {
        if (stats && !error) {
            return true;
        }
        return false;
        // TODO: 존재한다, 이 외의 상세처리는 무엇이있을까?
        // if (error) {
        //     if (error.code == StatErrorCode.FileNotExists) {
        //         return false;
        //     }
        // }
    });
}

async function stat(path: string): Promise<StatResult> {
    return new Promise<StatResult>((resolve, _) => {
        fs.stat(path, function (error, stats) {
            // return only result
            resolve({stats, error});
        });
    })
}
