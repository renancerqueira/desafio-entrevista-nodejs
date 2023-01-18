
FROM node:alpine
 
WORKDIR /user/src/app
 
COPY . .
 
RUN npm i
 
RUN npm run build
 
USER node
 
CMD ["npm", "run", "start:prod"]