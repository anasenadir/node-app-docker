FROM node:latest as base

# ==============================================

From base as production
WORKDIR /app
COPY package.json .
# Install the dependencies
RUN npm install --only=production
COPY . .
EXPOSE 4000
CMD [ "npm", "start" ]

# ==============================================

From base as development
WORKDIR /app
COPY package.json .
# Install the dependencies
RUN npm install
RUN npm install -g nodemon
# ADD /src /app/src
COPY . .
EXPOSE 4000
# Start the server
CMD [ "npm", "run", "start-dev" ]