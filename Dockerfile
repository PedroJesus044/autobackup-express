FROM ubi9/nodejs-18
ADD backend-controladora-js .
RUN npm install
ENV NODE_ENV=production
#Cors options
ENV EXPRESS_CORS_OPTIONS=*
ENV ABKP_DB_HOST=mariadbabkp
ENV ABKP_DB_USER=mariadb
ENV ABKP_DB_PASS=mariadb
ENV ABKP_DB_NAME=mariadb
ENV TZ=America/Mexico_City
CMD ["node", "server.js"]