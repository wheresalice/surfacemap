.PHONY: image
image:
	docker build -t surfacemap .

.PHONY: download
download:
	docker run -v `pwd`:/tmp/surfacemap -w /tmp/surfacemap surfacemap:latest python download.py

.PHONY: tiles
tiles:
	docker run -v `pwd`:/tmp/surfacemap -w /tmp/surfacemap surfacemap:latest tippecanoe -zg -e public_html/tiles --drop-densest-as-needed --extend-zooms-if-still-dropping *.geojson --force --no-tile-compression

.PHONY: serve
serve:
	docker run -v `pwd`/public_html:/usr/share/caddy -p 8080:80 caddy

# We do this in docker because it might use a different user to the host user
.PHONY: clean
clean:
	docker run -v `pwd`:/tmp/surfacemap surfacemap:latest rm -Rf /tmp/surfacemap/public_html/tiles /tmp/surfacemap/*.geojson
