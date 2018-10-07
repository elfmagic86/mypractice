# https://github.com/kolorobot/spring-mvc-quickstart-archetype

# 선행작업
# git clone https://github.com/kolorobot/spring-mvc-quickstart-archetype.git
# cd spring-mvc-quickstart-archetype
# mvn clean install
# rm -rf spring-mvc-quickstart-archetype

# 생성
mvn archetype:generate \
	-DarchetypeGroupId=pl.codeleak \
	-DarchetypeArtifactId=spring-mvc-quickstart \
	-DarchetypeVersion=5.0.0 \
	-DarchetypeRepository=http://kolorobot.github.io/spring-mvc-quickstart-archetype \
	-DgroupId=temp_quick \
	-DartifactId=temp_quick \
	-Dversion=0.0.1


# 실행(http://localhost:8080)
# mvn tomcat7:run
