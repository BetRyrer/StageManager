# Utiliser Node.js
FROM node:18

# Dossier de travail
WORKDIR /app

# Copier les fichiers package.json et installer dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du code
COPY . .

# Exposer le port React
EXPOSE 3000

# Lancer le serveur React
CMD ["npm", "start"]
