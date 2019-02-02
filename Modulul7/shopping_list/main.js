const add = document.getElementById('add');
const inp = document.getElementById('input');
const l = document.getElementById('lista');
const fin = document.getElementById('final');

add.addEventListener('click', addElement);
inp.addEventListener('keypress', function (eveniment) {
    if (eveniment.key === "Enter") {
        addElement();
    }
})

function addElement() {
    var li = document.createElement('li');
    var del = document.createElement('button');
    var edit = document.createElement('button');
    var submit = document.createElement('button');
    var span = document.createElement('span');

    if (input.value === "") {
        return;
    }

    span.innerText = input.value;
    edit.innerText = "edit";
    del.innerText = 'delete';
    del.addEventListener('click', function () {
        delElement(li);
    })

    submit.innerText = "submit";
    edit.addEventListener('click', function () {
        submit.hidden = true;
        span.innerHTML = '<input value="' + span.innerText + '">';
        span.addEventListener('keypress', function (eveniment) {
            if (eveniment.key === "Enter") {
                span.innerHTML = span.children[0].value;
                submit.hidden = false;
            }
        })
    })
    submit.addEventListener('click', function () {
        for (let i = 0; i < 3; i++) {
            li.removeChild(li.firstChild.nextSibling);
        }
        li.classList.add('fin');
        fin.appendChild(li);
        var list = Array.from(document.getElementsByClassName('fin'));
        list.sort((a, b) => {
            if (a.innerText > b.innerText) {
                return 1
            };
            if (a.innerText < b.innerText) {
                return -1
            };
            if (a.innerText === b.innerText) {
                return 0
            }
        });

        list.forEach((element) => {
            fin.appendChild(element);
        })
    })
    li.appendChild(span);
    li.appendChild(del);
    li.appendChild(edit);
    li.appendChild(submit);
    lista.appendChild(li);

    input.value = '';
}

function delElement(element) {
    element.parentNode.removeChild(element);
}

