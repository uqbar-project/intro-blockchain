FROM node:18-bullseye-slim as base

ENV TRUFFLE_FOLDER=./truffle

RUN apt-get update && \
    apt-get install --no-install-recommends -y \
        build-essential \
        python3 && \
    rm -fr /var/lib/apt/lists/* && \
    rm -rf /etc/apt/sources.list.d/*

RUN npm install --global --quiet npm truffle ganache

FROM base as truffle

RUN mkdir -p /home/app
WORKDIR /home/app

COPY $TRUFFLE_FOLDER/truffle-config.js /home/app
COPY $TRUFFLE_FOLDER/contracts /home/app/contracts
COPY $TRUFFLE_FOLDER/migrations /home/app/migrations
COPY $TRUFFLE_FOLDER/test /home/app/test

CMD ["truffle", "version"]

FROM base as ganache

RUN mkdir -p /home
WORKDIR /home
EXPOSE 8545

ENTRYPOINT ["ganache", "--host 0.0.0.0"]
