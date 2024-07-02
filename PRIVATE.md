## **WARNING**
**If you used private <=2.4.1 then remove `wps_users` and `wps_workshop` tables since newer version is using a bit different layout for them**

## Private
- **[Download latest release](https://github.com/L1teD/cs2-WeaponPaints-website/releases/latest/download/cs2-WeaponPaints-website.zip)**
- Fill config.json (see below)
- Start if linux `./app` or if windows just open app.exe
- Then in the console copy your _**UUID**_
<img src="https://github.com/L1teD/cs2-WeaponPaints-website/blob/main/previews/Screenshot_12.png?raw=true" width="600">

- Then pay **[via DonationAlerts](https://www.donationalerts.com/r/l1te_ )** $20 with a message like “Discord: {discord id} UUID: {uuid}”

- After that i'll contact you and send you your app key
## Installation

### Requires: Node.js *17* or later

- **[Download latest release](https://github.com/L1teD/cs2-WeaponPaints-website/releases/latest/download/cs2-WeaponPaints-website.zip)**
- Create file **`config.json`** and fill it:
```json
{
    "name": "Title of your website",
    "lang": "en",
    "appKey": "your app key",
    "DB": {
        "host": "host",
        "user": "username",
        "password": "password",
        "database": "table",
        "port": 3306
    },
    "style": "legacy/gold",
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
    "payment": {
        "enabled": true,
        "info": "Payment system is under sandbox mode!<br>Use this card credentials to try premium:<br><br>Card number: 4111 1111 1111 1111<br>MM/YY: 12/40<br>CVV: 123<br>Zip: 12345",
        "price": "Price: <span class='text-success'>$1.99</span>",
        "duration": "Duration: <span class='text-warning'>1 Month</span>",
        "contacts": "Contacts: <a href='https://discord.gg/inviteId' class='text-decoration-none text-info'>Discord</a>, <a href='https://steamcommunity.com/id/tupoyvacban/' class='text-decoration-none'>Steam</a>",
        "xsolla": {
            "sandbox": true,
            "enabled": true,
            "apiKey": "xsolla api key",
            "userID": "xsolla user id",
            "projectID": "xsolla project id",
            "subscriptionPlanID": "xsolla sub plan id"
        }
    },
    "LOG_LEVEL": "info",
    "startPage": {
        "_comment": "Icons can be found there https://fontawesome.com/icons under the brands category",
        "buttons": [
            {
                "icon": "fa-discord",
                "url": "/"
            },
            {
                "icon": "fa-steam",
                "url": "https://steamcommunity.com/id/tupoyvacban/"
            },
            {
                "icon": "fa-youtube",
                "url": "https://www.youtube.com/channel/UCWdv-e1OADUi_pt8hAjVeuw"
            }
        ]
    },
    "infoBox": "<h5 class='text-center fw-bold'>**If you liked website, please <a href='https://github.com/L1teD/cs2-WeaponPaints-website' class='text-accent' target='_blank'>star it on Github!</a>**</h5><iframe width='500px' height='281px' src='https://www.youtube.com/embed/dQw4w9WgXcQ' class='rounded-3 shadow-xl'></iframe>",
    "availStyles": [
        [
            "Legacy",
            [
                "Gold",
                "Purple"
            ]
        ],
        [
            "Public",
            [
                "Default"
            ]
        ],
        [
            "Cybershoke",
            [
                "Default"
            ]
        ]
    ],
    "multipleServers": {
        "_comment": "Enabling this do not apply for wps_users, wps_workshop, wps_workshop_rating",
        "enabled": false,
        "list": [
            [
                "Exapmle Server 1",
                {
                    "host": "best.site.ever",
                    "user": "user","password": "passowrd",
                    "database": "database",
                    "port": 3306
                }
            ],
            [
                "Example Server 2",
                {
                    "host": "existed.on.earth",
                    "user": "user",
                    "password": "password",
                    "database": "database",
                    "port": 3306
                    
                }
            ]
        ]
    }
}

```

- Make sure the database that you specified in the config is the same as in the WeaponPaints plugin. Otherwise the needed tables won't exist and the website won't work.

- Please don't try to run it in docker, since UUID will reset every restart

- Supported languages **`bg, cs, da, de, el, en, es-ES, fi, fr, hu, it, ja, ko, nl, no, pl, pt-BR, pt-PT, ro, ru, sk, sv, th, uk, vi, zh-CN, zh-TW`**

- Supported styles **`legacy/gold, legacy/purple, public/default, cybershoke/default`**

- And then

If Windows:
```bash
    app.exe
```

If Linux:
```bash
    chmod +x app
    ./app
```

## Support me


[![Steam donations](https://github.com/Nereziel/cs2-WeaponPaints/assets/32937653/a0d53822-4ca7-4caf-83b4-e1a9b5f8c94e)](https://steamcommunity.com/tradeoffer/new/?partner=1153616149&token=V-OXvmuV)
