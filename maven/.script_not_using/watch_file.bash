#!/bin/bash

SRC_ROOT=$(cd -P "$( dirname "${BASH_SOURCE[0]}" )" && pwd)
JOB_SYNC_FILE="/tmp/task_temp_file_to_sync_job"


# TODO

# main
main () {
	local profile=${1:-local}

	# NOTE: cwd기준으로 task가 실행된다.
	local cwd=$SRC_ROOT/../
	cd $cwd

	# check pom
	if [ ! -f "./pom.xml" ]; then
		echo fail: base dir has not pom.xml
		return;
	fi

	# run task
	echo "profile: $profile, cwd:$(pwd)"

	build_war_with_watch_files &

	# clean
	trap 'clean_all' EXIT
	wait
}

clean_all() {
	echo "### cleanall ###"
	# inotifywait 제거
	ps -ef | grep inotifywait | grep -v grep | awk '{print $2}' | xargs kill -9

	# sync file 제거
	rm -rf $JOB_SYNC_FILE
}

# ===
# func
# ===


build_war_with_watch_files() {
	echo "###start: build_war_with_watch_files ###"
	local watch_root_dir="." # .은 현재폴더

	# -r: recursive subdir
	# -m: monitor?..
	# -v: --invert-match
	inotifywait -m -r . | egrep -v '.git|target' --line-buffered |
		while read path events file; do
			if [ -z "$file" ]; then continue; fi

			case "$events" in
				CREATE|DELETE|MODIFY) _build_war "$file" ;;
				*) ;;
			esac
		done
		echo "###end: build_war_with_watch_files ###"
}

_build_war() {
	local file=$1
	debounce_action() {
		# 실행 중인 background job이 있으면 동작하지 않음
		if [ -f "$JOB_SYNC_FILE" ]; then return; fi

		touch $JOB_SYNC_FILE

		# background job
		(
		case "$file" in
			*.java)
				mvn org.apache.maven.plugins:maven-compiler-plugin:compile
				;;
			*.jsp|*.xml)
				mvn org.apache.maven.plugins:maven-war-plugin:war
				;;
			*) ;;
		esac

		# 위의 커맨드에 시간이 걸리므로 sleep안해도됨
		# sleep 1
		rm -rf $JOB_SYNC_FILE
		) &
	}

	case "$file" in
		*.java|*.jsp|*.xml) debounce_action ;;
		*) ;;
	esac
}



# ===
# runner
# ===
main "$@"
