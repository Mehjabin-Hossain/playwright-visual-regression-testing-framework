FROM mcr.microsoft.com/playwright:v1.59.1-noble

WORKDIR /work

COPY package*.json ./
RUN npm ci

COPY . .

CMD ["npm", "run", "ci"]
