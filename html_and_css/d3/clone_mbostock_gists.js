/**
 *
 * clone mbostock gists
 *
 * usage:
 *  node ./clone_mbostock_gists.js
 *
 * REF: https://gist.github.com/mbostock/3883098
 * DEPS: node v7.10.1
 *
 */

const fs = require('fs')
const path = require('path');
const https = require('https')
const { exec } = require('child_process');

const ROOT_DIR = path.join(__dirname, './mbostock_gists')
// define main
// NOTE: run main at end line
// ---
const main = async () => {
    // 0. required
    change_cwd(ROOT_DIR)

    // 1. down all json
    try {
        // await task_down_all_Json()
        await downJson(1)
    } catch(e) {
        // no throw for next step
        console.log(e)
    }

    // 2. clone all gists
    try {
        const str_parser = (str) => str.split('\n')
        // const json_files = await exec_wrap(`ls | grep '.json$'`, str_parser)
        const json_files = await exec_wrap(`ls | grep '^1.json$'`, str_parser)

        // TODO sort
        for (json_file of json_files) {
            if (json_file) {
                console.log(json_file)
                await task_clone_gists(json_file)
            }
        }
    } catch(e) {
        console.log('fail: ', e)
    }
}

// help
// ---

// exec_wrap
const exec_wrap = (cmd, str_parser) => {
    str_parser = str_parser || ( (i) => i )
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) reject(`exec error: ${error}`)
            if (stderr) reject(`exec error: ${stderr}`)

            resolve(str_parser(stdout))
        });
    })
}

// change current working dir
const change_cwd = (relative_path) => {
    // console.log(process.relative_path(), __dirname)
    if (!fs.existsSync(relative_path)) {
        fs.mkdirSync(relative_path)
    }
    process.chdir(relative_path)
    console.log('change cwd: ', process.cwd())
}

// task_down_all_Json
// ---
const doRequest = (options) => {
    return new Promise((resolve, reject) => {
        // '[]' string: https://groups.google.com/forum/?fromgroups=#!topic/nodejs/75gfvfg6xuc
        let chunks = ''
        const onRequest = (res) => {
            res.setEncoding('utf8');
            res.on('data', (c) => {chunks += c})
            res.on('end', () => {
                let json_obj = JSON.parse(chunks)
                if (json_obj.length) {
                    resolve(chunks)
                } else {
                    reject('Maybe END, because no data')
                }
            })
        }

        const req = https.request(options, onRequest)
        req.on('error', reject)
        req.end();
    })
}
const downJson = async (pageNum) => {
    const fname = `${pageNum}.json`

    if (!fs.existsSync(fname)) {
        const options = {
            hostname: 'bl.ocks.org',
            port: 443,
            path: `/mbostock/${fname}`,
            method: 'GET'
        };
        // down
        console.log('start down:', fname)
        const chunks = await doRequest(options)

        // write
        fs.writeFileSync(fname, chunks, 'utf8')

    }
}
const task_down_all_Json = async function () {
    let pageNum = 1
    while(true) {
        try {
            const rs = await downJson(pageNum++)
        } catch(e) {
            throw e
        }
    }
}

// task_clone_gists
// ---
const read_json = (fname) => {
    return new Promise((resolve, reject) => {
        const opts = { encoding: 'utf8', flag: 'r' }
        fs.readFile(fname, opts, (err, data) => {
            if (err) return reject(err)

            try {
                resolve(JSON.parse(data))
            } catch(e) {
                reject(e)
            }
        });
    })
}

const clone_gist = (gist_id, dir_name) => {
    return new Promise((resolve, reject) => {
        const cmd = `git clone http://gist.github.com/${gist_id} ${dir_name}`
        console.log(`cloning ${gist_id} to ${dir_name}`);
        exec(cmd, function(error, stdout, stderr) {
            if (error) return reject(error);

            resolve('success clone')
        });
    })
}

const task_clone_gists = async (json_file) => {
    try {
        const gists = await read_json(json_file)
        const dest_dir = path.parse(json_file).name

        // before cwd
        change_cwd(dest_dir)

        for (gist of gists) {
            if (!gist || !gist.id) continue

            let dir_name = gist.description || ''
            dir_name = dir_name.replace(/\n/g, '')
            dir_name = dir_name.replace(/[ &$\.\(\)\[\]]/g, '_')
            if (!fs.existsSync(dir_name)) {
                let rs = await clone_gist(gist.id, dir_name)
                console.log(rs)
            }
        }

        // after cwd
        change_cwd(ROOT_DIR)
    } catch(e) {
        throw e
    }
}
// run main
// ---
main()
