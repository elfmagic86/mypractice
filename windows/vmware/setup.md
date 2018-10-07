# setup

## 환경
  
- Windows10 home edition

## 설치

- vmware_workstation_player.v14_0(free)
  <https://my.vmware.com/en/web/vmware/free#desktop_end_user_computing/vmware_workstation_player/14_0>

- ubuntu16 iso 다운로드
  <http://theholmesoffice.com/installing-ubuntu-in-vmware-player-on-windows/>
  > [desktop](https://www.ubuntu.com/download/desktop/contribute?version=16.04.4&architecture=amd64)
  > [server](https://www.ubuntu.com/download/server/thank-you?country=KR&version=16.04.4&architecture=amd64)

- vm 생성 및 사용
  - 생성
    1. VMWare Workstation 실행(실행된상태)
    2. File -> New Virtual Machine
    3. next..next.. iso는 설정되어있는 ubuntu16.04 Server 를 사용
    4. NOTE: 설정정보 잘입력할것.
        1. Location을 C말고 D:\vmware\newVM 으로 할것
        2. 메모리, 디스크, cpu, 설정값 주의
        3. 네트워크
        브릿지, NAT등 적절히 설정,
        TODO 어떤 차이인지 정리 필요

  - 여러 vm 실행??
    - vmware player는 여럿 띄워서 vm을 실행하면됨

  - TODO: 하나의 vmware로 여럿 실행 및 관리하려면?
    vmware player가 아니라 workstation 중 다른 어떤것??을 사용하면 되는듯하다

- vm 설정
  ubuntu16.04 Server 기준

  - 기본설정
  직접 타이핑해야함,

  - root
  sudo passwd root
  - 필요시 루트로 접속
  - su -

  1. 인터넷 되는지.
  ping google.com

  2. sshd
  sudo apt install openssh-server
  service ssh restart

  - tcp 22 포트 열려있음됨. // 안되면 구글링
  netstat -an | grep 22

- 이슈
  apt install 하는데 cdrom 어쩌구 하면 아래참고하여 수정
  <https://www.velocihost.net/clients/knowledgebase/29/Fix-the-apt-get-install-error-Media-change-please-insert-the-disc-labeled--on-your-Linux-VPS.html>
  > /etc/apt/sources.list 의 cdrom 부분을 없에면됨
