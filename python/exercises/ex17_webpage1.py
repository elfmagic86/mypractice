#################################
# tutorial: http://www.practicepython.org
#################################

# 웹페이지 파싱
import requests
from bs4 import BeautifulSoup

# doc보는방법
# print(requests.__doc__)
# print(BeautifulSoup.__doc__)
# help(requests.get)


base_url = 'http://www.nytimes.com'
r = requests.get(base_url)
soup = BeautifulSoup(r.text, "lxml")

for story_heading in soup.find_all(class_ = "story-heading"):
    if story_heading.a:
        # str = story_heading.a.text.replace("\n", " ").strip()
        print('')
    else:
        print('')
        # print(story_heading.contents[0].strip())

with open("test.txt", "w") as textfile:
    textfile.write("어떤값")


# soup사용법..추가분정도
# 이런 css 셀렉터도가능하고.
# all_p_cn_text_body = soup.select("div.parbase.cn_text > div.body > p")
