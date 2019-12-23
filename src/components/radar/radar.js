export function getIds(id, schoolids) {
    let idList = schoolids.slice();
    for (let index in idList) {
        if (id == idList[index]) {
            return idList;
        }
    }
    if(id == ''){
        return idList;
    }
    idList.push(id);
    return idList;
}

export function getSchoolsNames(schoolsids) {
    let schoolsNames = [];
    let table5 = require('./tabel4.json');
    for (let index in schoolsids) {
        for (let i in table5) {
            if (schoolsids[index] == table5[i]["学校编号"]) {
                schoolsNames.push(table5[i]["学校名称"]);
            }
        }
    }
    return schoolsNames;
}


export function getData(ids) {
    console.log(ids)
    let data = [];
    let table5 = require('./tabel4.json');
    let color1 = ['rgba(102,130,255, 1)','rgba(96,216,235, 1)','rgba(255,182,193, 1)','rgba(133,235,68, 1)','rgba(255,234,6, 1)'];
    let color2 = ['rgba(102,130,255, 0.4)','rgba(96,216,235, 0.4)','rgba(255,182,193, 0.4)','rgba(133,235,68,  0.4)','rgba(255,234,6, 0.4)'];
    let color3 = ['rgba(102,130,255,0.3)','rgba(96,216,235,0.3)','rgba(255,182,193, 0.3)','rgba(133,235,68,  0.3)','rgba(255,234,6, 0.3)'];
    let n = 0;
    for (let index in ids) {

        let tmp = {};

        if (ids[index] == '') {
            continue;
        }
        for (let i in table5) {
            if (ids[index] == table5[i]['学校编号']) {
                let name = null;
                let value = [];
                value.push(table5[i]["城市评分"]);
                value.push(table5[i]["知名度评分"]);
                value.push(table5[i]["双一流评分"]);
                value.push(table5[i]["双一流学科数"]);
                value.push(table5[i]["第四次学科评估评分"]);

                name = table5[i]["学校名称"];

                tmp = {
                    value: value,
                    name: name,
                    itemStyle: {
                        normal: {
                            color: color1[n],
                            borderColor: color2[n],
                            borderWidth: 10
                        }
                    },
                    areaStyle: {
                        normal: {
                            "color": color3[n]
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: color1[n],
                            width: 2,
                        }
                    },
                }
                n++;
            }
        }
        if (tmp != null) {

            data.push(tmp);
        }
    }
    return data;
}