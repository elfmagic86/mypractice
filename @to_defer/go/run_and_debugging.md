# run and debugging

## 실행

- cli
  ```
  go install
  $GOPATH/실행파일명
  ```

- vscode
  아래 `##디버깅`의 설정 후 일반모드로 실행

  - Go: run on playground는 go tutorial에서 볼 수 있는 온라인 편집기 연결하는 동작.

## 디버깅

- vscode 사용

  - GO: Current GOPATH
    현재 gopath확인

  - delve(1.8 >= Go Version ) 확인
  ```
  # 직접설치
  go get -u github.com/derekparker/delve/cmd/dlv
  ```

  - launch.json(기본설정)
  ```
  {
    "version": "0.2.0",
    "configurations": [
      {
        "name": "Launch",
        "type": "go",
        "request": "launch",
        "mode": "auto",
        "program": "${fileDirname}",
        "env": {},
        "args": []
      }
    ]
  }
  ```

  - settings.json
  ```
	"go.goroot": "/usr/local/go",
	"go.inferGopath": false,
	"go.gopath": "~/go:${workspaceFolder}"
  ```

  - 디버그모드로 Launch 실행
