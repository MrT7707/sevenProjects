const imgs = [
    'https://images.unsplash.com/photo-1508768787810-6adc1f613514?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e27f6661df21ed17ab5355b28af8df4e&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1519981593452-666cf05569a9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=90ed8055f06493290dad8da9584a13f7&auto=format&fit=crop&w=715&q=80',
    'https://images.unsplash.com/photo-1486899430790-61dbf6f6d98b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8ecdee5d1b3ed78ff16053b0227874a2&auto=format&fit=crop&w=1002&q=80',
    'https://images.unsplash.com/photo-1510942201312-84e7962f6dbb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=da4ca7a78004349f1b63f257e50e4360&auto=format&fit=crop&w=1050&q=80',
]

const scrollContainer = document.querySelector('.container')

let currentIndex = 0;

function createItem(index){
    const imgUrl = imgs[index];
    const item = document.createElement('div');
    item.classList.add('item');
    item.innerHTML = `<img src="${imgUrl}" />`;
    scrollContainer.appendChild(item)
    return item
}

function resetElements(){
    scrollContainer.innerHTML ='';
    const prevIndex = currentIndex - 1 < 0 ? imgs.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex + 1 > imgs.length - 1 ? 0 : currentIndex + 1;
    createItem(prevIndex).classList.add('pre');
    createItem(currentIndex).classList.add('cur');
    createItem(nextIndex).classList.add('next');
}

resetElements();

let isAnimating = false;

scrollContainer.addEventListener('wheel', e => {
    if(!e.deltaY){
        return
    }
    if(isAnimating){
        return
    }
    isAnimating = true

    if(e.deltaY > 0){
        scrollContainer.classList.add('scroll-down');
        currentIndex = currentIndex + 1 > imgs.length - 1 ? 0 : currentIndex + 1;
    }else{
        scrollContainer.classList.add('scroll-up');
        currentIndex = currentIndex - 1 < 0 ? imgs.length - 1 : currentIndex - 1;
    }
})


scrollContainer.addEventListener('transitionend', () => {
    isAnimating = false;
    scrollContainer.classList.remove('scroll-down');
    scrollContainer.classList.remove('scroll-up');
    resetElements()
})
