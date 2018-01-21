#!/bin/bash

###############
# 디렉토리이름과 비슷한 빈py파일만드는것
# TODO 필요하게될때, 정리해야함.
###############

# 단순히 각 폴더의 실행명령만 갖고있음.
# 속도가 문제되는것들은 짧은 예시것사용.
# TODO 양이 많아지면 arg로 실행 구분할수도있음
function main() {
	dir=$(first "$1-*")
	# echo $dir
	# if [ -z "$1" ]; then # check empty string
	if [ -d $dir ]; then # check exist dir
		run $dir
	else
		echo "no dir: $dir"
	fi
}

#  -------------
function run() {
	cd $1
	# echo $(pwd)
	file=$(first ex*.py)
	# echo "$file"
	if [ -f $file ]; then # 파일 이름으로 존재체크.
		python3 $file
	else
		echo "no file: $file"
	fi
}

# head -n1: newline으로 여러줄이면 첫번째줄만.
# awk '{print $1}': awk는 $0는 입력값, $1, $2...는 공백으로 구분된 첫번째문자열, 두번째문자열 이런식.
function first() {
	ret=""
	ret=$(echo "$1" | head -n1 | awk '{print $1}')
	# !! echo가 어떻게 쌓여서 반환되는지 모르겠다. echo를 여럿하면 여러번들어감.
	echo "$ret"
}

# exerciseXX.py파일 만들기
function touch_exerciseXX_if_not_exist() {
	for dir in $(echo *); do
		if [ -d $dir ]; then
			# 필요없어진..to int  (01 -> 1)
			# echo "${prefix#0}"

			# 대괄호 한개짜리로 저 표현식사용하면 에러남 =~: binary operator expected
			cur=$(pwd)
			if [[ $dir =~ ^[0-9].*$ ]]; then
				# `-`로 자르고 첫번째것.
				prefix=$(echo "$dir" | cut -d'-' -f 1)
				file="${cur}/${dir}/exercise${prefix}.py"
				if [ ! -f $file ]; then
					touch "$file"
				fi
			fi
		fi
	done
}


echo '==================================='
echo 'start'
echo '====='
touch_exerciseXX_if_not_exist
# "$@" to main() you can access the command-line arguments $1, $2, et al just as you normally would.
main "$@"
echo '====='
echo 'end'
echo '==================================='
