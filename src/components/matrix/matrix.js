export function schools(id, schools) {
    let table2 = require('./table2.json')
    for (var item in table2) {
        if ((table2[item]["学校编号"] == id) && schools.indexOf(id)) {
            schools.push(id);
            break;
        }
    }
}

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
    // console.log('1',schools)
    let data = [];
    let table2 = require('./table2.json');
    for (let index in schools) {
        for (let item in table2) {
            let tmp = [];
            if(schools[index]==table2[item]["学校编号"]){
                let labels=["学校编号","学校名称","城市评分","知名度评分","双一流评分","电子科学与技术","信息与通信工程","控制科学与工程","计算机科学与技术","软件工程","第四次学科评估评分","电子科学与技术1","信息与通信工程1","控制科学与工程1","计算机科学与技术1","软件工程1"];
                for(let i in labels){
                    tmp.push(table2[item][labels[i]]);
                }
                tmp.push("评估总分");
                data.push(tmp);
            }
        };
    };
    // console.log('data',data)
    return data;
}

export function modifyMatrixData(data,weight){
    let modifieddata = [];
    let max = [184.83,94.6,91,1,1,1,1,1,97.55,9,9,9,9,9];
    let weightsocres = [];

    weightsocres.push(weight['cityScore']);
    weightsocres.push(weight['reputationScore']);
    weightsocres.push(weight['doubleFirstClassScore']);
    weightsocres.push(weight['electronicsScienceAndTechnology']);
    weightsocres.push(weight['informationAndCommunicationEngineering']);
    weightsocres.push(weight['controlScienceAndEngineering']);
    weightsocres.push(weight['computerScienceAndTechnology']);
    weightsocres.push(weight['softwareEngineering']);
    weightsocres.push(weight['curriculumJudgement4th']);
    weightsocres.push(weight['electronicsScienceAndTechnology']);
    weightsocres.push(weight['informationAndCommunicationEngineering']);
    weightsocres.push(weight['controlScienceAndEngineering']);
    weightsocres.push(weight['computerScienceAndTechnology']);
    weightsocres.push(weight['softwareEngineering']);
    //归一化：当前值/max*100； 加总分：sum（当前值/最大值*权重）
    for(let index in data){
        let score = 0;
        let tmp = [];
        tmp.push(data[index][0]);
        tmp.push(data[index][1]);
        for(let i = 2;i<16;i++){
            tmp.push((data[index][i]/max[i-2])*100);
            score = score + (data[index][i]/max[i-2])*weightsocres[i-2];
        }
        tmp.push(score);
        modifieddata.push(tmp);
    }
    //排序
    modifieddata.sort(function(x,y){
        return x[16]-y[16];
    });
    console.log("modifieddata",modifieddata)
    return modifieddata;
}

export function getYLables(modifieddata){
    let YLables = [];
    for(let index in modifieddata){
        YLables.push(modifieddata[index][1]);
    }
    // console.log(YLables);
    return YLables;
}

export function getSchoolsIds(modifieddata){
    let SchoolsIds = [];
    for(let index in modifieddata){
        SchoolsIds.push(modifieddata[index][0]);
    }
    return SchoolsIds;
}

export function getHeatMapData(modifieddata){
    let HeatMapData = [];
    let HeatMap = [];
    for(let index in modifieddata){
        let tmp = [];
        for(let i = 2;i<16;i++){
            tmp.push(modifieddata[index][i]);
        }
        HeatMapData.push(tmp);
    }
    for(let i = 0;i<HeatMapData.length;i++){
        for(let n = 0;n<HeatMapData[i].length;n++){
            if(HeatMapData[i][n]==0){
                HeatMap.push([n,i,'-']);
            }else{
                HeatMap.push([n,i,HeatMapData[i][n]]);
            }
            
        }
    }
    // console.log(HeatMap);
    return HeatMap;
}