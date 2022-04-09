import os.path

import geojson
import overpass

REGION = "3600088079"

SURFACES = {
    "grass": ["grass"],
    "ground": ["ground", "dirt", "compacted", "mud", "rock", "earth"],
    "sand": ["sand"],
    "gravel": ["gravel"]
}


def build_query(region, surfaces):
    surface_queries = ""
    for q in surfaces:
        surface_queries = surface_queries + "way[surface=%s](area.searchArea);>;" % q
    base_query = "area(id:%s)->.searchArea;(%s);" % (region, surface_queries)
    print(base_query)
    return base_query


def download(query, name):
    filename = '%s.geojson' % name
    if os.path.exists(filename):
        print("%s already exists" % filename)
        return

    api = overpass.API(timeout=500)
    res = api.get(query, verbosity='geom')
    with open(filename, mode="w") as f:
        geojson.dump(res, f)


if __name__ == '__main__':
    for s in SURFACES:
        query_string = build_query(REGION, SURFACES[s])
        download(query_string, s)
