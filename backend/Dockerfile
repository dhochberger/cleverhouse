FROM node:14
RUN mkdir -p /app
WORKDIR /app

COPY package.json .
RUN npm install -g nodemon babel-cli
RUN npm install

COPY . .

EXPOSE 3000
CMD bash -c "node app.js"
