const fs = require('fs');
const readline = require('readline');

type Option = { encoding: 'utf8' | string };

export function readLine(
    path: string, 
    lineConsumer: (string) => void, 
    option: Option = { encoding: 'utf8'}
): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        // https://stackoverflow.com/a/50146477
        var fReadAD = fs.createReadStream(path,option);
        var objReadlineAD = readline.createInterface({
           input: fReadAD
        });
        objReadlineAD.on('line', (line) => {
            // console.log('line');
            lineConsumer(line);
        });
        objReadlineAD.on('close', () => {
            // console.log('close');
            resolve()
        });
        objReadlineAD.on('error', (error) => {
            // console.log('error');
            reject(error);
        });
    });
}

export async function readJSON(path: string, option: Option = { encoding: 'utf8'}) {
    const chunk:string = await readChunkFile(path, option);
    try {
        // remove comment
        return JSON.parse(_removeComment(chunk));
    } catch(e) {
        throw e;
    }
}

function _removeComment(content) {
    // https://stackoverflow.com/a/15123777
    return content.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1');
}

export function readChunkFile(path: string, option: Option = { encoding: 'utf8'}) {
    return new Promise<any>((resolve, reject) => {
        fs.readFile(path, option.encoding, function (error, data) {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    })
}



