FROM node:22

RUN mkdir -p /opt/app

ADD . /opt/app/

WORKDIR /opt/app

RUN pwd;

RUN ls;

RUN npm i --saveDev

