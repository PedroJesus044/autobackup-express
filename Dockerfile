FROM ubi9/nodejs-18
ADD backend-controladora-js .

ENV NODE_ENV=production
ENV EXPRESS_CORS_OPTIONS=*
ENV ABKP_DB_HOST=mariadbabkp
ENV ABKP_DB_USER=mariadb
ENV ABKP_DB_PASS=mariadb
ENV ABKP_DB_NAME=mariadb
ENV TZ=America/Mexico_City

RUN npm install
CMD ["node", "server.js"]