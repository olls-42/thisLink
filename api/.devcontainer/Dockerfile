# .devcontainer/Dockerfile
FROM mcr.microsoft.com/devcontainers/php:dev-7.4
# Install the xz-utils package as an example
RUN cat <<EOF > /etc/apt/apt.conf.d/99-custom-sources
APT::AllowInsecureRepositories "true";
Acquire::AllowInsecureRepositories "true";
EOF

RUN apt-get update && apt-get install -y xz-utils
