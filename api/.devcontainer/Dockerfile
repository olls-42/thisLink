# .devcontainer/Dockerfile
FROM mcr.microsoft.com/devcontainers/php:8.1
    # Install the xz-utils package as an example
RUN cat <<EOF > /etc/apt/apt.conf.d/99-custom-sources
APT::AllowInsecureRepositories "true";
Acquire::AllowInsecureRepositories "true";
EOF

RUN apt-get update && apt-get install -y xz-utils libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql pgsql