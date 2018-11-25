
# type

- integer
  
https://dev.mysql.com/doc/refman/8.0/en/integer-types.html

| Type      | Storage (Bytes) | Minimum Value Signed | Minimum Value Unsigned | Maximum Value Signed | Maximum Value Unsigned |
| TINYINT   | 1               | -128                 | 0                      | 127                  | 255                    |
| SMALLINT  | 2               | -32768               | 0                      | 32767                | 65535                  |
| MEDIUMINT | 3               | -8388608             | 0                      | 8388607              | 16777215               |
| INT       | 4               | -2^31(-2147483648)   | 0                      | 2^31-1(2147483647)   | 2^32(4294967295)-1     |
| BIGINT    | 8               | -2^63                | 0                      | 2^63-1               | 2^64-1                 |

  - signed는 음수/양수 표현 위한 비트 하나가 고정됨
  - 양수에서 `-1`은 `0`을 포함하여 표현하기 위한 범위
  - mysql의 int가 10자리수 라는것은 -22147483648 ~ 2147483647 범위가 10자리이기때문. 
    값이 10자리라도 해당 범위가 넘어가면 out of range 에러 발생.
  - int(n)에서 n의 의미는 자리수가 아닌 제로필
    - 저장(실제 용량 및 범위)에는 영향없고, select와 같이 표현에만 영향있음(스키마가 test int ZEROFILL과 같이 명시되었을경우)
    - TODO 왜 사용하는걸까?
      - 오라클이 Number(n)으로 자리수 표현한다고 하는데, 오라클과 공통적으로 사용하기 위해서 관행적으로 사용하는걸까??
        - https://docs.oracle.com/cd/E15817_01/server.111/b31055/adabas_datatype_conv.htm
          가상의 숫자형(Number(n))과 실제 타입의 매칭이 n으로 구분되어 있는 것을 확인가능.
