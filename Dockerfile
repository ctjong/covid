FROM node:lts

RUN mkdir /code
WORKDIR /code
RUN pwd

ADD public ./public
ADD src ./src
ADD package.json ./
ADD yarn.lock ./
ADD tsconfig.json ./
RUN yarn
RUN yarn build
RUN rm -rf node_modules package.json yarn.lock

RUN ls

CMD ["yarn", "start"]
EXPOSE 1337
