const container = document.getElementById('container')
container.innerHTML = container.textContent.split('').map((i) => `<span>${i}</span>`).join('')

function getCurvePoints (curveFunc, range, number, xLength){
     if(number < 1){
        return []
     }
     if(number === 1){
        return [0]
     }
     const piece = (range[1] - range[0]) / (number - 1)
     const result = []
     const scale = xLength / (range[1] - range[0])
     for(let i=0; i< number; i++){
        result.push(-curveFunc(i * piece) * scale)
     }
     return result
}

function createCurve(func,range){
    const points = getCurvePoints(
        func,
        range, 
        container.children.length, 
        container.clientWidth
    )
    for(let i = 0; i<points.length; i++){
        container.children[i].style.transform = `translateY(${points[i]}px)`
    }
}

// createCurve((x) => Math.sin(x), [0, 2 * Math.PI])
createCurve((x) => x, [0, 100])