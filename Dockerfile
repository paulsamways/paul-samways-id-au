FROM node as build-css
WORKDIR /build

COPY ./src ./src
COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./tailwind.config.js ./

RUN npm install && \
    NODE_ENV=production npx tailwindcss -i ./src/wwwroot/css/_site.css -o ./src/wwwroot/css/site.css -c ./tailwind.config.js --minify

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-dotnet
WORKDIR /build

# copy csproj and restore as distinct layers
COPY ./src/*.csproj ./

RUN dotnet restore 

# copy everything else and build app
COPY ./src/. ./
COPY --from=build-css /build/src/wwwroot/css/site.css ./wwwroot/css/site.css

RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime
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

COPY --from=build-dotnet /build/out ./

ENTRYPOINT ["dotnet", "paul-samways-id-au.dll"]