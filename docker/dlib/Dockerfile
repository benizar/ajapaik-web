FROM python:3.6

MAINTAINER Lauri Elias <lauri@ajapaik.ee>

RUN apt-get update && \
    apt-get install -y cmake build-essential gfortran git wget curl graphicsmagick \
    libgraphicsmagick1-dev libatlas-base-dev libavcodec-dev libavformat-dev libgtk2.0-dev libjpeg-dev liblapack-dev \
    libswscale-dev pkg-config python3-dev python3-numpy software-properties-common zip

RUN pip3 install --upgrade pip && pip3 install dlib
