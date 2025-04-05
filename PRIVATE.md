# Installation
Requirements:
- [Node.JS](https://nodejs.org/en) 17^
- [Nginx](https://nginx.org/ru/download.html)
- [WeaponPaints](https://github.com/Nereziel/cs2-WeaponPaints) installed

#### Step 1:

**[Download latest release](https://github.com/L1teD/cs2-WeaponPaints-website/releases/latest/download/cs2-WeaponPaints-website-main.zip)**
Unpack it wherever you want
- Copy file **`example.env`** to **`.env`** and fill it:
```env
# General
license_key=appKey
server_name="L1te's Practice Servers"
server_lang=en

# Server
PORT=27275
HOST=example.l1te.pw # domain or ip address e.g. 133.713.371.337
PROTOCOL=https
STEAM_API_KEY=Steam_API_key
SESSION_SECRET=Random_string_value
WEB_SERVER_HOST=0.0.0.0 # ip address where web server will be running, for most use cases left 0.0.0.0
ALLOWED_DOMAINS='["example.l1te.pw", "*"]' # allowed domains, for most cases left ["*"]

# Premium
PR_ENABLED=true
PR_MONTHS=1
PR_PRICE="$1337"
PR_CONTACTS="
<a href='https://discord.gg/inviteId' class='text-decoration-none text-info'>Discord</a>, <a href='https://steamcommunity.com/id/tupoyvacban/' class='text-decoration-none'>Steam</a>
"
PR_INFO="
<span class='text-accent'>Payment system is <span class='text-danger'>under sandbox mode!</span></span>
Use this card credentials to try premium:

Card number: 4111 1111 1111 1111
MM/YY: 12/40
CVV: 123
Zip: 12345
"

# Workshop
WR_LIMIT=3
WR_PREMIUM_LIMIT=5

# Xsolla
XS_ENABLED=false
XS_SANDBOX=true # enable sandbox mode if you want to test payment
XS_MERCHANT_ID=
XS_COMPANY_API_KEY=
XS_PLAN_ID=
XS_PROJECT_ID=

# Other
OT_SOCIALS= '
["fa-discord", "/"],
["fa-steam", "https://steamcommunity.com/id/tupoyvacban/"],
["fa-youtube", "https://www.youtube.com/channel/UCWdv-e1OADUi_pt8hAjVeuw"]
'
OT_INFOBOX="
<h5 class='text-center fw-bold mb-2'>
    **If you liked website, please <a href='https://github.com/L1teD/cs2-WeaponPaints-website' class='text-accent' target='_blank'>star it on Github!</a>**
</h5>
<iframe 
    width='500px' 
    height='281px' 
    src='https://www.youtube.com/embed/dQw4w9WgXcQ' 
    class='rounded-3 shadow-xl'
></iframe>
"
```

- Copy file **`servers.example.json`** to **`servers.json`** and fill it:
```json
[
    {
        "name": "Example server",
        "DB": {
            "host": "localhost",
            "port": 3306,
            "user": "root",
            "password": "",
            "database": ""
        }
    }
]
```

- Make sure the database that you specified in the config is the same as in the WeaponPaints plugin. Otherwise the needed tables won't exist and the website won't work.

- First database in `servers.json` will be used as main to contain users, workshops, etc.

- **Please don't try to run it in docker, since UUID will reset every restart**

- Supported languages **`bg, cs, da, de, el, en, es-ES, fi, fr, hu, it, ja, ko, nl, no, pl, pt-BR, pt-PT, ro, ru, sk, sv, th, uk, vi, zh-CN, zh-TW`**

- Supported styles **`legacy/gold, legacy/purple, public/default, cybershoke/default`**

#### Step 2:
Configure Nginx reverse proxy
- In Nginx folder at `sites-enabled` folder create file `ws-site.conf`
- Fill it like this:
```nginx
server {
        listen 80;
        listen 443 ssl; # Include this if you want SSL support! You wont usually need this if you plan on proxying through CF. 

        # The domain or URL you want this to run SkinChanger off of.
        server_name subdomain.example.com;

        # NOTE: You'll want to change these to your own SSL certificate if any. You wont usually need this if you plan on proxying through CF.
        ssl_certificate     /etc/letsencrypt/live/subdomain.example.com/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/subdomain.example.com/privkey.pem;

        # SkinChanger
        location / {
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header Host $http_host;
                add_header Access-Control-Allow-Origin *;
                proxy_redirect off;
				# Change port in case you edited it in config.json
                proxy_pass http://127.0.0.1:27275;
        }
}
```

#### Step 3:
Run app with following commands:

If Windows
```bash
    server.exe
```

If Linux
```bash
    chmod +x server
    ./server
```

#### Step 4:
- Copy your in the console _**UUID**_
<img src="https://github.com/L1teD/cs2-WeaponPaints-website/blob/main/previews/Screenshot_12.png?raw=true" width="600">

- Then pay **[via DonationAlerts](https:/github.com)** (payments closed untill new private release) $50 with a message like “Discord: {discord id} UUID: {uuid}”

- After that i'll contact you and send you your app key

`For all questions contact me on discord "l1tedxd" or on email support@l1te.pw`

And after all of this, site should be available at domain you configured in Nginx config

## Support me


[![Steam donations](https://github.com/Nereziel/cs2-WeaponPaints/assets/32937653/a0d53822-4ca7-4caf-83b4-e1a9b5f8c94e)](https://steamcommunity.com/tradeoffer/new/?partner=1153616149&token=V-OXvmuV)
