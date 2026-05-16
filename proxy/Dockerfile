FROM node:20-alpine

WORKDIR /app

COPY package*.json /app/
RUN npm install

COPY *.js /app/
COPY src/ /app/

EXPOSE 3000

CMD ["npm", "start"]
