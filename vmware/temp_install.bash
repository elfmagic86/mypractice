
# basic
sudo apt-get -y install software-properties-common


#  vim
sudo apt -y install vim

# sshd
sudo apt -y install openssh-server

# java

sudo add-apt-repository ppa:webupd8team/java
sudo apt update
sudo apt -y install oracle-java8-installer

# elastic
es_root=~/es-5.4.3
mkdir -p $es_root


cd $es_root
if [ ! -d './elasticsearch-5.4.3' ]; then
    wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.4.3.tar.gz
    sha1sum elasticsearch-5.4.3.tar.gz
    tar -xzf elasticsearch-5.4.3.tar.gz
fi
