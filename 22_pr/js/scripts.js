window.onload = function (){

    let data = [
        { title: 'Title1', size: 100, img: 'https://images.unsplash.com/photo-1541233349642-6e425fe6190e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' , cost: 300}, 
        { title: 'Title2', size: 200, img: 'https://images.unsplash.com/photo-1486989813814-da4a10a6fc7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',cost: 250 }, 
        { title: 'Title2', size: 150, img: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80', cost: 200 },
    ],
        container = document.querySelector('.container');

    class ViewController {
        constructor(item, container){
            this.item = item;
            this.container = container;
        }
        renderList(data, container) {
            container.innerHTML = renderGrid(data);
        }
    };

    var renderRender = new ViewController(data, container)

    renderRender.renderList(data, container);

    let searchName = document.querySelector('#search-name'),
        searchPrice = document.querySelector('#search-price'),
        clearAllFilter = document.querySelector('.clear-filter');

    searchName.addEventListener('input', searchProductByName);
    searchPrice.addEventListener('input', searchProductByPrice);
    clearAllFilter.addEventListener('click', clearFilter);

    function searchProductByName (event){
        let filteredArr = data.filter(item => item.title.includes(event.target.value));
        container.innerHTML = renderGrid(filteredArr);
    };

    function searchProductByPrice (event){
        if(_isNumber(event.target.value)){
            let filteredArr = data.filter(item => item.cost >= event.target.value);
            container.innerHTML = renderGrid(filteredArr);
        }
    };

    function clearFilter (){
        container.innerHTML = renderGrid(data);
    };

    function renderGrid (filteredArr){
        let grid;
        return grid = `
            <div class="grid-container">
                ${filteredArr.map(item => `
                    <div class="box-wrap">
                        <p class="item-title">${item.title}</p>
                        <p class="item-cost">${item.cost}</p>
                        <img src='${item.img} alt='${item.title}' class="box-img" style="width: ${item.size}px"'>
                    </div>
                `)}
            </div>
        `;
    };

    _isNumber = number => !isNaN(parseFloat(number)) && isFinite(number);
}

