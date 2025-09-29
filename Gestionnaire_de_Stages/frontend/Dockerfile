FROM node:18

WORKDIR /app

 # installer dépendances (caché tant que package.json ne change pas)
COPY package*.json ./
RUN npm install

#copier le reste du code
COPY . .

# Lancer React en mode dev (hot reload)
CMD ["npm", "start"]
