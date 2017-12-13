var monthArray = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function getElectricity(Imi, Ima, QcAssemble, HtAssemble, days, monthbeginVal, monthEndVal, eff1, eff2, QgAssemble, lossAssemble, min, Qk) {
    var indexArr = [];
    var jArr = [];
    var lossArr = [];
    var tmpArr;
    var n1;
    var n1Arr = [];;
    var index;
    var minArr = [];
    var QcArr;
    var NiArr;
    var QcSum = 0;
    var NiSum = 0;
    for (var j = Imi; j < Ima; j += 0.0001) {
        lossArr = []
        QcArr = [];
        NiArr = [];
        QcSum = 0;
        NiSum = 0;
        for (var i = monthbeginVal; i <= monthEndVal; i++) {
            QgAssemble["Qg" + i] = monthArray[i - 1] * j * HtAssemble["Ht" + i] * eff1 * eff2;
            lossAssemble["loss" + i] = QgAssemble["Qg" + i] - QcAssemble["Qc" + i]
            lossArr.push(lossAssemble["loss" + i]);
            if (lossAssemble["loss" + i] < 0) {
                QcArr.push(QcAssemble["Qc" + i]);
                NiArr.push(monthArray[i - 1])
            }
        }
        if (QcArr.length > 0) {
            for (var s = 0; s <= QcArr.length - 1; s++) {
                QcSum += +QcArr[s];
                NiSum += NiArr[s]
            }
        }
        tmpArr = [];
        sum = 0;
        min = 0;
        for (var k = 0; k < lossArr.length; k++) {
            if (lossArr[k] < 0) {
                tmpArr.push(lossArr[k])
            } else {
                if (tmpArr.length > 0) {
                    sum = Sum(tmpArr);
                    min = Math.min(sum, min);
                    tmpArr = [];
                    if ((sum + lossArr[k] < 0)) {
                        tmpArr.push(sum + lossArr[k])
                    }
                    sum = 0;
                }
            }
        }
        sum = 0;
        if (tmpArr.length >= 1) {
            sum = Sum(tmpArr);
            min = Math.min(sum, min)
        }
        Qk = QcSum / NiSum;
        n1 = Math.abs(min) / Qk;

        n1Arr.push(n1) //天数比较值
        index = Math.abs(n1 - days); //天数差值
        indexArr.push(index) //
        jArr.push(j); //电流值
        minArr.push(min)
    }
    let indexMin = Math.min.apply(null, indexArr)
    lossArr = []
    for (var r = 0; r < indexArr.length; r++) {
        if (indexMin == indexArr[r]) {
            QcArr = [];
            NiArr = [];
            QcSum = 0;
            NiSum = 0;
            for (var h = monthbeginVal; h <= monthEndVal; h++) {
                QgAssemble["Qg" + h] = monthArray[h - 1] * jArr[r] * HtAssemble["Ht" + h] * eff1 * eff2;
                lossAssemble["loss" + h] = QgAssemble["Qg" + h] - QcAssemble["Qc" + h]
                lossArr.push(lossAssemble["loss" + h])
                if (lossAssemble["loss" + h] < 0) {
                    QcArr.push(+QcAssemble["Qc" + h]);
                    NiArr.push(monthArray[h - 1])
                }
            }
            // console.log(QcArr)
            for (var t = 0; t <= QcArr.length - 1; t++) {
                QcSum = QcSum + QcArr[t];
                NiSum = NiSum + NiArr[t]
            }
            tmpArr = [];
            sum = 0;
            min = 0;
            for (var l = 0; l < lossArr.length; l++) {
                if (lossArr[l] < 0) {
                    tmpArr.push(lossArr[l])
                } else {
                    if (tmpArr.length > 0) {
                        sum = Sum(tmpArr);
                        min = Math.min(sum, min);
                        tmpArr = [];
                        if ((sum + lossArr[l] < 0)) {
                            tmpArr.push(sum + lossArr[l])
                        }
                        sum = 0;
                    }
                }
            }
            sum = 0;
            if (tmpArr.length >= 1) {
                sum = Sum(tmpArr);
                min = Math.min(sum, min)
            }
            Qk = QcSum / NiSum;
            n1 = Math.abs(min) / Qk
            return [jArr[r] + 0.00001, min, Qk];
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