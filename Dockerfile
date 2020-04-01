FROM python:3.7

WORKDIR /usr/src/app

COPY fast_requirements.txt .
RUN pip install --no-cache-dir -r fast_requirements.txt

COPY main.py .

EXPOSE 5000

CMD ["uvicorn", "main:app"]