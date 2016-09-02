FROM node:5.10.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

ARG registry=https://registry.npmjs.org/

RUN npm set progress=false
RUN npm --registry=$registry install -g cwebp-bin
RUN npm --registry=$registry install
RUN npm --registry=$registry rebuild

RUN npm run webpackbuild

RUN cp /usr/local/lib/node_modules/cwebp-bin/vendor/cwebp /usr/src/app/node_modules/webp-bin/vendor/linux/

EXPOSE 80 3100 3200
CMD ["npm", "run", "static"]
