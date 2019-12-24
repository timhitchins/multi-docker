FROM node:alpine
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . . 
##the only diff from .dev
CMD ["npm", "run", "start"]