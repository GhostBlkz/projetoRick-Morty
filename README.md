## Configuração Back End

# npx @aka-demy/create-express-app
Perguntas que o comando faz:
*Give a name for the app: back-end
*Language: JavaScript
*Template: none
*package manager: npm

# Instalar Prisma
npm install prisma --save-dev

# Iniciar Prisma
npx prisma init --datasource-provider postgresql

# Fazer Migration
npx prisma migrate dev --name create-user

# Instalando bcrypt, jsonwebtoken e axios
npm install bcrypt
npm install jsonwebtoken
npm install axios

para criptografar a senha, criar o token e fazer as requisiçoes CRUD


