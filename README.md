# Surface Map

> render a map of surface types from Open Street Map data

![screenshot.png](screenshot.png)
## Usage

1. `make image` to build a Docker image with all the dependencies required
2. `make download` to download and build geojson data from Overpass
3. `make tiles` to turn the geojson data into protobuf tiles
4. `make serve` to serve a map on http://localhost:8080

## Scaling

On my laptop, it takes around 10 minutes to download the whole of England, a further 8 minutes to render the tiles. The resulting geojson totals 641Mb and the tiles total 246Mb. This amount of data starts making Firefox somewhat slow to respond.

To scale this up further, we could build the infrastructure required to stream changes from Open Street Map and dynamically render tiles on request. This is currently out of scope, but given funding is possible.

## Development

The area and types of surface we download are defined at the top of download.py. The default `REGION` is [West Yorkshire](https://www.openstreetmap.org/relation/88079). Each key in `SURFACES` becomes a separate geojson file, which becomes a separate vector_layer.

Each layer needs a style adding to `vectorStyles` in public_html/site.js

## Improving Coverage

Open Street Map coverage of [surface types](https://wiki.openstreetmap.org/wiki/Key:surface) isn't great in most places. You can help extend this, and the easiest way of doing so is by using [StreetComplete](https://wiki.openstreetmap.org/wiki/StreetComplete) while out and about. You can make questions about surface types higher priority in the settings.

## License

Copyright © 2022 wheresalice

This work is free. You can redistribute it and/or modify it under the  terms of the Do What The Fuck You Want To Public License, Version 2,  as published by Sam Hocevar. See the COPYING file for more details.
