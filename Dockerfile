# Etapa 1: Build da aplicação
FROM node:18-alpine AS builder

# Definir o diretório de trabalho
WORKDIR /usr/src/app

# Copiar package.json e package-lock.json (se existir)
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar todo o código fonte
COPY . .

# Compilar o TypeScript
RUN npm run build

# Etapa 2: Imagem final
FROM node:18-alpine

# Instalar cliente MySQL para testar conexões MySQL (opcional)
RUN apk add --no-cache mysql-client

# Definir o diretório de trabalho
WORKDIR /usr/src/app

# Copiar as dependências e o código compilado da etapa de build
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

# Expor a porta
EXPOSE 3000

# Definir o comando de inicialização
CMD ["node", "dist/index.js"]
