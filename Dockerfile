FROM node:21-alpine AS development
ENV NODE_ENV development
 
WORKDIR /frontend
COPY package.json /frontend/
COPY public/ /frontend/public
COPY src/ /frontend/src
RUN npm install
EXPOSE 3000
CMD [ "npm","start" ]