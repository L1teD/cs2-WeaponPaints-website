
# Weapon Paints website

Website used for the **[cs2-WeaponPaints](https://github.com/Nereziel/cs2-WeaponPaints/)** plugin



## Installation

- **[Download the release](https://github.com/L1teD/cs2-WeaponPaints-website/releases/latest/download/cs2-WeaponPaints-website.zip)**
- In **`src/`** create **`config.json`** file and fill it:
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
    "STEAMAPIKEY": "Your Steam Web API Key",
    "connect": {
        "show": true,
        "url": "steam://connect/[IP:PORT]?appid=730/[Server password if needed]"
    }
}
```
- Supported languages **`ru, en`**
- In **`src/app.js`** got to the 40 line
- Change returnURL and realm

if localhost:
```js
    returnURL: 'http://localhost:' + PORT + '/api/auth/steam/return',
    realm: 'http://localhost:' + PORT + '/',
```

if domain:
```js
    returnURL: 'http://example.com/api/auth/steam/return',
    realm: 'http://example.com/',
```

- And then

```bash
  npm i
  npm run start
```
