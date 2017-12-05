function getElectricity(Imi,Ima,QcAssemble,HtAssemble,days,monthbeginVal,monthEndVal,eff1,eff2,Ql,QgAssemble,lossAssemble,min){
    var indexArr = [];
    var jArr = [];
    var lossArr = [];
    var tmpArr;
    var n1;
    var n1Arr = [];;
    var index;
    for(var j = Imi;j < Ima;j += 0.00001){
        lossArr = []
        for(var i = monthbeginVal;i <= monthEndVal;i++){
            QgAssemble["Qg" + i] = monthArray[i] * j * HtAssemble["Ht" + i] * eff1 * eff2;
            lossAssemble["loss" + i] = QgAssemble["Qg" + i] - QcAssemble["Qc" + i]
            lossArr.push(lossAssemble["loss" + i])
        }
        tmpArr = [];
        sum = 0;
        min = 0;
        for(var k = 0;k < lossArr.length;k++){
            if(lossArr[k] < 0){
                tmpArr.push(lossArr[k])
            } else {
                if(tmpArr.length > 0) {
                    sum = Sum(tmpArr);
                    min = Math.min(sum,min);
                    tmpArr = [];
                    if((sum + lossArr[k] < 0)){
                        tmpArr.push(sum + lossArr[k])
                    }
                    sum = 0;  
                }
            }
        }
        sum = 0;
        if(tmpArr.length >= 1){
            sum = Sum(tmpArr);
            min = Math.min(sum,min)
        }
        n1 = Math.abs(sum) / Ql;
        n1Arr.push(n1)
        index = Math.abs(n1-days);
        indexArr.push(index)
        jArr.push(j)
    }
    // console.log(QgAssemble)
    // console.log(min)
    // console.log(lossArr)
    let indexMin = Math.min.apply(null, indexArr)
    lossArr = []
    for(var i = 0;i<indexArr.length;i++) {
    	if(indexMin == indexArr[i]) {
            for(var j = monthbeginVal;j <= monthEndVal;j++){
                QgAssemble["Qg" + j] = monthArray[j] * jArr[i] * HtAssemble["Ht" + j] * eff1 * eff2;
                lossAssemble["loss" + j] = QgAssemble["Qg" + j] - QcAssemble["Qc" + j]
                lossArr.push(lossAssemble["loss" + j])
            }
            tmpArr = [];
            sum = 0;
            min = 0;
            for(var k = 0;k < lossArr.length;k++){
                if(lossArr[k] < 0){
                    tmpArr.push(lossArr[k])
                } else {
                    if(tmpArr.length > 0) {
                        sum = Sum(tmpArr);
                        min = Math.min(sum,min);
                        tmpArr = [];
                        if((sum + lossArr[k] < 0)){
                            tmpArr.push(sum + lossArr[k])
                        }
                        sum = 0;  
                    }
                }
            }
            sum = 0;
            if(tmpArr.length >= 1){
                sum = Sum(tmpArr);
                min = Math.min(sum,min)
            }
            // console.log(lossArr)
            // console.log(i)
            // console.log(jArr[i])
            n1 = n1Arr[i]
            // console.log(n1)
            // console.log(QgAssemble)
            // console.log(min)
            return [jArr[i] + 0.00001,min];
            break;
    	}
    }
}
function Sum(arr) {
    var sum = 0;
    arr.forEach(function (item) {
        sum += item;
    });
    return sum;
};
