
# cli 명령

- 환경변수 확인
  go env

- 빌드
  go build

  - main 존재할경우
    기본은 cwd의 위치에 cwd의 폴더명으로 실행파일 생성됨
  - 라이브러리일경우
    컴파일 실패유무만 확인됨


- 설치/제거(go install/go clean)

  - main 존재할경우
    $GOPATH/bin에 빌드된 실행파일이 폴더명으로 생성됨
    You can run go install to install the binary into your workspace's bin directory or go clean -i to remove it.

  - 라이브러리일경우
    $GOPATH/pkg/linux_amd64/github.com/elfmagic86/ 위치에 stringutil.a 같은 패키지파일이 생성됨


