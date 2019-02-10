
# setup

## 설치(go tools)

- 설치
  - 다운로드 https://golang.org/dl/
  - 추출 및 설치
      ```sh
      sudo tar -C /usr/local -xzf go1.11.1.linux-amd64.tar.gz 
      ```
  - 환경변수 등록
    ```sh
    export GOROOT=/usr/local/go
    export GOPATH=$HOME/go

    # PATH for bin
    export PATH=$PATH:$GOROOT/bin:$GOPATH/bin
    ```

- 버전 업그레이드
  If you are upgrading from an older version of Go you must first remove the existing version.


