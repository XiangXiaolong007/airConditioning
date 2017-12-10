var monthArray = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function getElectricity(Imi,Ima,QcAssemble,HtAssemble,days,monthbeginVal,monthEndVal,eff1,eff2,Ql,QgAssemble,lossAssemble,min){
    var indexArr = [];
    var jArr = [];
    var lossArr = [];
    var tmpArr;
    var n1;
    var n1Arr = [];;
    var index;
    var minArr = [];
    console.log(Imi)
    console.log(Ima)
    for(var j = Imi;j < Ima;j += 0.00001){
        lossArr = []
        for(var i = monthbeginVal;i <= monthEndVal;i++){
            QgAssemble["Qg" + i] = monthArray[i-1] * j * HtAssemble["Ht" + i] * eff1 * eff2;
            lossAssemble["loss" + i] = QgAssemble["Qg" + i] - QcAssemble["Qc" + i]
            lossArr.push(lossAssemble["loss" + i])
        }
        //console.log(lossArr)
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
        n1 = Math.abs(min) / Ql;
        
        n1Arr.push(n1)      //天数比较值
        index = Math.abs(n1-days);  //天数差值
        indexArr.push(index)    //
        jArr.push(j);   //电流值
        minArr.push(min)
        // console.log(min)
    }

    // console.log(QgAssemble)
     console.log(jArr)
    // console.log(n1Arr)
    // console.log(lossArr)
    let indexMin = Math.min.apply(null, indexArr)
    console.log(indexMin)
    lossArr = []
    for(var r = 0;r<indexArr.length;r++) {
    	if(indexMin == indexArr[r]) {
            console.log(r)
            console.log(minArr[r])
            for(var h = monthbeginVal;h <= monthEndVal;h++){
                QgAssemble["Qg" + h] = monthArray[h-1] * jArr[r] * HtAssemble["Ht" + h] * eff1 * eff2;
                lossAssemble["loss" + h] = QgAssemble["Qg" + h] - QcAssemble["Qc" + h]
                lossArr.push(lossAssemble["loss" + h])
            }
            console.log(lossAssemble)
            tmpArr = [];
            sum = 0;
            min = 0;
            for(var l = 0;l < lossArr.length;l++){
                if(lossArr[l] < 0){
                    tmpArr.push(lossArr[l])
                } else {
                    if(tmpArr.length > 0) {
                        sum = Sum(tmpArr);
                        min = Math.min(sum,min);
                        tmpArr = [];
                        if((sum + lossArr[l] < 0)){
                            tmpArr.push(sum + lossArr[l])
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
            n1 = Math.abs(min) / Ql
             console.log(n1)
            // console.log(QgAssemble)
             console.log(min)
             console.log(sum)
             console.log(Ql)
            return [jArr[r] + 0.00001,min];
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
