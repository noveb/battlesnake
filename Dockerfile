FROM node:16-alpine as base
WORKDIR /app
RUN chown -R node:node ./

FROM base as devDependencies
RUN wget -O /wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x /wait-for-it.sh
ENV NODE_ENV=development
COPY --chown=node:node package.json package-lock.json ./
RUN npm ci

FROM base as local
RUN apk add --no-cache tini
COPY --from=devDependencies --chown=node:node /app/node_modules ./node_modules
COPY --from=devDependencies /wait-for-it.sh /wait-for-it.sh
COPY --chown=node:node src ./src

USER node

CMD [ "npm", "run", "debug:docker" ]
ENTRYPOINT ["/sbin/tini", "--"]
HEALTHCHECK --interval=10s --timeout=1s CMD node ./src/bin/healthCheck.js