FROM node:16-alpine

WORKDIR /app

ADD package.json package-lock.json ./

RUN npm install --force

COPY ./ .

ENV NODE_ENV=production
ENV DATABASE_HOST=docker.for.mac.host.internal
ENV DATABASE_PORT=3306
ENV DATABASE_USERNAME=root
ENV DATABASE_PASSWORD=
ENV DATABASE_NAME=nestjs-test
ENV JWT_SECRET_KEY=sjfbsdfvjsbnxjwkshalfbshmnksjdmzxfbnsdjhzx

CMD ["npm", "run" ,"start"]
