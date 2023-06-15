FROM postgres:13.2

RUN apt update
# https://stackoverflow.com/questions/65821330/error-failed-building-wheel-for-psycopg2-ubuntu-20-04-python-3-8-5-venv
RUN apt install libpq-dev -y
RUN apt install python3.7-dev -y
RUN apt install python3-pip -y
RUN pip3 install psycopg2

COPY init.sql /docker-entrypoint-initdb.d/init.sql
COPY initTest.sql /docker-entrypoint-initdb.d/initTest.sql
COPY test.py /docker-entrypoint-initdb.d/test.py
ADD pg_hba.conf /var/lib/postgresql/data/pgdata/pg_hba.conf
