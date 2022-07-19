FROM node:14.17.6

# Create app directory
WORKDIR /usr/src/app  

# Bundle app source
COPY . .

COPY package.json /usr/src/app

# npm install
RUN  npm install
# Run npm install --global grpc --unsafe-perm

EXPOSE 3003

CMD [ "npm", "run", "start" ]