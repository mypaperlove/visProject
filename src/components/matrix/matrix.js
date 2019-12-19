
export function deleteRow(list, i) {
    let data = [];
    let copylist = list.slice();
    for (var n = 0; n < copylist.length; n++) {
        if (copylist[n][1] != i) {
            data.push(copylist[n]);
        }
    }
    return data;
}

export function getMatrixdata(schools) {
    console.log('1',schools)
    let data = [];
    let table2 = require('./table2.json');
    for (let index in schools) {
        for (let item in table2) {
            let tmp = [];
            if(schools[index]==table2[item]["学校编号"]){
                let labels=["学校编号","学校名称","城市评分","知名度评分","双一流评分","电子科学与技术","信息与通信工程","控制科学与工程","计算机科学与技术","软件工程","第四次学科评估评分","电子科学与技术","信息与通信工程","控制科学与工程","计算机科学与技术","软件工程"];
                for(let i in labels){
                    tmp.push(table2[item][labels[i]]);
                }
                tmp.push("评估总分");
                data.push(tmp);
            }
        };
    };
    console.log('data',data)
    return data;
}

export function getYLables(id, schools) {
    let table3 = require('./table3.json')
    for (var item in table3) {
        if ((table3[item]["学校编号"] == id) && schools.indexOf(id)) {
            schools.push(id);
            break;
        }
    }
}