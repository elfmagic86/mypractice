# 디버깅

- vscode이용 
  - vscode 실행(extention 소스가 workspace)
  - debug run
    launch.js, task.js는 아래 참고
    https://github.com/Microsoft/vscode-wordcount/blob/master/.vscode/launch.json

  - 기존창에서 breakpoint 설정하여 디버깅하고,
    디버깅으로 오픈된 vscode에서 명령실행하여 이벤트트리거함

[x]- 리모트디버깅

  ``` 
  # 대상열기
  /usr/share/code/code --debugBrkPluginHost=26420 --extensionDevelopmentPath=/home/kang/Desktop/Project_Mine/mypractice/vscode_extention/hello-world

  # 크롬에서 chrome://inspect/ 접속
  # Open dedicated DevTools for Node -> 26420 설정함
  ```

[x]- vscode의 개발자도구에서 직접 디버깅
  아톰과 다르게 소스가 직접 로딩되지 않음
