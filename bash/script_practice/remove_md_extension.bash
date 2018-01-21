#!/bin/bash
####
# markdown확장자 제거.
# : 잘못된 마크다운사용한것, 그냥 일반텍스트를 사용하자.
#####

# TODO 두번사용했는데, 또 사용하게된다면 좀더 동적으로만들자.
TARGET_PATH=~/Desktop/Project_Mine/practice_and_study
ARC_PATH=/tmp/$(basename $TARGET_PATH)_$(date +"%Y%m%d_%H%M%S").tar.gz

# 1. 백업만들기
echo backup...
(cd $TARGET_PATH && tar czvf $ARC_PATH --exclude 'node_modules' --exclude '.git' .)


#2. md확장자 없에기
## 중복될수도있으니 vim 백업파일을 먼저 제거하자.
echo run remove md...
files=$(cd $TARGET_PATH && ag --hidden -g "")
rm $(echo "$files" | grep '.*~$') > /dev/null 2>&1
## remove markdown extesion
for file in $(echo "$files" | grep -i '\(\.md$\)\|\(\.markdown\)'); do
  echo TARGET:$file
  (cd $TARGET_PATH && mv $file ${file%%.*})
done
