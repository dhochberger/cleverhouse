FROM docker:latest
RUN apk update && apk --no-cache add python py-pip python-dev
RUN apk --no-cache add --virtual build-dependencies libffi-dev openssl-dev build-base \
&& pip install --upgrade pip \
&& pip install docker-compose \
&& apk del build-dependencies
