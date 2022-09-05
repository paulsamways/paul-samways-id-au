FROM node as build-styles
WORKDIR /build

COPY ./src ./src
RUN cd ./src/Styles && \
        npm install && \
        ./build.sh

FROM node as build-scripts
WORKDIR /build

COPY ./src/Scripts ./src/Scripts
RUN cd ./src/Scripts && \
        npm install && \
        ./build.sh

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-site
WORKDIR /build

COPY ./src/Site ./src/Site
COPY --from=build-styles /build/src/Site/PaulSamways/wwwroot/css/site.css ./src/Site/PaulSamways/wwwroot/css/site.css
COPY --from=build-scripts /build/src/Site/PaulSamways/wwwroot/js ./src/Site/PaulSamways/wwwroot/js

RUN ./src/Site/build.sh


FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app

VOLUME ["/root/.aspnet/DataProtection-Keys"]

RUN apt update && \
    apt install -y locales && \
    apt-get clean

RUN localedef -i en_AU -f UTF-8 en_AU.UTF-8 && \
    sed -i '/en_AU/s/^# //g' /etc/locale.gen && \
    locale-gen && \
    ln -f -s /usr/share/zoneinfo/Australia/Canberra /etc/localtime

ENV LANG en_AU.UTF-8
ENV LANGUAGE en_AU:en

COPY --from=build-site /build/dist ./

ENTRYPOINT ["dotnet", "PaulSamways.dll"]