
# 기본

## 기본 키

- m
  main view로 이동

- q
  현재 view 닫기

- h
  키 도움말

## 이동 키

- C-d/C-u
  스크롤

- @  or :/^@@
  diff view에서 @@찾기(find word)

- %
  commit view or diff view에서 설정된 파일 필터를 토글함
  파일필터는 `tig foo.md`특정 파일 대상으로 시작시 설정됨

# command

## 유용

- 현재화면 파일에저장
  todo: 절대경로만되는건지? ex) /tmp/test
  ```:save-dispaly <saved-path>```

- https://jonas.github.io/tig/doc/tig.1.html
  - 하나의 파일 변경사항
  $ tig -- README

  - 폴더에 해당하는? 연관 커밋리스트 보기?
  $ tig -- DIR

  - Show references (branches, remotes and tags):
  $ tig refs

# 유용해보이는것

  Display contents of the README file in a specific revision:
  $ tig show tig-0.8:README


  Grep all files for lines containing DEFINE_ENUM:
  $ tig grep -p DEFINE_ENUM
