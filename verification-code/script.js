// 获取dom
const fieldList = document.querySelectorAll('.field-item');
const fieldInput = document.querySelector('.field-input');

// 监听input输入事件，只支持输入数字，过滤非数字字符
fieldInput.addEventListener('input', function (e) {
    const v = e.target.value.replace(/[^\d]/g, '');
    e.target.value = v;
    // 考虑粘贴情况，循环赋值
    for (let i = 0; i < 6; i++) {
        fieldList[i].innerHTML = v[i] || '';
    }
    // 移除旧光标
    removeCursor();
    // 计算新光标出现位置
    calcCursorPosition();
});

// focus
fieldInput.addEventListener('focus', function (e) {
    calcCursorPosition();
});

// blur
fieldInput.addEventListener('blur', function (e) {
    removeCursor();
});

// 计算光标出现位置
function calcCursorPosition() {
    const length = fieldInput.value.length;
    if (length < 6) {
        fieldList[length].classList.add('field-item-focus');
    }
}

// 移除光标
function removeCursor() {
    // 最后一位没有光标，?.操作符避免报错
    document.querySelector('.field-item-focus')?.classList.remove('field-item-focus');
}
