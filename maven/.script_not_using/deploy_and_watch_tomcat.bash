#!/bin/bash

SRC_ROOT=$(cd -P "$( dirname "${BASH_SOURCE[0]}" )" && pwd)

# USAGE:
#	$> bash deploy_and_watch.bash target_project_dir

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
	local tomcat_url="/"

	task_init $profile
	deploy_tomcat_with_watch_context $profile $tomcat_url

	# clean
	trap 'clean_all' EXIT
	wait
}

clean_all() {
	echo "### cleanall ###"
	# mvn 으로 실행된것 제거
	ps -ef | grep maven | grep -v grep | awk '{print $2}' | xargs kill -9
}

# ===
# task
# ===
task_init() {
	local profile=${1:-local}

	# target폴더가 있을경우에는 초기화작업을 했다고 가정함
	if [ -d "./target" ]; then return; fi

	echo "...task_init..."
	mvn clean install
	mvn -P $profile \
	org.apache.maven.plugins:maven-resources-plugin:resources \
	org.apache.maven.plugins:maven-compiler-plugin:compile \
	org.apache.maven.plugins:maven-antrun-plugin:run \
	org.apache.maven.plugins:maven-war-plugin:war
}

deploy_tomcat_with_watch_context() {
	local profile=${1:-local}
	local root_url=${2:-/}

	_check_properties
	echo "###start: deploy_tomcat_with_watch_context ###"
	echo " --- ROOT_URL: $root_url ---"

	# TODO debug
	# export MAVEN_OPTS="-Xnoagent -Xrunjdwp:transport=dt_socket,server=y,suspend=y,address=9000"

	mvn -P $profile \
	org.apache.tomcat.maven:tomcat8-maven-plugin:run \
	-Dmaven.tomcat.port=8080 \
	-Dmaven.tomcat.contextReloadable=true \
	-Dmaven.tomcat.path="$root_url" \
	-Dtomcat.warSourceDirectory='${project.build.directory}/${project.build.finalName}'
	echo "###end: deploy_tomcat_with_watch_context ###"
}
_check_properties() {
	local targets=./target/classes/*.properties
	for target in $targets; do
		echo "-- $target --"
		cat $target
		echo ""
		echo ""
	done
}

# ===
# runner
# ===
main "$@"
