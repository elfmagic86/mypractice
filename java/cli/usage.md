# usage


## examples

- compile

  ```sh
  # - 
  javac -verbose \
    -classpath ~/.m2/repository/com/google/guava/guava/19.0/guava-19.0.jar \
    HelloWorld.java
  ```

- run

  ```sh
  # - `:.`로 추가 클래스패스 설정해야함
  java -verbose \
    -classpath ~/.m2/repository/com/google/guava/guava/19.0/guava-19.0.jar:. \
    HelloWorld
  ```

- debugging

  - 1. 실행 후 attach
  ```sh
  # 
  java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=8000 HelloWorld

  # attach(or vscode)
  # -sourcepath 적절히 추가해야 `list`명령에서 소스확인가능
  jdb -attach 8000
  ```

  - 2. 디버깅으로 실행
  ```sh
  # - `print`등으로 local 변수 디버깅할려면 `javac -g ...`로 디버깅정보 추가된 컴파일필요
  jdb HelloWorld
  ```

- info

  ```sh
  # hotspot log
  java \
    -XX:+UnlockDiagnosticVMOptions -XX:+DebugNonSafepoints \
    -XX:+LogCompilation \
    -XX:LogFile=/tmp/hotspot.log \
    HelloWorld2


  # hprof (현재위치에 로그생김)
  java -agentlib:hprof=cpu=samples,interval=20,depth=3 HelloWorld.
  ```

- info2
jps, jstack

  ```
  # 
  jps -l
  ```
