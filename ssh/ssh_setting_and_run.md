
# ssh관련

- ssh(Secure Shell)
  <https://ko.wikipedia.org/wiki/시큐어_셸>
  > 시큐어 셸(Secure Shell, SSH)은 네트워크 상의 다른 컴퓨터에 로그인하거나 원격 시스템에서 명령을 실행하고 다른 시스템으로 파일을 복사할 수 있도록 해 주는 응용 프로그램 또는 그 프로토콜을 가리킨다. 기존의 rsh, rlogin, 텔넷 등을 대체하기 위해 설계되었으며, 강력한 인증 방법 및 안전하지 못한 네트워크에서 안전하게 통신을 할 수 있는 기능을 제공한다. 기본적으로는 22번 포트를 사용한다.
  > SSH는 암호화 기법을 사용하기 때문에, 통신이 노출된다 하더라도 이해할 수 없는 암호화된 문자로 보인다.

- login-shell로 접속함.

## ssh설정(ubuntu14)

- ssh 설치
  ssh사용하기위해 ssh클라이언트, ssh서버가 필요함

- ssh client 설치
  기본으로 설치되어있음(ssh — OpenSSH SSH client (remote login program)

- ssh server(sshd - OpenSSH SSH daemon)
  - 설치
    ```sh
    sudo apt-get install openssh-server
    ```

  - autostart막기(기본설정이 autostart)
    ```sh
    sudo bash -c 'echo "manual" > /etc/init/ssh.override'
    ```

## 실행

### sshd 실행(not autostart)

- service

  ```sh
  sudo service ssh start
  ```

- 직접 실행
  그냥 방법이있다 정도이고, 서비스를 사용하자.

  ```sh
  sudo sh -c 'exec /usr/sbin/sshd -D'
  ```

- todo 운영환경?
- 커스텀 설정파일 사용
- 기본 포트 대신 다른 포트 사용
- -d 옵션으로 디버그 메시지를 남기기?

### ssh 실행

  ```sh
  ssh {username}@{ip}
  ```

## advanced

---
TODO 필요시 더볼것.

- client/server관계에서 ssh프로그램을 어떻게 사용하는지에대해
  <https://ansuchan.com/ssh-without-password>

- ssh config 사용례
  <http://www.haruair.com/blog/2219>
