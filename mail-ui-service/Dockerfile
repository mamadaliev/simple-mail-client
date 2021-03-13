FROM node:lts-alpine
RUN npm install -g http-server
WORKDIR /app
COPY . .
RUN yarn install --production
RUN yarn build --production
CMD ["http-server", "build", "-p", "3000"]
