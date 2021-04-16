# time

## beginner

- Time Zone과 UTC
https://en.wikipedia.org/wiki/Time_zone#/media/File:Standard_World_Time_Zones.png
  - 경도0도(그리니치 천문대)가 중심, -7.5도~+7.5의 영역이 UTC 0
    경도0도에서 15도의 차이마다 UTC 0에서 +1/-1을 한 동일시간을 가진 영역이 됨.
    그러나, 국가나 지역에서 실제 사용하는 `타임존`은 여러(국가, 통신망, 거리) 이유로 다름.(그림참고)

  - 그림의 UTC+1, UTC-1과 같은 표준시에 대한 영역을 `타임존`이라 부름
    ex) 한국표준시(KST)와 일본표준시(JST)는  같은 `시간대(타임존)`을 사용한다.
    
  - UTC(or UTC 0)의 타임존은 경도범위(경도-7.5 ~ 경도+7.5)이다.
    그러나 그림을 보면 영국은 타임존으로 UTC를 사용하고, 프랑스등은 UTC+1인 타임존을 사용함.

  - 표준시와 타임존 예시
    - KST — 한국 표준시, UTC + 9   
    - CST — 중국 표준시, UTC + 8
    - EET — 동부 유럽 표준시, UTC + 2
    - CET/MET — 중부 유럽 표준시, UTC + 1
    - WET — 서부 유럽 표준시, UTC or UTC +0 or UTC -0
    - GMT. 그리니치 평균시(or 표준시), UTC or UTC +0 or UTC -0
    - EST — 동부 표준시, UTC -5


  - TODO UTC+1, GMT+1, UTC/GMT +1 처럼 사용 되는 것에 대한 차이

- Unix 시간, POXIS 시간, 
https://ko.wikipedia.org/wiki/유닉스_시간
> 1970년 1월 1일 00:00:00 협정 세계시(UTC) 부터의 경과 시간을 초로 환산하여 정수로 나타낸 것이다.
> 유닉스 시간에서 윤초는 무시된다
> 32비트로 표현된 유닉스 시간은 1970년 1월 1일 00:00 (UTC)에서 2,147,483,647 (231 - 1) 지난 후인 2038년 1월 19일 03:14:08 UTC에 2038년 문제를 발생시킨다

  - 유닉스시간을 사용할때 기준단위가 `초`
    자바, 자바스크립트에서는 Date의 기준단위가 `밀리초`
    그렇기에 유닉스 타임스탬프를 날짜형으로 변환시 곱하기 1000을 함

  - todo why 1970년 1월 1일 00:00:00 


- todo 시스템 시간
https://ko.wikipedia.org/wiki/시스템_시간

- 타임 스탬프
https://ko.wikipedia.org/wiki/타임스탬프
> 특정한 시각을 나타내는 문자열
> 파일시스템에서 타임스탬프는 저장된 파일이 생성되거나 변경된 시각을 뜻함
> 타임스탬프의 예:
  Tue 01-01-2009 6:00
  2005-10-30 T 10:45 UTC
  2007-11-09 T 11:20 UTC
  Sat Jul 23 02:16:57 2005
  1256953732 (유닉스 시간)
  (1969-07-21 T 02:56 UTC) –
  07:38, 11 December 2012 (UTC)

## Usage

- Date(javascript)

    - 년/월/일은 서로 연관 되어있기에 값 설정시 현재설정된 날짜에 의해 의도치 않은 날짜로 변경될 수 있다.

      ex1) 2019/01/30에 02월을 setMonth()함 => 03/03
      ex2) 2016/08/31에 02월을 setMonth()함 => 03/02 (참고: 2016년에 2월 29일이 존재)
      ex3) 2019/02/28에 30일을 setDate()함 => 03/01

    - setMonth()/getMonth()
    https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate
    값의 범위가 0(1월)~11(12월)
      - why? https://stackoverflow.com/questions/2552483/why-does-the-month-argument-range-from-0-to-11-in-javascripts-date-constructor

    - getTime()
    https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime
    시스템시간, 유닉스시간을 반환(1970 년 1 월 1 일 00:00:00 UTC와 주어진 날짜 사이의 경과 시간 (밀리 초)을 나타내는 숫자)

    - utc time
    Date.toISOString()
    https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
    > toISOString() 메서드는 단순화한 확장 ISO 형식(ISO 8601)의 문자열을 반환합니다. 
    > 반환값은 언제나 24글자 또는 27글자(각각 YYYY-MM-DDTHH:mm:ss.sssZ 또는 ±YYYYYY-MM-DDTHH:mm:ss.sssZ)입니다. 
    > 시간대는 언제나 UTC이며 접미어 "Z"로 표현합니다.

## MEMO

- 흐름
https://futurecreator.github.io/2018/06/07/computer-system-time/

태양시 - 세계시 - 세슘원자시계 - 협정 세계시

  - 세계시(世界時, 영어: Universal Time, UT)는 경도 0도를 표준 자오선으로 정한 시각이다.
  - UT0는 본초자오선의 평균 태양시이며, 관측 지점에 따라 변화가 없다. 
    UT1은 여기에 극운동에 의한 경년 변화을 보정하여 실제 지구가 자전한 각도를 계산하여 구한 값이다. UT1은 지역마다 다르다.
    협정 세계표준시(UTC)는 UT1과의 차이가 일정한 시간 이하가 되도록 정해진 시기에 보정하여 얻는 시간이다.


- UTC(협정세계시)
https://ko.wikipedia.org/wiki/협정_세계시
> 약자:  영어권 CUT(Coordinated Universal Time)와 프랑스어권 TUC(프랑스어: Temps Universel Coordonné)에서 C,U,T로 구성되어 있다는 점에 의해 UTC
> UTC는 국제원자시와 윤초 보정을 기반으로 표준화되었다.


- GMT
https://ko.wikipedia.org/wiki/그리니치_평균시#cite_note-1
> 그리니치 평균시(~平均時, Greenwich Mean Time, GMT)또는 그리니치 표준시는
> 런던을 기점으로 하고, 웰링턴에 종점으로 설정되는 협정 세계시의
> 기준시간대이다. 기준시간대여서 그리니치 표준시중 가장 빠른 시간대이다.

타임존지도 확인시 런던이 UTC +0의 영역, 웰링턴(뉴질랜드)이 UTC +12 영역에 존재


- TIME ZONE 
https://ko.wikipedia.org/wiki/시간대
> 시간대(時間帶)는 영국의 그리니치 천문대(본초 자오선, 경도 0도)를 기준으로
> 지역에 따른 시간의 차이, 다시 말해 지구의 자전에 따른 지역 사이에 생기는 낮과
> 밤의 차이를 인위적으로 조정하기 위해 고안된 시간의 구분선을 일컫는다.
> 시간대는 협정 세계시(UTC)를 기준으로한 상대적인 차이로 나타낸다.


- 윤초
https://ko.wikipedia.org/wiki/윤초
> 윤초(閏秒)란 협정 세계시에서 기준으로 삼고 있는 세슘 원자시계와 실제 지구의
> 자전·공전 속도를 기준으로 한 태양시의 차이로 인해 발생한 오차를 보정하기 위하여
> 추가하는 1초이다. 12월 31일의 마지막에 추가하거나, 혹은 6월 30일의 마지막에
> 추가한다
