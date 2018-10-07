
SRC_ROOT=$(cd -P "$( dirname "${BASH_SOURCE[0]}" )" && pwd)
JOB_SYNC_FILE="/tmp/task_temp_file_to_sync_job"

# NOTE: 현재는 터미널로 예제 실행하기 위한 편의 스크립트
#	$> bash deploy_and_watch.bash xml/insecure

# main
main () {
	local target_dir=${1:-.}
	local profile=${2:-default}

	# NOTE: cwd기준으로 task가 실행된다.
	local cwd=$SRC_ROOT/$target_dir
	cd $cwd

	# check pom
	echo "profile: $profile, cwd: $cwd"
	if [ ! -f "./pom.xml" ]; then
		echo fail: base dir has not pom.xml
		return;
	fi

	# run task
	local tomcat_url="/sample"

	task_init $profile
	deploy_tomcat_with_watch_context $tomcat_url

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
	local profile=${1:-default}

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
	echo "###start: deploy_tomcat_with_watch_context ###"
	local root_url=${1:-/sample}
	export MAVEN_OPTS="-Xnoagent -Xrunjdwp:transport=dt_socket,server=y,suspend=y,address=9000";
	mvn \
		org.apache.tomcat.maven:tomcat7-maven-plugin:run \
		-Dmaven.tomcat.port=8080 \
		-Dmaven.tomcat.contextReloadable=true \
		-Dmaven.tomcat.path="$root_url" \
		-Dtomcat.warSourceDirectory='${project.build.directory}/${project.build.finalName}'
	echo "###end: deploy_tomcat_with_watch_context ###"
}

# ===
# runner
# ===
main "$@"
