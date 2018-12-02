import * as fs from 'fs';
import { from, forkJoin } from 'rxjs';
import { mergeMap, filter, concatMap } from 'rxjs/operators';

import * as statFile from './statFile';

type Option = { encoding: 'utf8' | string };

export async function createFileIfNotExists(path: string, data: string, option?: Option): Promise<void>;
export async function createFileIfNotExists(path: string[], data: string, option?: Option): Promise<void[]>;
export async function createFileIfNotExists(paths: string | string[], data: string, option: Option = { encoding: 'utf8'}): Promise<void | void[]> {
    paths = Array.isArray(paths) ? paths : [paths];

    const source = 
        from(paths)
        .pipe(
            mergeMap(
                path => statFile.exists(path),
                (path, existsPath) => !existsPath ? path : null
            ),
            filter(path => path != null),
            concatMap(path => writeFile(path, data, option))
        );
    
    const results = await forkJoin(source).toPromise();
    return results;
}

function writeFile(path: string, data: string, option: Option = { encoding: 'utf8'}): Promise<void> {
    // console.log('create file', path);
    return new Promise<void>((resolve, reject) => {
        fs.writeFile(path, data, option.encoding, function (error) {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    })
}


export async function deleteFileIfExists(path: string): Promise<void>;
export async function deleteFileIfExists(paths: string[]): Promise<void[]>;
export async function deleteFileIfExists(paths: string | string[]): Promise<void | void[]> {
    paths = Array.isArray(paths) ? paths : [paths];

    const source = 
        from(paths)
        .pipe(
            mergeMap(
                path => statFile.exists(path),
                (path, existsPath) => existsPath ? path : null
            ),
            filter(path => path != null),
            concatMap(path => deleteFile(path))
        );
    
    const results = await forkJoin(source).toPromise();
    return results;
}

function deleteFile(path: string): Promise<void> {
    // console.log('delete file', path);
    return new Promise<void>((resolve, reject) => {
        fs.unlink(path, function (error) {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    })
}
