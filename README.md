
# Weapon Paints website

Website used for the **[cs2-WeaponPaints](https://github.com/Nereziel/cs2-WeaponPaints/)** plugin



## Installation

- **[Download the release](https://github.com/L1teD/cs2-WeaponPaints-website/releases/latest/download/cs2-WeaponPaints-website.zip)**
- In **`src/`** copy **`config.example.json`** to **`config.json`** and fill it:
```json
{
    "name": "Title of your website",
    "lang": "en", 
    "DB": {
        "DB_HOST": "host",
        "DB_USER": "username",
        "DB_PASS": "password",
        "DB_DB": "table"
    },
    "HOST": "example.com or localhost/127.0.0.1",
    "PORT": 27275,
    "STEAMAPIKEY": "Your Steam Web API Key",
    "connect": {
        "show": true,
        "url": "steam://connect/[IP:PORT]?appid=730/[Server password if needed]"
    }
}
```
- Supported languages **`ru, en, pt-BR`**

- And then

```bash
  npm i
  npm run start
```

## Support me

![Steam Donations](https://camo.githubusercontent.com/b5f2c42b10192556e0703f1c86dd55954bd5a5e6f14f10e08ba7a576a12e8f04/68747470733a2f2f692e696d6775722e636f6d2f684e49487751452e706e67)
