FROM node:latest

WORKDIR /app

COPY package.json .
# Install the dependencies
RUN npm install

RUN npm install -g nodemon
# ADD /src /app/src

COPY . .

EXPOSE 4000

# Start the server
# CMD ["nodemon", "--watch", ".", "--legacy-watch", "src/index.js"]
CMD [ "npm", "run", "start-dev" ]