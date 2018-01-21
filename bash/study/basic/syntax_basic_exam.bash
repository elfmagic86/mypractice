#!/bin/bash

##
# TODO 왜? function aa() {... 이문법이안됨?
#########
# practice
# 
if_else() {
  if [ "$AGE" -lt 20 ] || [ "$AGE" -ge 50 ]; then
    echo "Sorry, you are out of the age range."
  elif [ "$AGE" -ge 20 ] && [ "$AGE" -lt 30 ]; then
    echo "You are in your 20s"
  elif [ "$AGE" -ge 30 ] && [ "$AGE" -lt 40 ]; then
    echo "You are in your 30s"
  else
    echo "You are in your 40s"
  fi
}
p_case() {
  # 한줄
  case $AA in ("123") echo Y ;; esac

  # 여러줄
	case $1 in
		bye)
			echo Fine, bye.
			;;
		hi|hello)
			echo Nice to meet you
			;;
		what*)
			echo Whatever
			;;
		*)
			echo 'Huh?'
			;;
	esac
}

p_for() {
	strs='1 2 3'
	for str in $strs; do
		echo $strs
		echo -n $str
	done
}

p_while() {
  #매번 pid가 달라짐.
	FILE=/tmp/whiletest.$$;
	echo firstline > $FILE

	#grep이 찾으면 종료코드 0, 못찾으면 다른값반환하는성질이용.
	while tail -10 $FILE | grep -q firstline; do
		echo -n Number of lines in $FILE:' '
		wc -l $FILE | awk '{print $1}'
		echo newline >> $FILE
	done
}

#####################
# run
main() {
	p_case $@
	p_for
	p_while
}
main $@
