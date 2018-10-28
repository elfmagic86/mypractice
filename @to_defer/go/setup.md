
# setup

## 설치(go tools)

- 버전 업그레이드
  If you are upgrading from an older version of Go you must first remove the existing version.

- 설치
  - 다운로드 https://golang.org/dl/
  - 추출
      ```sh
      sudo tar -C /usr/local -xzf go1.11.1.linux-amd64.tar.gz 
      ```
  - 환경변수 등록
    ```sh
    export GOROOT=/usr/local/go
    export PATH=$PATH:$GOROOT/bin
    ```

## GOPATH

외부 라이브러리, 현재 소스의 바이너리등은 GOPATH에 등록된다.
CLI로 실행위해 GOPATH의 bin을 PATH에 등록할수있음

  - mutiple gopath
    https://thanish.me/using-multiple-gopaths-4b267dcca3f8
    `get`, `import`가 순차적으로 동작함.
    그러므로 전역 및 개인 위치로 의존성관리 가능

## vscode

- go플러그인(Go for Visual Studio Code) 설치

- settings.json (Workspace setting)

  ```js
    "go.goroot": "/usr/local/go",
    // NOTE: if go.inferGopath && exists workspace/src then
    //		    gopath is workspace
    "go.inferGopath": false,
    // 1. global 2. current workspace
    "go.gopath": "~/go:${workspaceFolder}"
  ```

- GO: Current GOPATH
  현재 gopath확인

- Go: Install/Update Tools
  전체 설치
  그중, delve(1.8 >= Go Version)은 디버깅 도구로 vscode 디버깅시 사용함
