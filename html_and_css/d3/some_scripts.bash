# main
# ---
main() {
    usage

    if [ "$1" = "server" ]; then
        run_simple_server $2
    elif [ "$1" = "stuff_1" ]; then
        min_src_to_full_src
    else
        echo "no action"
    fi
}
usage() {
    cat <<EOF
Usage: bash some_scripts.bash <action>

action:
    server [dir]     run static file server for mbostock_gists
    stuff_1          change d3.v4.min.js to d3.v4.js in index.html of mbostock_gists
EOF
}

# scripts
# ---

# 디버깅위해 mbostock_gists 폴더의 index.html 내용 수정함(d3.v4.min.js -> d3.v4.js)
min_src_to_full_src() {
    CWD_ROOT=$(pwd)
    for fpath in $(find mbostock_gists -name "index.html"); do
        echo target: $fpath
        dpath=$(dirname $fpath)
        fname=$(basename $fpath)

        cd $dpath
        if [ -f $fname ] && [ ! -f $fname'.bak' ]; then
            temp="/tmp/__temp__.html"

            sed -e 's#d3\.v4\.min\.js#d3\.v4\.js#g' $fname > $temp

            mv $fname $fname'.bak'
            mv $temp $fname
        fi
        cd $CWD_ROOT
    done
}

run_simple_server() {
    local dir=${1:-mbostock_gists}
    cd $dir

    (sleep 3; opera 'http://localhost:3000') &
    python3 -m http.server 3000
}


# run main
# ---
main "$@"
