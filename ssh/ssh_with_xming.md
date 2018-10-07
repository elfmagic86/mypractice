# xming

- ssh(wsl) + xming(windows) 이슈
  - 에러

    ```sh
    $> xclock
    No protocol specified
    Error: Can't open display: 192.168.239.1:0.0
    ```

  - 처리
    1. ssh로 타겟서버에 접속
      ```sh
      # 클라이언트ip 확인
      echo $SSH_CLIENT

      # 명시적으로 클라이언트ip(xming 서버)입력
      export DISPLAY=192.168.239.1:0
      ```

    2. xming(windows)에서
      설치된 곳의 X0.hosts에 타겟서버의 ip추가 후 xming재시작

  - 주의
  아래의 로그 참고하여 위의 DISPLAY 설정해야함

    ```Xming.0.log
    C:\Program Files (x86)\Xming\Xming.exe :0 -clipboard
    -multiwindow
    XdmcpRegisterConnection: newAddress 192.168.239.1
    ```
