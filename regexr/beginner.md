# regex

- https://msdn.microsoft.com/en-us/library/ae5bf541(v=vs.100).aspx
- http://regexr.com
- https://github.com/ziishaned/learn-regex#21-full-stop

- https://regex101.com/


## 기본

- `.`
Matches any single character except the newline character \n. To match any character including the \n, use a pattern like [\s\S]

- `[]`
  [1-4] matches "1", "2", "3", or "4". [^aAeEiIoOuU] matches any non-vowel character
  [a0-9\s]는 a OR (0 OR 1 OR ...OR 9) OR (any whitespace character)

- `[^]`
  logical not, [^abc] matches any character except a, b, and c.

- `^`
  ^\d{3} matches 3 numeric digits at the start of the searched string.

- `()`
  서브 표현식
  Marks the start and end of a subexpression. Subexpressions can be saved for **later use** A(\d) matches "A0" to "A9". The digit is saved for later use.

- `|` alternative(대안, 대체가능한것)
  OR로 사용됨
  ex) https://regex101.com/r/fBXyX0/1

- `*, +` greedy, `?`는 lazy.
  https://stackoverflow.com/questions/2301285/what-do-lazy-and-greedy-mean-in-the-context-of-regular-expressions
  > Greedy means match longest possible string.
  Lazy means match shortest possible string.
  For example, the greedy h.+l matches 'hell' in 'hello' but the lazy h.+?l matches 'hel'.

  - `*?`
    {0,} // greedy -> lazy

  - `+?`
    {1,} // greedy -> lazy


## 수량한정자: ***직전 문자***, 직전 표현에 대해 일치하는 갯수를 판별
- `{}`
  Marks the start and end of a quantifier expression. a{2,3} matches "aa" and "aaa".

- `*`
  {0,}

- `+`
 {1,}

- `?`
 {0,1}, non-greedy

## 3. Shorthand Character Sets(https://github.com/ziishaned/learn-regex#3-shorthand-character-sets)
\s같은 것을 의미하고 NOT 표현으로 대문자 \S표기가 사용됨

- \s    "any whitespace character". This includes spaces, tabs, and newlines.
- \w


## TODO Lookaround https://github.com/ziishaned/learn-regex#4-lookaround
  `찾는것` 중 근처(앞/뒤)에 무언가 있는/없는 것으로 범위 좁히는 용도, `찾는것`에 포함되지 않음
```
?= 	Positive Lookahead
?! 	Negative Lookahead
?<= 	Positive Lookbehind
?<! 	Negative Lookbehind
```
  - TODO word boundary
  lookbehind 축약
  `\b`

## flag
i 	대소 구분없이
g 	입력문자열 전체 대상
m 	Multiline: Anchor meta character works on each line.

## TODO BRE, ERE

