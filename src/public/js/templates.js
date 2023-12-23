const defaultsTemplate = (weapon, langObject, lang) => {
    let card = document.createElement('div')
    card.classList.add('col-6', 'col-sm-4', 'col-md-3', 'p-2')

    card.innerHTML = `
    <div class="rounded-3 d-flex flex-column card-common weapon-card weapon_knife" id="${weapon.weapon_name}">
        <div style="z-index: 3;" class="loading-card d-flex justify-content-center align-items-center w-100 h-100" id="loading-${weapon.weapon_name}">
            <div class="spinner-border spinner-border-xl" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <a class="text-decoration-none d-flex flex-column" style="z-index: 0;">
                <img src="${weapon.image}" class="weapon-img mx-auto my-3" loading="lazy" alt="${weapon.paint_name}">
                
                <p class="m-0 text-light weapon-skin-title mx-auto text-center">${weapon.paint_name}</p>
        </a>
        <button onclick="knifeSkins(\'${weapon.weapon_name}\')" class="btn btn-primary text-warning mx-auto my-2" style="z-index: 1;"><small>${langObject.changeSkin}</small></button>
    </div>
    `

    document.getElementById('skinsContainer').appendChild(card)  
}

const changeSkinTemplate = (weapon, langObject) => {
    let card = document.createElement('div')
    card.classList.add('col-6', 'col-sm-4', 'col-md-3', 'p-2')

    card.innerHTML = `
    <div class="rounded-3 d-flex flex-column card-common weapon-card weapon_knife" id="${weapon.weapon_name}">
        <div style="z-index: 3;" class="loading-card d-flex justify-content-center align-items-center w-100 h-100" id="loading-${weapon.weapon_name}">
            <div class="spinner-border spinner-border-xl" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <a class="text-decoration-none d-flex flex-column" style="z-index: 0;">
                <img src="${weapon.image}" class="weapon-img mx-auto my-3" loading="lazy" alt="${weapon.paint_name}" id="img-${weapon.weapon_name}">
                
                <p class="m-0 text-light weapon-skin-title mx-auto text-center">${weapon.paint_name}</p>
        </a>
        <button onclick="knifeSkins(\'${weapon.weapon_name}\')" class="btn btn-primary text-warning mx-auto my-2" style="z-index: 1;"><small>${langObject.changeSkin}</small></button>
    </div>
    `

    document.getElementById('skinsContainer').appendChild(card)  
}

const changeKnifeSkinTemplate = (knife, langObject, selectedKnife) => {
    let card = document.createElement('div')
    card.classList.add('col-6', 'col-sm-4', 'col-md-3', 'p-2')

    // check if knife is selected
    let active = ''
    if (knife.weapon_name == selectedKnife.knife) {
        active = 'active-card'
    }


    card.innerHTML = `
    <div class="rounded-3 d-flex flex-column card-common weapon-card ${active} weapon_knife" id="${knife.weapon_name}">
        <div style="z-index: 3;" class="loading-card d-flex justify-content-center align-items-center w-100 h-100" id="loading-${knife.weapon_name}">
            <div class="spinner-border spinner-border-xl" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <a onclick="changeKnife(\'${knife.weapon_name}\', ${selectedKnife.steamid})" class="text-decoration-none d-flex flex-column" style="z-index: 0;">
                <img src="${knife.image}" class="weapon-img mx-auto my-3" loading="lazy" alt="${knife.paint_name}" id="img-${knife.weapon_name}">
                
                <p class="m-0 text-light weapon-skin-title mx-auto text-center">${knife.paint_name}</p>
        </a>
        <button onclick="knifeSkins(\'${knife.weapon_name}\')" class="btn btn-primary text-warning mx-auto my-2" style="z-index: 1;"><small>${langObject.changeSkin}</small></button>
    </div>
    `

    document.getElementById('skinsContainer').appendChild(card)  
}

const changeSkinCard = (weapon, selectedSkin) => {
    getJSON(`js/json/skins/${lang}-skins.json`, (err, res) => {
        res.forEach(skinWeapon => {
            if (weaponIds[skinWeapon.weapon.id] == weapon.weapon_defindex && skinWeapon.paint_index == selectedSkin.weapon_paint_id) {
                if (skinWeapon.category.id == 'sfui_invpanel_filter_melee') {
                    skinWeapon.rarity.color = "#caab05"
                }
                document.getElementById(`img-${weapon.weapon_name}`).src = skinWeapon.image
                document.getElementById(`img-${weapon.weapon_name}`).style = `filter: drop-shadow(0px 0px 20px ${skinWeapon.rarity.color});`
            }
        })
    })
}

const knivesTemplate = (knife, langObject, selectedKnife) => {
    let card = document.createElement('div')
    card.classList.add('col-6', 'col-sm-4', 'col-md-3', 'p-2')

    // check if knife is selected
    let active = ''
    if (knife.weapon_name == selectedKnife.knife) {
        active = 'active-card'
    }

    card.innerHTML = `
    <div class="rounded-3 d-flex flex-column card-common weapon-card ${active} weapon_knife" id="${knife.weapon_name}">
        <div style="z-index: 3;" class="loading-card d-flex justify-content-center align-items-center w-100 h-100" id="loading-${knife.weapon_name}">
            <div class="spinner-border spinner-border-xl" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <a onclick="changeKnife(\'${knife.weapon_name}\', ${selectedKnife.steamid})" class="text-decoration-none d-flex flex-column" style="z-index: 0;">
                <img src="${knife.image}" class="weapon-img mx-auto my-3" loading="lazy" alt="${knife.paint_name}">
                
                <p class="m-0 text-light weapon-skin-title mx-auto text-center">${knife.paint_name}</p>
        </a>
        <button onclick="knifeSkins(\'${knife.weapon_name}\')" class="btn btn-primary text-warning mx-auto my-2" style="z-index: 1;"><small>${langObject.changeSkin}</small></button>
    </div>
    `

    document.getElementById('skinsContainer').appendChild(card)    
}