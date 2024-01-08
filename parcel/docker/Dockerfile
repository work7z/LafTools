FROM ubuntu:18.04  
RUN mkdir /opt/app
COPY ["./linux.tar.gz", "/opt/app"]
COPY ["./bootstrap.sh","/opt/app"]
WORKDIR "/opt/app"
CMD ["/opt/app/bootstrap.sh"]
