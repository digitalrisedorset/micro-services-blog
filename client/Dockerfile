FROM node:alpine

#RUN npm install -g npm@10.8.1
WORKDIR /app
COPY package.json ./
RUN npm install 
COPY ./ ./

CMD ["npm", "start"]
