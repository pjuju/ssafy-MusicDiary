FROM python:3.7.0
WORKDIR /var/jenkins_home/workspace/deploy/backend
COPY requirements.txt ./

RUN pip install --upgrade pip
RUN pip install -r requirements.txt
COPY . .
CMD ["gunicorn", "testproject.wsgi", "--bind", "0.0.0.0:8080"]