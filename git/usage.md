# 명령어모음

## 여러번사용함

- 커밋 읽기
  - git log -1    // commit 로그확인하기 1개. 2개...이렇게.
  - 한파일에 대한 로그보기

  ```sh
  git log --follow -p -- file
  ```

- 커밋 수정
  - 커밋메시지만 수정
    - 최근것
    git commit --amend -m "Your new message"

    - 여러개

    ```sh
    # 1. HEAD부터~3개
    git rebase -i HEAD~3
    # 2. 편집기에서 3개의 커밋에 대해 수행할 작업 선택한다.(기본은 pick)
    #   메시지 수정할것이므로 pick {commitId} -> reword {commitId}
    #   그리고 저장 후 종료
    # 3. 이제 위의 명령들이 순차적으로 실행됨
    #	내가 reword한 커밋차례가 왔을때 다시 편집기가 나타나고, 그때 메시지 수정하여 저장 후 종료 하면됨
    ```

  - 커밋 제거하고, 특정 커밋시점으로 돌아가기

  ```sh
  # !! do *not* use --force, keep your files!
  # 이전 커밋으로 돌아가는것. HEAD 외 hash 이용가능.
  git reset --soft HEAD^
  ```

- 변경사항 버리기

  - 변경사항만 버림

    ```sh
    git clean -f
    git checkout .
    ```

  - 추가된 파일도 버림 // 정확한지는 모름

    ```sh
    git clean -df # git clean removes all untracked files and git checkout clears all unstaged changes.
    git checkout -- .
    ```

  - gitignore 실수로 등록안된 파일 버리기

    ```sh
    # !! .(dot) 사용시 현재기준 전체버림이 됨. 특정한 파일을 지정해서 제거해줘야한다.
    git rm -r --cached .

    git add .
    git commit -m "fixed untracked files”

    # !! remote를 local로 강제 일치시킴.
    git push -f origin branch
    ```

## 잘안씀

- git blame --line-porcelain {파일명}
  파일의 각 라인별 최종수정사항

- verbose
  ex: $> GIT_CURL_VERBOSE=1 git push origin master

- git remote -v show
  push, fetch등의 명령어에 대한 remote 주소 확인

- git init
