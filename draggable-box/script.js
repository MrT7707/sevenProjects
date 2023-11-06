const container = document.querySelector('.container')
let source;

container.ondragstart = (e) => {
    // 设置拖拽鼠标样式
    e.dataTransfer.effectAllowed = e.target.dataset.effect
    source = e.target
    console.log('start', e.target)
}

container.ondragover = (e) => {
    e.preventDefault()
    // console.log('over', e.target)
}

function getDropNode(node){
    while(node){
        if(node?.dataset?.drop){
            return node
        }
        node = node.parentNode
    }
}

function clearDropStyle(){
    const dropNodes = document.querySelectorAll('.drop-over')
    dropNodes.forEach((node) => {
        node.classList.remove('drop-over')
    })
}

container.ondragenter = (e) => {
    clearDropStyle()
    const dropNode = getDropNode(e.target)
    if(!dropNode){
        return
    }
    if( e.dataTransfer.effectAllowed === dropNode?.dataset?.drop){
        dropNode.classList.add('drop-over')
    }
    console.log('enter', e.target)
}

container.ondrop = (e) => {
    // 一般div、td是不允许有元素置于他们上面，在ondragover设置组织冒泡
    console.log('drop', e.target)

    clearDropStyle()
    const dropNode = getDropNode(e.target)
    if(!dropNode){
        return
    }
    if(e.dataTransfer.effectAllowed !== dropNode.dataset.drop){
        return
    }
    if(dropNode.dataset.drop === 'copy'){
        dropNode.innerHTML = ''
        const cloned = source.cloneNode(true)
        cloned.dataset.effect = 'move'
        dropNode.appendChild(cloned)
    }else{
       source.remove()
    }
}

