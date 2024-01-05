FROM ubuntu:18.04  
RUN mkdir /opt/app
COPY ["./dist", "/opt/app"]
WORKDIR "/opt/app/codegen-toolbox"
CMD ["/bin/sh","-c","echo 'Loading...' "]
