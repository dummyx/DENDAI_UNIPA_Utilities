﻿function main(array, le) {
    var fontB = document.getElementsByClassName('fontB');
    var infodiv = document.querySelectorAll(".jugyo-info.jugyo-normal");
    var bre

    for (let index = 0; index < infodiv.length; index++) {
        // 番号づけ 
        infodiv[index].id = "jugyo-id" + index;

        // クローン
        var details_element = document.createElement('details');
        let clone = document.querySelector(`#jugyo-id` + index).cloneNode(true);
        let fontB_element = clone;

        // 学生時間割と授業時間割の場合分け
        var times;
        if (document.querySelectorAll("span[class=ui-menuitem-text]")[36].textContent.endsWith("学生時間割表")) {
            times = 6;
        } else {
            times = 5;
        }

        // 子要素をコピー
        for (let _index = 0; _index < fontB_element.children.length + times; _index += 1) {
            if (fontB_element.children[0] === undefined) {
                bre = true;
                break;
            }
            details_element.appendChild(fontB_element.children[0]);
            bre = false;
        }
        if (bre) {
            continue;
        }

        // idとclassを追加
        details_element.classList.add("jugyo-info", "jugyo-normal", "fontB-id" + index);
        details_element.querySelector(`.fontB`).id = "fontB-id" + index;

        // 書き換え
        var infodiv2 = document.getElementById('jugyo-id' + index);
        infodiv2.replaceWith(details_element);

        /*==============================================================*/

        clone = document.querySelector(`#fontB-id` + index).cloneNode(true);
        fontB_element = document.createElement('summary');
        fontB_element.append(clone.textContent);

        for (let _index = 0; _index < clone.className.split(' ').length; _index++) {
            fontB_element.classList.add(clone.className.split(' ')[_index]);
        }

        var fontBdiv2 = document.querySelector('#fontB-id' + index);
        fontBdiv2.replaceWith(fontB_element);
    }


    //===================================================
    //非表示
    for (let index = 0; index < fontB.length; index++) {
        for (let index2 = 0; index2 < /*array.*/le/*ngth*/; index2++) {
            if (fontB[index].textContent.startsWith(array[index2])) {
                fontB[index].parentNode.classList.add('delete_info');
            }
        }
    }
    //===================================================

}

function main2() {
    var fontB = document.getElementsByClassName('fontB');
    var infodiv = document.querySelectorAll(".jugyo-info.jugyo-normal");
    var bre

    for (let index = 0; index < infodiv.length; index++) {
        infodiv[index].id = "jugyo-id" + index;

        var details_element = document.createElement('div');
        let clone = document.querySelector(`#jugyo-id` + index).cloneNode(true);
        let fontB_element = clone;

        var times;
        if (document.querySelectorAll("span[class=ui-menuitem-text]")[36].textContent.endsWith("学生時間割表")) {
            times = 6;
        } else {
            times = 5;
        }
        for (let _index = 0; _index < fontB_element.children.length + times; _index += 1) {
            if (fontB_element.children[0] === undefined) {
                bre = true;
                break;
            }
            details_element.appendChild(fontB_element.children[0]);
            bre = false;
        }
        if (bre) {
            continue;
        }

        details_element.classList.add("jugyo-info", "jugyo-normal", "fontB-id" + index);
        details_element.querySelector(`.fontB`).id = "fontB-id" + index;

        var infodiv2 = document.getElementById('jugyo-id' + index);
        infodiv2.replaceWith(details_element);

        /*==============================================================*/

        clone = document.querySelector(`#fontB-id` + index).cloneNode(true);
        fontB_element = document.createElement('div');
        fontB_element.append(clone.textContent);
        for (let _index = 0; _index < clone.className.split(' ').length; _index++) {
            fontB_element.classList.add(clone.className.split(' ')[_index]);
        }
        var fontBdiv2 = document.querySelector('#fontB-id' + index);
        fontBdiv2.replaceWith(fontB_element);
    }
}

function main3() {
    chrome.storage.local.get(function (item) {
        array = item.kamoku
        var le = array.length;
        main(array, le);
    });
}

// 初期実行
main3();
tt_kouki();

//表示ボタン
//let boxes = document.querySelectorAll("span")[62] // document.querySelectorAll("span")[56,61];

for (let n = 35; n <= 50; n++) {
    var texthold = document.querySelectorAll("span[class=ui-menuitem-text]")[n];
    if (texthold === undefined) {
        continue;
    }
    if (texthold.textContent.endsWith("時間割表") || texthold.textContent.endsWith("シラバス検索") || texthold.textContent.endsWith("成績照会")) {
        var textEnd = texthold.textContent;
        var boxes = document.querySelectorAll("span[class=ui-menuitem-text]")[n].parentNode;
        break;
    } else {
        var textEnd = "";
    }
}

let element;
let afel = document.createElement("div");

//========================
element = document.createElement('button');
element.type = 'button';
if (textEnd.endsWith("時間割表")) {
    afel.className = "inner"
    element.innerText = "修得済科目非表示";
    element.onclick = main3;
} else if (textEnd.endsWith("シラバス検索")) {
    afel.className = "innerA"
    element.innerText = "検索条件を指定";
    element.onclick = function () {
        document.getElementById('funcForm:j_idt172:0').click();
    };
} else if (textEnd.endsWith("成績照会")) {
    afel.className = "innerA"
    element.innerText = "まとめて表示";
    element.onclick = function () {
        document.getElementById('funcForm:initPtn:0').click();
    };
}
element.id = "btmain";
afel.appendChild(element);// boxes.after(element);
//========================

//========================
element = document.createElement('button');
element.type = 'button';
if (textEnd.endsWith("時間割表")) {
    element.innerText = "全科目表示"
    element.onclick = main2;
} else if (textEnd.endsWith("シラバス検索")) {
    element.innerText = "ｶﾘｷｭﾗﾑﾂﾘｰ照会";
    element.onclick = function () {
        document.getElementById('funcForm:j_idt172:1').click();
    };
} else if (textEnd.endsWith("成績照会")) {
    element.innerText = "年度学期表示";
    element.onclick = function () {
        document.getElementById('funcForm:initPtn:1').click();
    };
}
element.id = "btmain2";
afel.appendChild(element);// boxes.after(element);
//========================

if (textEnd.endsWith("シラバス検索")) {
    element = document.createElement('button');
    element.type = 'button';
    element.id = "btmain3";
    element.className = 'inner3'
    element.innerText = "表示"
    element.onclick = btn35;
    afel.appendChild(element);
}
if (textEnd.endsWith("時間割表") || textEnd.endsWith("シラバス検索") || textEnd.endsWith("成績照会")) {
    boxes.after(afel);
}
if (textEnd.endsWith("時間割表")) {
    element = document.createElement('button');
    element.type = 'button';
    element.id = "btmain3";
    element.className = 'inner2'
    element.innerText = "表示"
    element.onclick = btn33;
    boxes.after(element);
}


function btn33() {
    document.getElementById('funcForm:search').click();
    setTimeout(function () { main3(); }, 1500);

}

function btn35() {
    if (document.getElementById('funcForm:j_idt172:1').checked) {
        document.getElementById('funcForm:j_idt266').click();
    }
}

//===================================================
//後期
function tt_kouki() {
    chrome.storage.local.get(
        ['gakki'],
        function (value_gakki) {
            if (textEnd.endsWith("学生時間割表") && value_gakki.gakki == 2) {
                console.log("後期")
                document.querySelectorAll("div[class=ofAuto]")[0].classList.add("delete_info");
            }
        }
    );
}
