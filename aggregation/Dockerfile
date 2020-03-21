FROM python:3.6-stretch

WORKDIR /usr/src/app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY uwsgi.ini .
COPY app.py .

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]