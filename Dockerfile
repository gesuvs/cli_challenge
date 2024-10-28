FROM node:20.18.0

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y \
  nano \
  vim 

RUN yarn global add nodemon

COPY . .

RUN useradd -m dev

USER dev

CMD [ "node", "src/cli.ts" ]
