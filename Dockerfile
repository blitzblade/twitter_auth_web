# pull official base image
FROM node:18.3-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json /app
COPY package-lock.json /app
RUN npm install


# add app
COPY src /app/
COPY public /app/
COPY .env /app/

# start app
CMD ["npm", "start"]