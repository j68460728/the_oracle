FROM node:22-alpine

WORKDIR /app

# The node_modules and code will be mounted from the host in development via docker-compose.
# This Dockerfile provides the environment for npm run dev.

EXPOSE 3000

CMD sh -c "npm install && npm run dev"
