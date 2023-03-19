FROM node:alpine as base
# Set the /app directory as working directory
WORKDIR /app
# Install ganache-cli globally
RUN npm install -g ganache-cli
# Set the default command for the image
CMD ["ganache-cli", "-h", "0.0.0.0", "--deterministic", "--mnemonic", "'sobtain exist diagram lunar produce reflect melt clown grain seek romance retire'"]
