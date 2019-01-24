# 의존성

## 기본

- local의 workspace 혹은 remote에서 import됨

- 짧은 이름은 표준라이브러리용
	ex) "fmt", "net/http"

- 커스텀라이브러리는 아래의 위치를 basepath로 시작하면됨
  mkdir -p $GOPATH/src/github.com/user

## install
https://stackoverflow.com/questions/45426891/why-i-am-not-able-to-fetch-go-sdk-for-docker
```sh
# Get all imports references in this directory and the expanded slice consisting of all subdirectories, recursively
go get -v -t ./...
```

- remote import path
  https://golang.org/cmd/go/#hdr-Remote_import_paths
  > TODO 모듈관련내용

- gopath
  ```
  # gopath에 전체소스가 다운되고, bin에 바이너리도 생성됨
  go get github.com/golang/example/hello
  ```

- goroot
  go 설치시 sdk, go tool이 설치된 공간



TODO 원격 소스는 마스터 기준의 코드를 사용??
