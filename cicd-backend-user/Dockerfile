FROM node:16-alpine
ADD . /dist
WORKDIR /dist
EXPOSE 8091
CMD ["npm", "run", "start:prod"]