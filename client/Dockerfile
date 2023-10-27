FROM node:18

WORKDIR /app

COPY client/package*.json ./

RUN npm install

COPY ./client/ ./

RUN npm run build

FROM nginx:stable

COPY --from=0 /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
