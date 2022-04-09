# Based on https://github.com/klokantech/tippecanoe-docker

FROM python:3-buster

# Update repos and install dependencies
RUN apt-get update \
  && apt-get -y upgrade \
  && apt-get -y install git build-essential libsqlite3-dev zlib1g-dev libgeos-c1v5

# Create a directory and copy in all files
RUN mkdir -p /tmp/tippecanoe-src
RUN git clone https://github.com/mapbox/tippecanoe.git /tmp/tippecanoe-src
WORKDIR /tmp/tippecanoe-src

# Build tippecanoe
RUN make \
  && make install

# Remove the temp directory and unneeded packages
WORKDIR /
RUN rm -rf /tmp/tippecanoe-src \
  && apt-get -y remove --purge build-essential && apt-get -y autoremove

# Run the default command to show usage
#CMD tippecanoe --help

COPY requirements.txt /requirements.txt
RUN pip install -r /requirements.txt
