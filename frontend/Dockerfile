# use the node image
FROM node:18-alpine

# working directory
WORKDIR /app

# use the package file
COPY package*.json ./

# install it
RUN npm install

# all the file copy
COPY . .

# build it
RUN npm run build

# Nginx serve 
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]