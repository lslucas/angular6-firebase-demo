# you could use node:latest, but it's not recomended. Prefer using the lastest version number
# -alpine has a smaller size
FROM node:9-alpine as builder

# Copying packags to WORKDIR
COPY package.json package-lock.json ./

# install chrome for protractor tests. Not needing on this project but keep it here if you need later
#RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
#RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
#RUN apt-get update && apt-get install -yq google-chrome-stable

# Cleaning house
RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

# Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /www && cp -R ./node_modules /www

# Set our workdir
WORKDIR /www

# Coping all local files to WORKDIR
COPY . .

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /www/node_modules/.bin:$PATH

# Choose one of bellow, serve or build. I use serve for developing

# Serve
CMD ng serve --host 0.0.0.0

# Build the angular app in production mode and store the artifacts in dist folder
#RUN $(npm bin)/ng build
