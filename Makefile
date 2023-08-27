.PHONY up build tunnel:

up:
	npm run dev

build:
	npm run build

# Expose local server to global network
tunnel:
	ssh -R assaner-front:80:localhost:5173 serveo.net