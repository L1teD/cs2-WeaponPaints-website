
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
- **[Download latest release](https://github.com/L1teD/cs2-WeaponPaints-website/releases/latest/download/cs2-WeaponPaints-website.zip)**
- Fill config.json (see below), don't fill appKey in it
- Start if linux `npm run startLinux` or if windows just open app.exe
- Then in the console copy your _**UUID**_
<img src="https://github.com/L1teD/cs2-WeaponPaints-website/blob/main/previews/Screenshot_12.png?raw=true" width="600">

- Then pay **[via DonationAlerts](https://www.donationalerts.com/r/l1te_ )** $20 with a message like “Discord: {discord id} UUID: {uuid}”

- After that i'll contact you and send you your app key

**To get admin account go to wps_users, find your account and change admin to 1**
## Installation

### Requires: Node.js *17* or later

- **[Download latest release](https://github.com/L1teD/cs2-WeaponPaints-website/releases/latest/download/cs2-WeaponPaints-website.zip)**
- In **`src/`** copy **`config.example.json`** to **`config.json`** and fill it:
```json
{
    "name": "Title of your website",
    "lang": "en", 
    "DB": {
        "DB_HOST": "host",
        "DB_USER": "username",
        "DB_PASS": "password",
        "DB_DB": "database name"
    },
    "HOST": "example.com or localhost/127.0.0.1",
    "SUBDIR": "/skinsExample/ or just /",
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

If Windows:
```bash
  ### public
  npm i
  npm run start

  ### private
  app.exe
```

If Linux:
```bash
  ### public
  npm i
  npm run startLinux

  ### private
  src/app
  # if you using pm2
  pm2 start "npm run startLinux"
```

## Support me


[![Steam donations](https://github.com/Nereziel/cs2-WeaponPaints/assets/32937653/a0d53822-4ca7-4caf-83b4-e1a9b5f8c94e)](https://steamcommunity.com/tradeoffer/new/?partner=1153616149&token=V-OXvmuV)
