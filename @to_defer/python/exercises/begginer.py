#################################
# tutorial: http://www.practicepython.org
#################################

def runner():
    # print('__name__ : ', __name__)
    # print("__name__의 이름이 main이면, 모듈이 아닌 직접실행된것")
    print('runner')
    # closure_test() 
    # ex17()
    

#################################
# 역순 ex들..
#################################


# 패스워드 생성. 중복없음. 특정길이, 랜덤섞기
def ex16():
    # 이렇게 함수 내부호출되 가능. 그런데 바른방법인지는모르겠다.
    import random
    import string

    def pw_gen(size = 8, chars = string.ascii_letters + string.digits + string.punctuation):
        return ''.join(random.choice(chars) for _ in range(size))
    s = "abcdefghijklmnopqrstuvwxyz01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()?"
    # 위의 s값과 비슷한..문자열....
    print(string.ascii_letters + string.digits + string.punctuation)

    print("".join(random.sample(s, 8)))
    print(pw_gen(10))


# 공백으로 구분된 word 역순정렬
def ex15():
    def v1(xs):
        # 디폴트가 공백구분..
        tmp = xs.split()
        print(tmp)
        # 역순정렬
        tmp = tmp[::-1]
        print(tmp)
        # 다시 공백으로 합치기.
        tmp = ' '.join(tmp)
        return tmp

    def v2(xs):
        ys = []
        for x in xs.split():
            ys.insert(0, x)
        return ' '.join(ys)
        
    
    word = "a b cdef g,w"
    # print(v1(word))
    print(v2(word))




# 리스트에대해 중복제거해서 반환
def ex14():
    # xs: x에대한 sequence
    def v1(xs):
       ys = []
       for x in xs:
           if x not in ys:
               ys.append(x)
       return ys

    def v2(xs):
        # 오름차순 정렬도해주네.?
        return list(set(xs))

    a = [1,5,2,3,4,3,2,1]
    print(v1(a))
    print(v2(a))


# fibonacci
def ex13():
    # TODO 꼬리재귀최적화에대해 알아봐야..
    def fib_tail(num):
        list = []  # list를 go직전으로 옮겨도 정상동작하네.
        def go(n, prev, cur):
            if n <= 0: return []
            if n == 1:
                return list
            else:
                list.append(cur)
                return go(n - 1, cur, prev + cur)
            
        list.append(1)
        return go(num, 1, 1)
    
    # 꼬리재귀..형태를 아래처럼 고칠수있음.
    # http://stackoverflow.com/questions/13591970/does-python-optimize-tail-recursion
    #   링크의, 댓글들보다보면 뭔가 대단한..것들이나오는데 자세히안봄.
    def fib(num):
        prev = 1
        cur = 1
        list = [prev]
        while True:
            if num <= 0: return []
            if num == 1: return list
            
            list.append(cur)
            num, prev, cur = num - 1, cur, cur + prev
        
    num = int(input("num of fib: "))
    # print(fib_tail(num))
    print(fib(num))


# closure
def closure_test():
    def o_f():
        list = [0]
        msg = "origin msg"
        print(list)
        print('o before', msg)
        def i_f():
            nonlocal msg
            print('i before', msg)
            msg = "after msg"
            list[0] = 1
            print('i after', msg)
        i_f()
        print('o after', msg)
        print(list)
    o_f()

def ex7():
    a = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
    # 술어함수 이런형태로. 반환하는거 이름이뭐였지.
    def ret(arg): return arg
    
    # a를 짝수(even)만, 뽑기.
    # list comprehension 
    b = [ret(num) for num in a if num % 2 == 0 ]
    # num자리 함수호출이되네. 그것이 반환한것이 쌓이고
    # b = [print(num) for num in a if num % 2 == 0 ]
    print(b)

    
def ex6():
    def reverse(word):
        ret = ''
        last_i = len(word) - 1
        for i in range(last_i + 1):
            print(i)
            ret += word[last_i - i]
        return ret
    
    word=str(input("word: "))
    print(word, word[::-1])
    print(word, reverse(word))
    

def ex5():
    # list내부에 타입상관없고, in으로 include테스트
    list = [1, "안녕"]
    print(1 in list)
    print("안녕" in list)
    print("녕" in list)


def ex4():
    __author__ = "뭔의미"
    targetNum = int(input("targetNum: "))
    listRange = list(range(1, targetNum+1))
    divisorList = []

    for aNum in listRange:
        if targetNum % aNum == 0:
            divisorList.append(aNum)

    print(divisorList)


def ex3():
    a = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
    num = int(input("Choose a num: "))
    new_list = []

    for i in a:
        if i < num:
            new_list.append(i)

    print( new_list )



def ex2():
    # 명시적으로 타입변환필요함
    num = int(input("num: "))
    mod = num % 2

    if mod == 0:
        print(num, " is even")
    else:
        print(num, " is odd")


def ex1():
    # 변수 선언시 var같은것필요없네.
    name = input("name: ")
    age = int(input("age: "))
    year = str((2014 - age) + 100)

    print(name + 'will be 100 years old in the year ' + year)

#################################
# 순차적으로 선언되기에 함수 선언후 실행가능
#################################
runner()
