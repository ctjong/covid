FROM node:lts

RUN mkdir /code
WORKDIR /code
RUN pwd

ADD public ./public
ADD src ./src
ADD package.json ./
ADD yarn.lock ./
ADD tsconfig.json ./
ADD index.php ./
RUN yarn
RUN yarn build
RUN rm -rf node_modules package.json yarn.lock

RUN ls

EXPOSE 80
