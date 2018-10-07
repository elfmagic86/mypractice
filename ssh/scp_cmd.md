# copy

<https://unix.stackexchange.com/questions/106480/how-to-copy-files-from-one-machine-to-another-using-ssh>

- copy file from src to dest
  a는 ip

  ```sh
  scp /path/to/file username@a:/path/to/destination
  ```

- copy file from dest to src

  ```sh
  scp username@b:/path/to/file /path/to/destination
  ```

- folder

  ```sh
  # https://stackoverflow.com/questions/11304895/how-to-scp-a-folder-from-remote-to-local
  scp -r user@your.server.example.com:/path/to/foo /home/user/Desktop/
  -r Recursively copy entire directories
  ```
