#
# sed 명령 기록용
#

# apt로 명령 로그(위치?)의 내용인 pkg (이전버전, 설치버전) 이용하여
# 이전상태의 버전으로 돌리는 스크립트였음..
#


echo start
targets='growisofs:amd64 (7.1-10build1, 7.1-11.1), htop:amd64 (1.0.2-3, 2.0.2-1),
libpam-runtime:amd64 (1.1.8-1ubuntu2.2, 1.1.8-3.6), dc:amd64 (1.06.95-8ubuntu1,
1.06.95-9+b3), python3-pyparsing:amd64 (2.0.1+dfsg1-1build1, 2.1.10+dfsg1-1), fakeroot:amd64
(1.20-3ubuntu2, 1.21-3.1), libxkbcommon-x11-0:amd64 (0.4.1-0ubuntu1, 0.7.1-1)'
# 이하 생략

targets=$(echo $targets | sed -r -e 's#\), #)\n#g; s# ##g')

# 1, 2는 조금다름
# 1. ??
targets=$(echo -e "$targets" | sed -rn -e 's#(.*)\((.+),(.+)\)#\1=\2#p;' | sort)

# 2. ??
# targets=$(echo -e "$targets" | sed -rn -e 's#(.*)\((.+),(.+)\)#\1#p;' | sort)
echo $targets
# apt-get --yes --force-yes install --reinstall $(echo "$targets")
for target in echo $targets; do
  echo ---
  echo $target

  # !! 설치부분 주의
  # apt-get --yes --force-yes install $target
done
