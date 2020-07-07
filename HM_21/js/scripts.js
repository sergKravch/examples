window.onload = function (){

    var box = document.querySelectorAll('.box-wrap');
 
    for(let i = 0; i < box.length; i++){
        box[i].querySelector('.box-counter-text').innerHTML = localStorage.getItem('local' + i) || 0;
        box[i].style.backgroundColor = localStorage.getItem('local color ' + i) || '#fff';
        box[i].addEventListener('click', (function(i){

            return function (event){
                var that = event.target;

                if(that.classList.contains('btn-plus')){
                    incrementCounter(i, this);
                }
            }
            
            function incrementCounter(i, self){
                let counter = self.querySelector('.box-counter-text'),
                    count = self.querySelector('.box-counter-text').innerHTML;
 
                counter.innerHTML = ++count;
                
                let bgColor = checkValue(counter.innerHTML);
                self.style.backgroundColor = bgColor;
                localStorage['local' + i] = counter.innerHTML;
                localStorage['local color ' + i] = bgColor;
            }
        })(i));
    }

    let clearCount = document.querySelector('.clear-count');

    clearCount.addEventListener('click', function(){
         for(let j = 0; j < box.length; j++){
            delete localStorage['local' + j];
            delete localStorage['local color ' + j];
            box[j].querySelector('.box-counter-text').innerHTML = 0;
        }
    });

    let setCounter = document.querySelector('.set-count');

    setCounter.addEventListener('click', function(){
        let modal = document.querySelector('.modal-container'),
            quantityCounter = document.querySelectorAll('.box-counter-text'),
            list = document.createElement('ul');
        modal.classList.add('active');
        list.classList.add('main-list');

        modal.appendChild(renderModal(quantityCounter, list));
    });

    const modalBtn = document.querySelector('.modal-btn-set');

    modalBtn.addEventListener('click', () => {
        let listCounts = document.querySelectorAll('.inner-item');
        for(let i = 0; i < listCounts.length; i++){
            let newCount = box[i].querySelector('.box-counter-text');
            let newCountValue = listCounts[i].querySelector('input').value;
            if(isNumeric(newCountValue)){
                let bgColor = checkValue(newCountValue);
                newCount.innerText = newCountValue;
                newCount.parentNode.style.backgroundColor = bgColor;
                localStorage['local' + i] = newCountValue;
                localStorage['local color ' + i] = bgColor;
            }
        }
        removeList();
    });

    let closeModal = document.querySelector('.modal-close');
    closeModal.addEventListener('click', removeList);

    function removeList (){
        let modal = document.querySelector('.modal-container'),
            list = document.querySelector('.main-list');
        modal.classList.remove('active');
        modal.removeChild(list);
    }

    	
    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function renderModal(quantityCounter, list) {

        for(let i = 0; i < quantityCounter.length; i++){
            let listItem = document.createElement('li'),
                listItemLabel = document.createElement('label'),
                listItemText = document.createElement('span'),
                listItemInput = document.createElement('input');
            listItem.classList.add('inner-item');
            
            listItemText.classList.add('list-id');
            listItemLabel.innerText = 'set counter for block with id - ';
            listItemLabel.appendChild(listItemText);
            listItem.appendChild(listItemLabel);
            listItem.appendChild(listItemInput);
            listItemText.innerText = `${quantityCounter[i].id}`;
            list.appendChild(listItem);
        }

        return list;
    }

    function checkValue(counter) {
        let x = randomColor(0, 256),
        y = randomColor(0, 256),
        z = randomColor(0, 256)
        defaultColor = 'lightblue';
    
        let bgColor = counter >= 50 ? defaultColor : `rgb(${x}, ${y}, ${z})`;
        return bgColor;
    }

    function randomColor(min, max) {
        return Math.round((Math.random() * (max - min) + min));
    }

}

