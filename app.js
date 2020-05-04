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
            const $newSearchDiv = $('<div>').addClass('search-div').attr('id', `${j},${i}`);
            $newSearchDiv.append(`<p>${j},${i}</p>`);
            $searchArea.append($newRow);
            $newRow.append($newSearchDiv);
        }
    }
}

createSearchArea(10);