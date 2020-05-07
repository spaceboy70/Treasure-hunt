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

const createSearchArea = (gridSize) => {
    for (let i = 0; i < gridSize; i++) {
        const $newRow = $('<div>').addClass(`row`).attr('id', `row-${i}`);
        for (let j = 0; j < gridSize; j++) {
            const $newSearchDiv = $('<div>').addClass('search-div').addClass(`search-div${gridSize}`).addClass(`x-${j}`).addClass(`y-${i}`);
            $newSearchDiv.append(`<p>${j},${i}</p>`);
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
    let treasureX = Math.floor(Math.random() * grid);
    let treasureY = Math.floor(Math.random() * grid);
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
    //console.log(levelClass)
});


/////////////////
//  Event listener
/////////////////

$(`.search-div`).on('click', (event)=>{
    console.log(levelClass)
    console.log(event.currentTarget)
});
