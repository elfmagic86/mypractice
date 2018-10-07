# regex

- https://msdn.microsoft.com/en-us/library/ae5bf541(v=vs.100).aspx
- http://regexr.com


# basic

- 수량한정자: ***직전 문자***, 직전 표현에 대해 일치하는 갯수를 판별
  - `{}`
    Marks the start and end of a quantifier expression. a{2,3} matches "aa" and "aaa".

  - `*`
    {0,}

  - `+`
   {1,}

  - `?`
   {0,1}, non-greedy


- 그리고
  - `.`
  Matches any single character except the newline character \n. To match any character including the \n, use a pattern like [\s\S]

  - `[]`
    []안의 하나의문자, [-]로 범위를 의미하기도함
    [1-4] matches "1", "2", "3", or "4". [^aAeEiIoOuU] matches any non-vowel character

  - `[^]`
    logical not, [^abc] matches any character except a, b, and c.

  - `^`
    ^\d{3} matches 3 numeric digits at the start of the searched string.

  - `()`
    서브 표현식
    Marks the start and end of a subexpression. Subexpressions can be saved for **later use** A(\d) matches "A0" to "A9". The digit is saved for later use.

- Regular expression Extensions
  이 기능은 BRE, ERE 모두에서 사용할 수 있습니다. 소문자와 대문자가 같이
있는데 대문자는 소문자의 logical NOT 이라고 생각하면 됩니다.
  이 확장 기능은 [] 에서 사용될 경우 기능하지 않습니다. 다시 말해 [\w] 는 \, w 두 문자를 나타냅니다.

  - word boundary(모호)
  `\b`는 line기준의..모든 word의 양끝을 이야기함
  `\<`는 좌, `\>`는 우

# 기초 의문

- 왜 `*`가 아닌 `.*`일까?
  `*, +, ?`는 수량한정자이기에 `*`만 사용한다는것은 어떤문자라는 기준이없이 숫자가있는것이기때문
    - `.*` :어떤문자가 0개 이상인 것을 찾음
    - `*`  :0개이상 것을 찾음

- `*, +` greedy, `?`는 lazy.
  https://stackoverflow.com/questions/2301285/what-do-lazy-and-greedy-mean-in-the-context-of-regular-expressions
  > Greedy means match longest possible string.
  Lazy means match shortest possible string.
  For example, the greedy h.+l matches 'hell' in 'hello' but the lazy h.+?l matches 'hel'.

  - 수량한정자2
    WARN: 온라인에서 결과만 확인하여 추정
    - `*?`
      {0,} -> {0} // greedy -> lazy

    - `+?`
      {1,} -> {1} // greedy -> lazy


