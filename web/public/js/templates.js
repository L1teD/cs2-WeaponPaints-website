window.defaultsTemplate = (weapon, langObject, lang) => {
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

window.changeSkinTemplate = (weapon, langObject, selectedKnife) => {
    let card = document.createElement('div')
    card.classList.add('col-6', 'col-sm-4', 'col-md-3', 'p-2')

    card.innerHTML = `
    <div class="rounded-3 d-flex flex-column card-common weapon-card weapon_knife" id="${weapon.weapon_name}">
        <button id="reset-${weapon.weapon_name}" onclick="resetSkin(${weapon.weapon_defindex}, '${selectedKnife.steamid}')" style="z-index: 3;" class="revert d-flex justify-content-center align-items-center text-danger rounded-circle">
            <i class="fa-solid fa-rotate-right"></i>
        </button>

        <div style="z-index: 3;" class="loading-card d-flex justify-content-center align-items-center w-100 h-100" id="loading-${weapon.weapon_name}">
            <div class="spinner-border spinner-border-xl" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <a class="text-decoration-none d-flex flex-column" style="z-index: 0;">
                <img src="${weapon.image}" class="weapon-img mx-auto my-3" loading="lazy" alt="${weapon.image}" id="img-${weapon.weapon_name}">
                
                <p class="m-0 text-light weapon-skin-title mx-auto text-center">${weapon.paint_name}</p>
        </a>
        <button onclick="knifeSkins(\'${weapon.weapon_name}\')" class="btn btn-primary text-warning mx-auto my-2" style="z-index: 1;"><small>${langObject.changeSkin}</small></button>
    </div>
    `

    document.getElementById('skinsContainer').appendChild(card)  
}

window.changeKnifeSkinTemplate = (knife, langObject, selectedKnife) => {
    let card = document.createElement('div')
    card.classList.add('col-6', 'col-sm-4', 'col-md-3', 'p-2')

    // check if knife is selected
    let active = ''
    if (knife.weapon_name == selectedKnife.knife) {
        active = 'active-card'
    }


    card.innerHTML = `
    <div class="rounded-3 d-flex flex-column card-common weapon-card ${active} weapon_knife" id="${knife.weapon_name}">
        <button id="reset-${knife.weapon_name}" onclick="resetSkin(${knife.weapon_defindex}, '${selectedKnife.steamid}')" style="z-index: 3;" class="revert d-flex justify-content-center align-items-center text-danger rounded-circle">
            <i class="fa-solid fa-rotate-right"></i>
        </button>

        <div style="z-index: 3;" class="loading-card d-flex justify-content-center align-items-center w-100 h-100" id="loading-${knife.weapon_name}">
            <div class="spinner-border spinner-border-xl" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <a onclick="changeKnife(\'${knife.weapon_name}\', ${selectedKnife.steamid})" class="text-decoration-none d-flex flex-column" style="z-index: 0;">
                <img src="${knife.image}" class="weapon-img mx-auto my-3" loading="lazy" alt="${knife.image}" id="img-${knife.weapon_name}">
                
                <p class="m-0 text-light weapon-skin-title mx-auto text-center">${knife.paint_name}</p>
        </a>
        <button onclick="knifeSkins(\'${knife.weapon_name}\')" class="btn btn-primary text-warning mx-auto my-2" style="z-index: 1;"><small>${langObject.changeSkin}</small></button>
    </div>
    `

    document.getElementById('skinsContainer').appendChild(card)  
}

window.changeSkinCard = (weapon, selectedSkin) => {
    skinsObject.forEach(skinWeapon => {
        if (weaponIds[skinWeapon.weapon.id] == weapon.weapon_defindex && skinWeapon.paint_index == selectedSkin.weapon_paint_id) {
            if (skinWeapon.category.id == 'sfui_invpanel_filter_melee') {
                skinWeapon.rarity.color = "#caab05"
            }
            
            document.getElementById(`img-${weapon.weapon_name}`).src = skinWeapon.image
            document.getElementById(`img-${weapon.weapon_name}`).style = `filter: drop-shadow(0px 0px 20px ${skinWeapon.rarity.color});`
        }
    })
}

window.knivesTemplate = (knife, langObject, selectedKnife) => {
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

window.glovesTemplate = (gloves, langObject, selectedGloves) => {
    let card = document.createElement('div')
    card.classList.add('col-6', 'col-sm-4', 'col-md-3', 'p-2')

    // check if knife is selected
    let active = ''

    if (gloves.weapon_defindex == selectedGloves.weapon_defindex) {
        active = 'active-card'
    }

    card.innerHTML = `
    <div class="rounded-3 d-flex flex-column card-common weapon-card ${active} weapon_knife" id="${gloves.weapon_name}">
        <div style="z-index: 3;" class="loading-card d-flex justify-content-center align-items-center w-100 h-100" id="loading-${gloves.weapon_name}">
            <div class="spinner-border spinner-border-xl" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <a onclick="changeGlove(\'${gloves.weapon_name}\', ${selectedGloves.steamid})" class="text-decoration-none d-flex flex-column" style="z-index: 0; height: 196px;">
                <img src="${gloves.image}" class="weapon-img mx-auto my-3" loading="lazy" alt="${gloves.paint_name}" style="object-fit: contain; aspect-ratio: 512 / 384;">
                
                <p class="m-0 text-light weapon-skin-title mx-auto text-center">${gloves.paint_name}</p>
        </a>
        <button onclick="knifeSkins(\'${gloves.weapon_name}\')" class="btn btn-primary text-warning mx-auto my-2" style="z-index: 1;"><small>${langObject.changeSkin}</small></button>
    </div>
    `

    document.getElementById('skinsContainer').appendChild(card)       
}

window.changeGlovesSkinTemplate = (gloves, langObject, selectedGloves) => {
    let card = document.createElement('div')
    card.classList.add('col-6', 'col-sm-4', 'col-md-3', 'p-2')

    let buttonInner = langObject.setWeapon
    let buttonFunc = `changeGlove(\'${gloves.weapon_name}\', ${selectedGloves.steamid})`

    // check if knife is selected
    let active = ''
    if (gloves.weapon_defindex == selectedGloves.weapon_defindex) {
        active = 'active-card'
        buttonInner = langObject.changeSkin
        buttonFunc =  `knifeSkins(\'${gloves.weapon_name}\')`
    }


    card.innerHTML = `
    <div class="rounded-3 d-flex flex-column card-common weapon-card ${active} weapon_knife" id="${gloves.weapon_name}">
        <button id="reset-${gloves.weapon_name}" onclick="resetSkin(${gloves.weapon_defindex}, '${selectedGloves.steamid}')" style="z-index: 3;" class="revert d-flex justify-content-center align-items-center text-danger rounded-circle">
            <i class="fa-solid fa-rotate-right"></i>
        </button>

        <div style="z-index: 3;" class="loading-card d-flex justify-content-center align-items-center w-100 h-100" id="loading-${gloves.weapon_name}">
            <div class="spinner-border spinner-border-xl" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <a onclick="changeGlove(\'${gloves.weapon_name}\', ${selectedGloves.steamid})" class="text-decoration-none d-flex flex-column" style="z-index: 0; height: 196px;">
                <img src="${gloves.image}" class="weapon-img mx-auto my-3" loading="lazy" alt="${gloves.image}" id="img-${gloves.weapon_name}" style="object-fit: contain;">
                
                <p class="m-0 text-light weapon-skin-title mx-auto text-center">${gloves.paint_name}</p>
        </a>
        <button onclick="knifeSkins(\'${gloves.weapon_name}\')" class="btn btn-primary text-warning mx-auto my-2" style="z-index: 1;"><small>${langObject.changeSkin}</small></button>
    </div>
    `

    document.getElementById('skinsContainer').appendChild(card)  
}

window.showAgents = (type) => {
    let team = {
        'ct': 3,
        't': 2
    }

    // clear main container
    document.getElementById('skinsContainer').innerHTML = ''

    agentsObject.forEach(element => {
        console.log(element.team, team.type)
        if (element.team == team[type]) {
            let rarities = {
                "#b0c3d9": "common",
                "#5e98d9": "uncommon",
                "#4b69ff": "rare",
                "#8847ff": "mythical",
                "#d32ce6": "legendary",
                "#eb4b4b": "ancient",
                "#e4ae39": "contraband"
            }

            let bgColor = 'card-uncommon'
            let phase  = ''
            let active = ''
            let steamid = user.id

            // Make outline if this skin is selected
            
            if (selectedAgents.agent_t == element.model || selectedAgents.agent_ct == element.model) {
                active = 'active-card'
            }
            
            let card = document.createElement('div')
            card.classList.add('col-6', 'col-sm-4', 'col-md-3', 'p-2')

            card.innerHTML = `
                <div onclick="changeAgent(\'${steamid}\', \'${element.model}\', \'${type}\')" id="agent-${element.model}" class="weapon-card rounded-3 d-flex flex-column ${active} ${bgColor} contrast-reset pb-2" data-type="skinCard" data-btn-type="">
                
                    <div style="z-index: 3;" class="loading-card d-flex justify-content-center align-items-center w-100 h-100" id="loading-${element.model}">
                        <div class="spinner-border spinner-border-xl" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>

                    <img src="${element.image}" class="weapon-img mx-auto my-3" loading="lazy" width="181px" height="136px" alt=" ">
                    
                    <div class="d-flex align-items-center g-3">
                    
                    </div>
                    
                    <h5 class="weapon-skin-title text-roboto ms-3">
                        ${element.agent_name}
                    </h5>
                </div>
            `

            document.getElementById('skinsContainer').appendChild(card)
        }
    });
}

window.showMusicKits = () => {
    // clear main container
    document.getElementById('skinsContainer').innerHTML = ''

    musicObject.forEach(element => {
        console.log(element.id.slice(-2))
        if (element.id.slice(-2) != 'st') {
            let bgColor = 'card-uncommon'
            let active = ''
            let steamid = user.id
            let music_id = element.id.slice(element.id.lastIndexOf('-')+1)

            // TODO: Make outline if this skin is selected
            console.log(music_id, selectedMusic.music_id)

            if (music_id == selectedMusic.music_id) {
                active = 'active-card'
            }
            
            let card = document.createElement('div')
            card.classList.add('col-6', 'col-sm-4', 'col-md-3', 'p-2')

            card.innerHTML = `
                <div onclick="changeMusic(\'${steamid}\', \'${music_id}\')" id="music-${music_id}" class="weapon-card card-rare rounded-3 d-flex flex-column ${active} ${bgColor} contrast-reset pb-2" data-type="skinCard" data-btn-type="">
                    <div style="z-index: 3;" class="loading-card d-flex justify-content-center align-items-center w-100 h-100" id="loading-${music_id}">
                        <div class="spinner-border spinner-border-xl" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>

                    <img src="${element.image}" class="weapon-img mx-auto my-3" loading="lazy" width="181px" height="136px" alt=" ">
                    
                    <div class="d-flex align-items-center g-3">
                    
                    </div>
                    
                    <h5 class="weapon-skin-title text-roboto ms-3">
                        ${element.name.slice(12)}
                    </h5>
                </div>
            `

            document.getElementById('skinsContainer').appendChild(card)
        }
    });

}
