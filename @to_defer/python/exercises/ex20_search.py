


# 단순한 순차탐색버전
def find_v1(ordered_list, element_to_find):
    for el in ordered_list:
        if el == element_to_find:
            return True
    return False

def find_v2(ordered_list, el_to_find):
    start_i = 0
    last_i = len(ordered_list) - 1

    count = 0
    while True:
        if count == 10: return 0
        count += 1

        mid_i = int((start_i + last_i) / 2)
        # print(start_i, mid_i, last_i)

        if mid_i < 0 or mid_i < start_i or mid_i > last_i: return False
        mid_el = ordered_list[mid_i]

        if el_to_find == mid_el: return True
        elif el_to_find < mid_el:
            last_i = mid_i - 1
        else:
            start_i = mid_i + 1

def find_v3(ol, value, low = 0, high = 0):
    if low > high: return False

    mid = int((low + high) / 2)
    # mid = int(low + high)
    # print('mid', mid)
    mid_value = ol[mid]

    if mid_value == value: return True
    elif mid_value < value:
        return find_v3(ol, value, mid + 1, high)
    else:
        return find_v3(ol, value, low, mid - 1)

if __name__ == "__main__":
    def runner(func):
        # 정렬이 되어있다는 가정하에 성립하는 탐색, 반으로 쪼개서..범위탐색하는거.
        l = [2, 4, 6, 8, 10]
        if func.__name__ == 'find_v3':
            # false
            print(func(l, 5, 0, len(l) - 1))
            print(func(l, -1, 0, len(l) - 1))
            # true
            print(func(l, 2, 0, len(l) - 1))
            print(func(l, 10, 0, len(l) - 1))
        else:
            print(func(l, 5))
            print(func(l, -1))
            # true
            print(func(l, 2))
            print(func(l, 10))

    # print(int(1.1), int(1.5), int(1.9))
    # print(round(1.1), round(1.5), round(1.9))
    # runner(find_v1)
    # runner(find_v2)
    runner(find_v3)
