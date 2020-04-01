.PHONY: setup
setup:
	python -m venv env
	env/bin/pip3 install -r requirements.txt

.PHONY: clean
clean:
	docker stop backend && docker rm -f backend && docker rmi -f backend_img

.PHONY: build
build:
	docker build . -t backend_img

.PHONY: run
run:
	docker run -p 8000:8000 --name backend backend_img