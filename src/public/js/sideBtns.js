const sideBtnHandler = (activeBtn) => {
    // remove active background
    document.getElementById('sideBtnKnives').classList.remove('active-side')
    document.getElementById('sideBtnPistols').classList.remove('active-side')
    document.getElementById('sideBtnRifles').classList.remove('active-side')
    document.getElementById('sideBtnSniperRifles').classList.remove('active-side')
    document.getElementById('sideBtnPPs').classList.remove('active-side')
    document.getElementById('sideBtnShotguns').classList.remove('active-side')
    document.getElementById('sideBtnP').classList.remove('active-side')
    
    // add active background
    document.getElementById(activeBtn).classList.add('active-side')
}
  
const showDefaults = (type) => {

    let defaultWeapons = {
        'knives': [
            'css',
            'bayonet',
            'flip',
            'gut',
            'karambit',
            'm9_bayonet',
            'tactical',
            'butterfly',
            'falchion',
            'push',
            'survival_bowie',
            'ursus',
            'gypsy_jackknife',
            'stiletto',
            'widowmaker',
            'canis',
            'cord',
            'skeleton',
            'outdoor'
        ],
        'pistols': [
            'cz75a',
            'deagle',
            'elite',
            'fiveseven',
            'glock',
            'hkp2000',
            'p250',
            'revolver',
            'tec9',
            'usp_silencer'
        ],
        'rifles': [
            'ak47',
            'aug',
            'famas',
            'galilar',
            'm4a1_silencer',
            'm4a1',
            'sg556'
        ],
        'sniperRifles': [
                'awp',
                'g3sg1',
                'scar20',
                'ssg08'
        ],
        'smg': [
            'mac10',
            'mp5sd',
            'mp7',
            'mp9',
            'bizon',
            'p90',
            'ump45'
        ],
        'shotguns': [
            'xm1014',
            'nova',
            'sawedoff',
            'mag7'
        ],
        'mg': [
            'negev',
            'm249'
        ]
    }


    // clear main container
    document.getElementById('skinsContainer').innerHTML = ''

    // ALERT!!!
    // THE AMOUNT OF SHITCODE BELOW IS INSANE

    if (type == 'knives') {
        getJSON(`https://bymykel.github.io/CSGO-API/api/${lang}/skins.json`, (err, res) => {
            // var to get rid of second m9 bayonet
            let dublicate = 0

            // make unique object for weapons
            const unique = res.filter((obj, index) => {
                return index === res.findIndex(o => obj.weapon.id === o.weapon.id);
            })
            console.log(unique)

            unique.forEach(element => {

                // show only weapons that are selected in defaultWeapons
                defaultWeapons[type].forEach(weapontype => {

                    if (element.id.includes(weapontype) && element.id.includes('vanilla')) {
                        if (dublicate < 1 && element.id == "skin-vanilla-weapon_knife_m9_bayonet") {

                        
                            let card = document.createElement('div')
                            card.classList.add('col-3', 'p-2')

                            element.weapon.id = `weapon_knife_m9_${weapontype}`
                                    
                            // check if knife is selected
                            let active = ''
                            if (element.weapon.id == selectedKnife.knife) {
                                active = 'active-card'
                            }

                            card.innerHTML = `
                            <div class="rounded-3 d-flex flex-column card-common weapon-card ${active} weapon_knife" id="${element.weapon.id}">
                            <a onclick="changeKnife(\'${element.weapon.id}\', ${selectedKnife.steamid})" class="text-decoration-none d-flex flex-column" style="z-index: 0;">
                                    <img src="${element.image}" class="weapon-img mx-auto my-3" loading="lazy" alt="${element.name}">
                                    
                                    <p class="m-0 text-light weapon-skin-title mx-auto text-center">${element.weapon.name}</p>
                            </a>
                            <button onclick="knifeSkins(\'${element.weapon.id}\')" class="btn btn-primary text-warning mx-auto my-2" style="z-index: 1;"><small>${langObject.changeSkin}</small></button>
                            </div>
                            `

                            document.getElementById('skinsContainer').appendChild(card)
                        } else if (element.id != "skin-vanilla-weapon_knife_m9_bayonet") {
                            let card = document.createElement('div')
                            card.classList.add('col-3', 'p-2')


                            element.weapon.id = `weapon_knife_${weapontype}`

                            // check if knife is selected
                            let active = ''
                            if (element.weapon.id == selectedKnife.knife) {
                                active = 'active-card'
                            }

                            card.innerHTML = `
                            <div class="rounded-3 d-flex flex-column card-common weapon-card ${active} weapon_knife" id="${element.weapon.id}">
                            <a onclick="changeKnife(\'${element.weapon.id}\', ${selectedKnife.steamid})" class="text-decoration-none d-flex flex-column" style="z-index: 0;">
                                    <img src="${element.image}" class="weapon-img mx-auto my-3" loading="lazy" alt="${element.name}">
                                    
                                    <p class="m-0 text-light weapon-skin-title mx-auto text-center">${element.weapon.name}</p>
                            </a>
                            <button onclick="knifeSkins(\'${element.weapon.id}\')" class="btn btn-primary text-warning mx-auto my-2" style="z-index: 1;"><small>${langObject.changeSkin}</small></button>
                            </div>
                            `

                            document.getElementById('skinsContainer').appendChild(card)
                        }   

                        if (element.id == "skin-vanilla-weapon_knife_m9_bayonet") { dublicate++ }      
                    }
                });

            });
        })
    } else {
        getJSON(`https://bymykel.github.io/CSGO-API/api/${lang}/skins.json`, (err, res) => {
            // var to get rid of second m4a1-s
            let dublicate = 0

            // make unique object for defaults
            const unique = res.filter((obj, index) => {
                return index === res.findIndex(o => obj.weapon.name === o.weapon.name);
            });

            unique.forEach(element => {

                // show only weapons that are selected in defaultWeapons
                defaultWeapons[type].forEach(weapontype => {

                    if (element.weapon.id.includes(weapontype)) {                   
                        if (dublicate < 1) {
                            let card = document.createElement('div')
                            card.classList.add('col-3', 'p-2')

                            card.innerHTML = `
                            <div class="rounded-3 d-flex flex-column card-common weapon-card weapon_knife" id="${element.weapon.id}">
                            <a class="text-decoration-none d-flex flex-column" style="z-index: 0;">
                                    <img src="${element.image}" class="weapon-img mx-auto my-3" loading="lazy" alt="${element.name}">
                                    
                                    <p class="m-0 text-light weapon-skin-title mx-auto text-center">${element.weapon.name}</p>
                            </a>
                            <button onclick="knifeSkins(\'${element.weapon.id}\')" class="btn btn-primary text-warning mx-auto my-2" style="z-index: 1;"><small>${langObject.changeSkin}</small></button>
                            </div>
                            `

                            document.getElementById('skinsContainer').appendChild(card)
                        }

                        // get rid of second m4a1-s
                        if (element.weapon.id == 'weapon_m4a1_silencer') { dublicate++ }        
                    }

                });

            });
        })
    }
    
}

const showKnives = () => {
    sideBtnHandler('sideBtnKnives')
    showDefaults('knives')
}

const showGloves = () => {
    sideBtnHandler('sideBtnGloves')
}

const showPistols = () => {
    sideBtnHandler('sideBtnPistols')
    showDefaults('pistols')
}

const showRifles = () => {
    sideBtnHandler('sideBtnRifles')
    showDefaults('rifles')
}

const showSniperRifles = () => {
    sideBtnHandler('sideBtnSniperRifles')
    showDefaults('sniperRifles')
}

const showPPs = () => {
    sideBtnHandler('sideBtnPPs')
    showDefaults('smg')
}

const showShotguns = () => {
    sideBtnHandler('sideBtnShotguns')
    showDefaults('shotguns')
}

const showP = () => {
    sideBtnHandler('sideBtnP')
    showDefaults('mg')
}

const changeKnife = (weaponid) => {
    socket.emit('change-knife', {weaponid: weaponid, steamUserId: user.id})
    console.log(weaponid, user.id)
}

const changeSkin = (steamid, weaponid, paintid) => {
    socket.emit('change-skin', {steamid: steamid, weaponid: weaponid, paintid: paintid})
    console.log(steamid, weaponid, paintid)
}

socket.on('knife-changed', data => {
    let elms = document.getElementsByClassName("weapon_knife");
 
    for(var i = 0; i < elms.length; i++) {
        elms[i].classList.remove('active-card'); // <-- whatever you need to do here.
    }

    console.log(data.knife)

    selectedKnife.knife = data.knife

    document.getElementById(data.knife).classList.add('active-card')
})

socket.on('skin-changed', data => {
    let elms = document.getElementsByClassName("weapon_card");
 
    for(var i = 0; i < elms.length; i++) {
        elms[i].classList.remove('active-card'); // <-- whatever you need to do here.
    }

    selectedSkins = data.newSkins

    document.getElementById(`weapon-${data.weaponid}-${data.paintid}`).classList.add('active-card')
})

const knifeSkins = (knifeType) => {
    console.log(knifeType)

    getJSON(`https://bymykel.github.io/CSGO-API/api/${lang}/skins.json`, (err, res) => {
        document.getElementById('skinsContainer').innerHTML = ''
        res.forEach(element => {
            if (element.weapon.id == knifeType) {
                rarities = {
                    "#b0c3d9": "common",
                    "#5e98d9": "uncommon",
                    "#4b69ff": "rare",
                    "#8847ff": "mythical",
                    "#d32ce6": "legendary",
                    "#eb4b4b": "ancient",
                    "#e4ae39": "contraband"
                }
    
                let bgColor = 'card-uncommon'
    
                if (element.category.id == 'sfui_invpanel_filter_melee') { 
                    bgColor = 'card-gold'
                } else {
                    bgColor = `card-${rarities[element.rarity.color]}`
                }

                let phase  = ''

                if (typeof element.phase != 'undefined') {
                    phase = `(${element.phase})`
                }

                let active = ''
                let steamid = user.id
                let weaponid = weaponIds[element.weapon.id]
                let paintid = element.paint_index
                let float = 0.000001
                let pattern = 0

                selectedSkins.forEach(el => {
                    if (el.weapon_paint_id == element.paint_index && el.weapon_defindex == weaponIds[element.weapon.id]) {
                        active = 'active-card'
                        float = el.weapon_wear
                        pattern = el.weapon_seed
                    }
                })


                let card = document.createElement('div')
                card.classList.add('col-3', 'p-2')
    
                card.innerHTML = `
                    <div onclick="changeSkin(\'${user.id}\', \'${weaponIds[element.weapon.id]}\', ${element.paint_index})" id="weapon-${weaponIds[element.weapon.id]}-${element.paint_index}" class="parent-weapon-card weapon_card bg-nav rounded-3 d-flex flex-column ${active} ${bgColor}">


                        <div class="settings d-flex justify-content-center align-items-center bg-light text-dark rounded-circle" onclick="openPopup(\'${steamid}\', \'${weaponid}\', \'${paintid}\', \'${float}\', \'${pattern}\')">
                            <i class="fa-solid fa-gear"></i>
                        </div>

                        <img src="${element.image}" class="weapon-img mx-auto my-3" loading="lazy" alt="${element.name}">
                        
                        <p class="m-0 ms-4 text-secondary"><small>${element.weapon.name}</small></p>
                        
                        <h5 class="ms-2 mb-3 weapon-skin-title">
                            <i class="fa-solid fa-circle fa-2xs mx-2"></i>
                            ${element.pattern.name} ${phase}
                        </h5>
                    </div>
                `
    
                document.getElementById('skinsContainer').appendChild(card)
            }
           
        });
    })
}