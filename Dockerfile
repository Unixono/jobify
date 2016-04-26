FROM docker/whalesay:latest
RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections
RUN apt-get -y update && apt-get install -y fortunes
CMD /user/games/fortune -a | cowsay

