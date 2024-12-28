# Weapon Paints website

Website used for the **[cs2-WeaponPaints](https://github.com/Nereziel/cs2-WeaponPaints/)** plugin

<div>
    <img src="https://github.com/L1teD/cs2-WeaponPaints-website/blob/main/previews/1.png?raw=true" width="400">
    <img src="https://github.com/L1teD/cs2-WeaponPaints-website/blob/main/previews/2.png?raw=true" width="400">
    <img src="https://github.com/L1teD/cs2-WeaponPaints-website/blob/main/previews/3.png?raw=true" width="400">
    <img src="https://github.com/L1teD/cs2-WeaponPaints-website/blob/main/previews/4.png?raw=true" width="400">
    <img src="https://github.com/L1teD/cs2-WeaponPaints-website/blob/main/previews/5.png?raw=true" width="400">
    <img src="https://github.com/L1teD/cs2-WeaponPaints-website/blob/main/previews/6.png?raw=true" width="400">
</div>

Screenshots taken from private version

#### Preview

-   Public: (not available atm)
-   Private: https://private-sc.l1te.pw/

## If you want to use private, check this

-   **[See PRIVATE.md](https://github.com/L1teD/cs2-WeaponPaints-website/blob/main/PRIVATE.md)**

# Installation

Requirements:

-   [Git](https://git-scm.com/)
-   [Node.JS](https://nodejs.org/es/download) (LTS)
-   [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/)
-   [WeaponPaints](https://github.com/Nereziel/cs2-WeaponPaints) already installed and configured

## Deployment with docker compose

### Initial setup

```bash
# clone the main branch of the repo
git clone https://github.com/L1teD/cs2-WeaponPaints-website
cd cs2-WeaponPaints-website
```

### Configure your environment file

1. _Copy the example environment file_

```bash
cp .example.env .env
```

2. _[Create a Steam API key](https://steamcommunity.com/dev/apikey)_

> [!NOTE]
> When creating your Steam API key make sure the domain is the same as the one you define in the `WEBSITE_HOST` variable

```bash
...
# secrets
STEAM_API_KEY=""
```

3. Create your `SESSION_SECRET`

You can use the following command to generate a random string its highly encouraged to use a 32 char long string:

```bash
openssl rand -base64 32
# OR
head -c 32 /dev/urandom | base64
```

```bash
SESSION_SECRET="58WnkTvOOu0F0ddSIbFScyNtnVNasFkJt8IlZ8JrBS4=
```

### Deployment

First we need to create the certificate for nginx, we do it running the following command `docker compose run --rm --service-ports certbot`, this is needed because of the following reason:

> [!CAUTION]
> docker compose run command does not create any of the ports specified in the service configuration. This prevents port collisions with already-open ports. If you do want the service’s ports to be created and mapped to the host, specify the --service-ports [^1]

If our certificate was created successfully when can proceed to start the docker-compose services, with the following command:

```bash
docker compose up -d
```

## Support me

[![Steam donations](https://github.com/Nereziel/cs2-WeaponPaints/assets/32937653/a0d53822-4ca7-4caf-83b4-e1a9b5f8c94e)](https://steamcommunity.com/tradeoffer/new/?partner=1153616149&token=V-OXvmuV)

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=L1teD/cs2-WeaponPaints-website&type=Date)](https://star-history.com/#L1teD/cs2-WeaponPaints-website&Date)

[^1]: [Docker service-ports](https://docs.docker.com/reference/cli/docker/compose/run/)
