FROM node:18-alpine as base

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

FROM base as development
EXPOSE 3000
CMD ["npm", "start"]

FROM base as production
RUN npm run build

FROM nginx:alpine as production-final
COPY --from=production /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]