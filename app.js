console.log("Let's find some treasure!!");  //verify files are linked
console.log($); //verify files are linked



//////////////
//  Function to generate divs for search area
/////////////
const $searchArea = $('.search-area');
$('.heart').hide();
let life = 3;
let clicks = 0;
let levelClass = 0;
let time = 0;
let treasureX;
let treasureY;
let disance;

const createSearchArea = (gridSize) => {
    for (let i = 0; i < gridSize; i++) {
        const $newRow = $('<div>').addClass(`row`).attr('id', `row-${i}`);
        for (let j = 0; j < gridSize; j++) {
            const $newSearchDiv = $('<div>').addClass('search-div').addClass(`search-div${gridSize}`).addClass(`x-${j}`).addClass(`y-${i}`);
            // $newSearchDiv.append(`<p>${j},${i}</p>`);
            $searchArea.append($newRow);
            $newRow.append($newSearchDiv);
        }
    }
    hideTraps(gridSize);
}

////////////////
//  Function to place treasure and traps
////////////////

const randomDivArray = [];

const hideTraps = (grid) => {
    while (randomDivArray.length < grid * grid * .05) {  // creating traps in 5% of search area
        let newX = Math.floor(Math.random() * grid);
        let newY = Math.floor(Math.random() * grid);
        let newXY = {'x': newX, 'y': newY};
        if (randomDivArray.map((item)=> { return `${item.x}${item.y}`}).indexOf(`${newX}${newY}`) === -1) {
            randomDivArray.push(newXY);
            $(`.search-div${grid}.x-${newX}.y-${newY}`).addClass('trap');
        }
    }
    buryTreasure(grid);
}



const buryTreasure = (grid) => { 
    treasureX = Math.floor(Math.random() * grid);
    treasureY = Math.floor(Math.random() * grid);
    let treasureXY = {'x': treasureX, 'y': treasureY};
    if (randomDivArray.map((item)=> { return `${item.x}${item.y}`}).indexOf(`${treasureX}${treasureY}`) === -1) {
        $(`div.search-div${grid}.x-${treasureX}.y-${treasureY}`).addClass('treasure');
    } else {
        buryTreasure(grid)
    }
    
}

////////////////
//  Choosing difficulty / Initializing game play
/////////////////

$('button').on('click', (event)=>{
    const level = event.currentTarget.innerText;
    $('.search-area').empty();
    $('.search-area').css('background-image', 'url(img/desert_island.jpg)')
    randomDivArray.splice(0,randomDivArray.length);
    $('.heart').show();
    life = 3;
    clicks = 0;
    
    switch(level) {
        case "Easy":
            createSearchArea(10);
            levelClass = 10;
            break;
        case "Intermediate":
            createSearchArea(20);
            levelClass = 20;
            break;
        case "Hard":
            createSearchArea(40);
            levelClass = 40;
            break;
    }
    distance = Math.sqrt(Math.pow(levelClass/2, 2)*2);
    //console.log(levelClass)
});

/////////////////
// Event Handlers
///////////////

const foundTreasure = () => {
    $('.search-area').empty();
    $('.search-area').css('background-image', 'none');
    $('.search-area').html(`<h1>Congratulations!! You found the treasure!!</h1><h3>It took you ${clicks} clicks and ${time} seconds.</h3>`);
    resetGame();
}

const hitTrap = (x, y) => {
    life--;
    switch(life) {
        case 2:
            $('#heart_3').hide();
            alert(`You hit a trap.\nYou have ${life} lives left`);
            break;
        case 1:
            $('#heart_2').hide();
            alert(`You hit a trap.\nYou have ${life} lives left`);
            break;
        case 0:
            $('#heart_1').hide();
            alert(`You hit a trap.\nYou have ${life} lives left`);
            $('.search-area').empty();
            $('.search-area').css('background-image', 'none');
            $('.search-area').html(`<h1>Game Over!!!</h1>`);
            resetGame();
            break;
    }
    getDistance(x, y);
}

const getDistance = (x,y) => {
    const newDistance = Math.sqrt(Math.pow((treasureX-x), 2) + Math.pow((treasureY-y), 2));
    newDistance < distance ? alert("You're getting warmer"): alert("You're getting colder");
    distance = newDistance;
}

resetGame = () => {
    clicks = 0;
    clearInterval();
    time = 0;
}

/////////////////
//  Event listener
/////////////////

$(document).on('click', '.search-div', (event)=>{
    console.log(levelClass)
    const $currentDiv = event.currentTarget;
    // $currentDiv.css('background-color', 'black');
    clicks++;
    console.log(clicks)
    const classArr = $currentDiv.className.split(' ');
    const currentX = classArr[2].split('')[2];
    const currentY = classArr[3].split('')[2];
    if (clicks = 1) {
        setInterval(time++, 1000);
    }
    if (classArr.indexOf('treasure') !== -1){
        foundTreasure();
    } else if (classArr.indexOf('trap') !== -1) {
        hitTrap(currentX, currentY);
    } else {
        getDistance(currentX, currentY);
    }
    console.log($currentDiv.className.split(' '))
})