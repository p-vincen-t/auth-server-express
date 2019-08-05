FROM node:8.10.0-slim
RUN mkdir -p /apps/rest/nesst/auth
WORKDIR /apps/rest/nesst/auth
COPY . /apps/rest/nesst/auth
# RUN rm -rf /apps/rest/f4b/auth/node_modules
RUN npm install && npm run build
EXPOSE 5001

# COPY docker-entrypoint.sh /usr/local/bin/

# ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]