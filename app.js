console.log("Let's find some treasure!!");  //verify files are linked
console.log($); //verify files are linked

//////////////
//  Function to generate divs for search area
/////////////
const $searchArea = $('.search-area');

const createSearchArea = (gridSize) => {
    for (let i = 0; i < gridSize; i++) {
        const $newRow = $('<div>').addClass(`row`).attr('id', `row-${i}`);
        for (let j = 0; j < gridSize; j++) {
            const $newSearchDiv = $('<div>').addClass(`search-div`).addClass(`x-${j}`).addClass(`y-${i}`);
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
        console.log(newXY);
        if (randomDivArray.map((item)=> { return `${item.x}${item.y}`}).indexOf(`${newX}${newY}`) === -1) {
            randomDivArray.push(newXY);
            $(`.search-div.x-${newX}.y-${newY}`).addClass('trap');
        }
    }
    console.log(randomDivArray);
    buryTreasure(grid);
}



const buryTreasure = (grid) => { 
    let treasureX = Math.floor(Math.random() * grid);
    let treasureY = Math.floor(Math.random() * grid);
    let treasureXY = {'x': treasureX, 'y': treasureY};
    if (randomDivArray.map((item)=> { return `${item.x}${item.y}`}).indexOf(`${treasureX}${treasureY}`) === -1) {
        $(`div.search-div.x-${treasureX}.y-${treasureY}`).addClass('treasure');
    } else {
        buryTreasure(grid)
    }
    
    // const $treasureDiv = $('<div>').addClass('treasure');
    // $treasureDiv.append('<p>treasure</p>')
    // $treasureDiv.appendTo(`div#${Math.floor(Math.random() * grid)},${Math.floor(Math.random() * grid)}`);
    // console.log($treasureDiv)
}

createSearchArea(10);
// hideTraps(10);
// buryTreasure(10);