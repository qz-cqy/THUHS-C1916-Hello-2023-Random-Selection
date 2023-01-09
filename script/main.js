function getQueryVariable(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return '-1';
}
function choice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
let arr = new Array();
let vis = new Array();
let weight = new Array();
let chosen = 0;
function load() {
    if(arr.length == 0) {
        let html = '';
        html += `<p>还没有数据。</p>`;
        document.getElementById('show-weight').innerHTML = html;
    }
    else {
        let html = '';
        let n = arr.length;
        html += `<table class='no-border'>`;
        for(let i = 0; i < n; i++) {
            if(i % 10 == 0) html += `<tr class='no-border'>`;
            html += `<td class="student ${vis[i] ? "unavailable" : "available"}">${arr[i]}(${weight[i]})</td>`;
            if(i % 10 == 9 || i == n - 1) html += `</tr>`;
        }
        html += `</table>`
        document.getElementById('show-weight').innerHTML = html;
    }
}
function init() {
    let L = parseInt(document.getElementById('range-minimum').value);
    let R = parseInt(document.getElementById('range-maximum').value);
    if (L > R) {
        let html = '';
        html += `<p style='color: red;'>请检查你的输入！</p>`;
        document.getElementById('result-init').innerHTML = html;
    }
    else if (R - L + 1 > 100) {
        let html = '';
        html += `<p style='color: red;'>范围过大！（不能超过 100）</p>`;
        document.getElementById('result-init').innerHTML = html;
    }
    else {
        arr = new Array();
        vis = new Array();
        weight = new Array();
        for (let i = L; i <= R; i++) {
            arr.push(i);
            vis.push(0);
            weight.push(1);
        }
        let html = '';
        html += `<p style='color: blue;'>修改成功！已修改为 ${L}~${R}</p>`;
        document.getElementById('result-init').innerHTML = html;
        load();
    }
    setTimeout(function () {
        document.getElementById('result-init').innerHTML = '';
    }, 2000);
}
function generate() {
    let tmp = new Array();
    let n = arr.length;
    for(let i = 0; i < n; i++) {
        if(!vis[i]) {
            for(let j = 0; j < weight[i]; j++) {
                tmp.push(i);
            }
        }
    }
    if(tmp.length == 0) {
        let html = '';
        html += `<p style='color: red;'>没有可抽取的！</p>`;
        chosen = 0;
        document.getElementById('regenerate').disabled = true;
        document.getElementById("display-area").innerHTML = html;
        document.getElementById('regenerate').disabled = false;
    }
    else {
        let lucky = choice(tmp);
        let html = '';
        html += `幸运的是：<div class='lucky'>${arr[lucky]}</div>号！`;
        chosen = 0;
        document.getElementById('regenerate').disabled = true;
        let intv = setInterval(function () {
            let lucky_t = choice(tmp);
            let html_t = '';
            html_t += `幸运的是：<div class='lucky'>${arr[lucky_t]}</div>号！`;
            document.getElementById("display-area").innerHTML = html_t;
        }, 100);
        setTimeout(function () {
            clearInterval(intv);
            chosen = lucky;
            document.getElementById("display-area").innerHTML = html;
            document.getElementById('regenerate').disabled = false;
        }, 2000);
    }
}
function mark() {
    if(!chosen) return;
    vis[chosen] = 1;
    load();
}
function modify() {
    let id = parseInt(document.getElementById('student-id').value);
    let ok = parseInt(document.getElementById('available').value);
    let wt = parseInt(document.getElementById('new-weight').value);
    if(ok != 0 && ok != 1) return;
    if(wt < 0 || wt > 10) return;
    let n = arr.length;
    for(let i = 0; i < n; i++) {
        if(arr[i] == id) {
            vis[i] = ok ^ 1;
            weight[i] = wt;
        }
    }
    load();
}