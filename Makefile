.PHONY up:
up:
	npm run dev

.PHONY build:
build:
	npm run build

# Expose local server to global network
.PHONY tunnel:
tunnel:
	ssh -R assaner-front:80:localhost:5173 serveo.net