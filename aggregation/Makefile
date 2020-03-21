.PHONY: docker-run
docker-run:
	docker build . -t aggregate && docker run -p 5000:5000 --name aggregate aggregate

.PHONY: clean
clean:
    docker stop aggregate
    docker rm -f aggregate
    docker rmi aggregate
