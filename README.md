
# Weapon Paints website

Website used for the **[cs2-WeaponPaints](https://github.com/Nereziel/cs2-WeaponPaints/)** plugin

<div>
    <img src="https://github.com/L1teD/cs2-WeaponPaints-website/blob/main/previews/1.png?raw=true" width="400">
    <img src="https://github.com/L1teD/cs2-WeaponPaints-website/blob/main/previews/2.png?raw=true" width="400">
    <img src="https://github.com/L1teD/cs2-WeaponPaints-website/blob/main/previews/3.png?raw=true" width="400">
    <img src="https://github.com/L1teD/cs2-WeaponPaints-website/blob/main/previews/4.png?raw=true" width="400">
    <img src="https://github.com/L1teD/cs2-WeaponPaints-website/blob/main/previews/5.png?raw=true" width="400">
</div>

Screenshots taken from private version

## Preview
- Public: https://ws.primat.fun/
- Private: https://cs.primat.fun/

## Private
- **[See PRIVATE.md](https://github.com/L1teD/cs2-WeaponPaints-website/blob/main/PRIVATE.md)**
## Installation

### Requires: Node.js *17* or later

- **[Download latest release](https://github.com/L1teD/cs2-WeaponPaints-website/releases/latest/download/cs2-WeaponPaints-website-main.zip)**
- In **`src/`** copy **`config.example.json`** to **`config.json`** and fill it:
```json
{
    "name": "Title of your website",
    "lang": "en", 
    "DB": {
        "host": "host",
        "user": "username",
        "password": "password",
        "database": "table",
        "port": 3306
    },
    "HOST": "example.com or localhost/127.0.0.1",
    "PROTOCOL": "https",
    "PORT": 27275,
    "INTERNAL_HOST": "0.0.0.0",
    "STEAMAPIKEY": "Your Steam Web API Key",
    "SESSION_SECRET": "Some random and secure string containing letters, numbers and special characters like !@#$%^&*(). Atleast 32 chars long.",
    "connect": {
        "show": false,
        "serverIp": "Server IP",
        "serverPort": "Server Port",
        "serverPassword": "Server Password"
    },
    "LOG_LEVEL": "info"
}
```

- Make sure the database that you specified in the config is the same as in the WeaponPaints plugin. Otherwise the needed tables won't exist and the website won't work.

- If you are running in docker or running some special server setup. You might encounter issues with the internal expressjs server. As its default running on 127.0.0.1. If you need to change this. You can do so via config option **`INTERNAL_HOST`** and set it to whatever interface you need. For most advanced use cases like reverse proxy 0.0.0.0 can be used.

- Supported languages **`ru, en, pt-BR`**

- And then

If Windows:
```bash
  npm i
  npm run dev
```

If Linux:
```bash
  ### public
  npm i
  npm run dev
```

## Support me


[![Steam donations](https://github.com/Nereziel/cs2-WeaponPaints/assets/32937653/a0d53822-4ca7-4caf-83b4-e1a9b5f8c94e)](https://steamcommunity.com/tradeoffer/new/?partner=1153616149&token=V-OXvmuV)
