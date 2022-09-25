let page = 1
let monstersDiv 

document.addEventListener("DOMContentLoaded", () => {
    monstersDiv = document.getElementById("monster-container")
    fetchMonsters()
    createMonsterForm()

    let forwardButton = document.getElementById('forward')
    forwardButton.addEventListener('click', () => {changePage(1)})

    let backButton = document.getElementById('back')
    backButton.addEventListener('click', () => {changePage(-1)})
});

function fetchMonsters() {
    fetch(`http://localhost:3000/monsters/?_limit=10&_page=${page}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(json){
        json.length != 0 ? setupMonsters(json) : page -= 1
    })
}

function setupMonsters(array) {
    monstersDiv.innerHTML = ""

    for (i of array) {
        createMonster(i)
    }
}

function createMonster(object) {
    let monster = document.createElement('div')
    let monsterName = document.createElement('h2')
    monsterName.innerHTML = `${object.name}`

    let monsterAge = document.createElement('h4')
    monsterAge.innerHTML = `Age: ${object.age}`

    let monsterBio = document.createElement('p')
    monsterBio.innerHTML = `Bio: ${object.description}`

    monster.appendChild(monsterName)
    monster.appendChild(monsterAge)
    monster.appendChild(monsterBio)

    monstersDiv.appendChild(monster)
}



function createMonsterForm() {
    let createMonsterDiv = document.getElementById('create-monster')
    let createMonsterForm = document.createElement('form')
    createMonsterForm.addEventListener('submit', (e) => {
        e.preventDefault()
        addMonster(e)
        nameInput.value = ''
        ageInput.value = ''
        descriptionInput.value = ''
    })

    let nameInput = document.createElement('input')
    nameInput.type = "text"
    nameInput.value = ''
    nameInput.placeholder = "name..."

    let ageInput = document.createElement('input')
    ageInput.type = "text"
    ageInput.value = ''
    ageInput.placeholder = "age..."

    let descriptionInput = document.createElement('input')
    descriptionInput.type = "text"
    descriptionInput.value = ''
    descriptionInput.placeholder = "description..."

    let sumbitButton = document.createElement('input')
    sumbitButton.type = "submit"
    sumbitButton.value = "Create"

    createMonsterDiv.appendChild(createMonsterForm)
    createMonsterForm.appendChild(nameInput)
    createMonsterForm.appendChild(ageInput)
    createMonsterForm.appendChild(descriptionInput)
    createMonsterForm.appendChild(sumbitButton)
}

function addMonster(e) {
    let object = {name: e.target[0].value, age: e.target[1].value, description: e.target[2].value}
    
    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: "application/json",
        },
        body: JSON.stringify(object) 
      })
        .then((response) => response.json())
        .then((data) => {
          createMonster(object);
        })
}

function changePage(x) {
    if (page == 1 && x == -1) {
        return
    }

    page = page + x
    fetchMonsters()
}