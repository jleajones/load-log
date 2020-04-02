FROM node:erbium-alpine

# Install git so editor git commands work
RUN apk --no-cache add git

RUN mkdir -p /www
WORKDIR /www

COPY --chown=1000:1000 . .
RUN npm install
RUN npm build

EXPOSE 3000
EXPOSE 5432

USER 1000

CMD ["npm", "start"]
