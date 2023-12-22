const sideBtnHandler = (activeBtn) => {
    // remove active background
    let allBtns = ['sideBtnKnives', 'sideBtnPistols', 'sideBtnRifles', 'sideBtnPPs', 'sideBtnShotguns']
    allBtns.forEach(element => {
        let elms = document.querySelectorAll(`[id='${element}']`);
 
        for(var i = 0; i < elms.length; i++) 
            elms[i].classList.remove('active-side')
    });
    document.getElementById('sideBtnKnives').classList.remove('active-side')
    document.getElementById('sideBtnPistols').classList.remove('active-side')
    document.getElementById('sideBtnRifles').classList.remove('active-side')
    document.getElementById('sideBtnPPs').classList.remove('active-side')
    document.getElementById('sideBtnShotguns').classList.remove('active-side')
    
    // add active background
    let elms = document.querySelectorAll(`[id='${activeBtn}']`);
 
    for(var i = 0; i < elms.length; i++) 
        elms[i].classList.add('active-side')
}

const showDefaults = (type) => {
    // clear main container
    document.getElementById('skinsContainer').innerHTML = ''

    // STILL INSANE AMOUNT OF SHITCODE BELOW

    if (type == 'sfui_invpanel_filter_melee') {
        getJSON(`js/json/skins/${lang}-skins.json`, (err, res) => {
            // make unique object for weapons
            const unique = res.filter((obj, index) => {
                return index === res.findIndex(o => obj.weapon.id === o.weapon.id);
            })
            console.log(unique)

            unique.forEach(element => {
                if (element.id.includes('vanilla')) {
                    let card = document.createElement('div')
                    card.classList.add('col-6', 'col-sm-4', 'col-md-3', 'p-2')

                    element.weapon.id = element.id.slice(13)

                    // check if knife is selected
                    let active = ''
                    if (element.weapon.id == selectedKnife.knife) {
                        active = 'active-card'
                    }

                    card.innerHTML = `
                    <div class="rounded-3 d-flex flex-column card-common weapon-card ${active} weapon_knife" id="${element.weapon.id}">
                        <div style="z-index: 3;" class="loading-card d-flex justify-content-center align-items-center w-100 h-100" id="loading-${element.weapon.id}">
                            <div class="spinner-border spinner-border-xl" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>

                        <a onclick="changeKnife(\'${element.weapon.id}\', ${selectedKnife.steamid})" class="text-decoration-none d-flex flex-column" style="z-index: 0;">
                                <img src="${element.image}" class="weapon-img mx-auto my-3" loading="lazy" alt="${element.name}">
                                
                                <p class="m-0 text-light weapon-skin-title mx-auto text-center">${element.weapon.name}</p>
                        </a>
                        <button onclick="knifeSkins(\'${element.weapon.id}\')" class="btn btn-primary text-warning mx-auto my-2" style="z-index: 1;"><small>${langObject.changeSkin}</small></button>
                    </div>
                    `

                    document.getElementById('skinsContainer').appendChild(card)      
                }
            })
        })
    } else {
        getJSON(`js/json/skins/${lang}-skins.json`, (err, res) => {
            // make unique object for weapons
            const unique = res.filter((obj, index) => {
                return index === res.findIndex(o => obj.weapon.id === o.weapon.id);
            })
            console.log(unique)

            unique.forEach(element => {
                if (element.category.id == type) {
                    let card = document.createElement('div')
                    card.classList.add('col-6', 'col-sm-4', 'col-md-3', 'p-2')

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
            })
        })
    }
}

const showKnives = () => {
    sideBtnHandler('sideBtnKnives')
    showDefaults('sfui_invpanel_filter_melee')
}

const showGloves = () => {
    sideBtnHandler('sideBtnGloves')
}

const showPistols = () => {
    sideBtnHandler('sideBtnPistols')
    showDefaults('csgo_inventory_weapon_category_pistols')
}

const showRifles = () => {
    sideBtnHandler('sideBtnRifles')
    showDefaults('csgo_inventory_weapon_category_rifles')
}

const showSniperRifles = () => {
    sideBtnHandler('sideBtnSniperRifles')
    showDefaults('csgo_inventory_weapon_category_rifles')
}

const showPPs = () => {
    sideBtnHandler('sideBtnPPs')
    showDefaults('csgo_inventory_weapon_category_smgs')
}

const showShotguns = () => {
    sideBtnHandler('sideBtnShotguns')
    showDefaults('csgo_inventory_weapon_category_heavy')
}

const showP = () => {
    sideBtnHandler('sideBtnP')
    showDefaults('csgo_inventory_weapon_category_heavy')
}

const changeKnife = (weaponid) => {
    socket.emit('change-knife', {weaponid: weaponid, steamUserId: user.id})
    document.getElementById(`loading-${weaponid}`).style.visibility = 'visible'
    document.getElementById(`loading-${weaponid}`).style.opacity = 1
}

const changeSkin = (steamid, weaponid, paintid) => {
    socket.emit('change-skin', {steamid: steamid, weaponid: weaponid, paintid: paintid})
    document.getElementById(`loading-${weaponid}-${paintid}`).style.visibility = 'visible'
    document.getElementById(`loading-${weaponid}-${paintid}`).style.opacity = 1
}

socket.on('knife-changed', data => {
    let elms = document.getElementsByClassName("weapon_knife");
 
    for(var i = 0; i < elms.length; i++) {
        elms[i].classList.remove('active-card'); // <-- whatever you need to do here.
    }

    console.log(data.knife)

    selectedKnife.knife = data.knife

    document.getElementById(data.knife).classList.add('active-card')
    document.getElementById(`loading-${data.knife}`).style.opacity = 0
    document.getElementById(`loading-${data.knife}`).style.visibility = 'hidden'
})

socket.on('skin-changed', data => {
    let elms = document.getElementsByClassName("weapon_card");
 
    for(var i = 0; i < elms.length; i++) {
        elms[i].classList.remove('active-card'); // <-- whatever you need to do here.
    }

    selectedSkins = data.newSkins

    document.getElementById(`weapon-${data.weaponid}-${data.paintid}`).classList.add('active-card')
    document.getElementById(`loading-${data.weaponid}-${data.paintid}`).style.opacity = 0
    document.getElementById(`loading-${data.weaponid}-${data.paintid}`).style.visibility = 'hidden'
})

const knifeSkins = (knifeType) => {
    console.log(knifeType)

    getJSON(`js/json/skins/${lang}-skins.json`, (err, res) => {
        // clear main container
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
                card.classList.add('col-6', 'col-sm-4', 'col-md-3', 'p-2')
    
                card.innerHTML = `
                    <div onclick="changeSkin(\'${user.id}\', \'${weaponIds[element.weapon.id]}\', ${element.paint_index})" id="weapon-${weaponIds[element.weapon.id]}-${element.paint_index}" class="parent-weapon-card weapon_card bg-nav rounded-3 d-flex flex-column ${active} ${bgColor}">
                        <div style="z-index: 3;" class="loading-card d-flex justify-content-center align-items-center w-100 h-100" id="loading-${weaponIds[element.weapon.id]}-${element.paint_index}">
                            <div class="spinner-border spinner-border-xl" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>

                        <button onclick="editModal(\'${element.image}\', \'${element.weapon.name}\', \'${element.pattern.name} ${phase}\', \'${element.weapon.id}\' , \'${element.paint_index}\')" style="z-index: 3;" class="settings d-flex justify-content-center align-items-center bg-light text-dark rounded-circle" data-bs-toggle="modal" data-bs-target="#patternFloat">
                            <i class="fa-solid fa-gear"></i>
                        </button>

                        <img src="${element.image}" class="weapon-img mx-auto my-3" loading="lazy" alt="${element.name}">
                        
                        <p class="m-0 ms-4 text-secondary"><small class="text-roboto">${element.weapon.name}</small></p>
                        
                        <h5 class="ms-2 mb-3 weapon-skin-title text-roboto">
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