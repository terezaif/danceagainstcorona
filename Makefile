
.PHONY: setup
setup:
	python -m venv env
	env/bin/pip3 install -r requirements.txt