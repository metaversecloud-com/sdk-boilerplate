FROM --platform=linux/arm64 node:18-alpine3.17
WORKDIR /app
ADD server ./server
ADD client .client
COPY package.json .
EXPOSE 3000
RUN npm run build
CMD ["npm", "start"]
