FROM python:3.6-stretch

WORKDIR /usr/src/app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY uwsgi.ini .
COPY app.py .

EXPOSE 5000

CMD ["uwsgi", "uwsgi.ini"]