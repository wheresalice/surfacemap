.PHONY: image
image:
	docker build -t surfacemap .

.PHONY: download
download:
	docker run -v `pwd`:/tmp/surfacemap -w /tmp/surfacemap surfacemap:latest python download.py

.PHONY: tiles
tiles:
	docker run -v `pwd`:/tmp/surfacemap -w /tmp/surfacemap surfacemap:latest tippecanoe -zg -e public_html/tiles --drop-densest-as-needed --extend-zooms-if-still-dropping *.geojson --force --no-tile-compression

serve:
	docker run -v `pwd`/public_html:/usr/share/caddy -p 8080:80 caddy

