"use strict";
$(function () {
	function Sum(arr) {
		let sum = 0;
		arr.forEach(function (item) {
			sum += item;
		});
		return sum;
	};

	function getElectricity(Imi, Ima, t4, t5, t6, t7, t8, t9, t10) {
		let indexArr = [];
		let iArr = [];
		let n1Arr = [];
		for (var i = Imi; i < Ima; i += 0.00001) {
			//console.log(i)
			Qg4 = april * i * t4 * eff1 * eff2;
			Qg5 = may * i * t5 * eff1 * eff2;
			Qg6 = june * i * t6 * eff1 * eff2;
			Qg7 = july * i * t7 * eff1 * eff2;
			Qg8 = august * i * t8 * eff1 * eff2;
			Qg9 = september * i * t9 * eff1 * eff2;
			Qg10 = october * i * t10 * eff1 * eff2;
			lossApril = Qg4 - Qc4;
			lossMay = Qg5 - Qc5;
			lossJune = Qg6 - Qc6;
			lossJuly = Qg7 - Qc7;
			lossAugust = Qg8 - Qc8;
			lossSeptember = Qg9 - Qc9;
			lossOctober = Qg10 - Qc10;
			lossArr = [];
			lossArr.push(lossApril, lossMay, lossJune, lossJuly, lossAugust, lossSeptember, lossOctober);
			//console.log(lossArr);
			tmpArr = [];
			sum = 0;
			min = 0;
			for (var j = 0; j < lossArr.length; j++) {
				if (lossArr[j] < 0) {
					tmpArr.push(lossArr[j])
				} else {
					if (tmpArr.length > 0) {
						sum = Sum(tmpArr);
						min = Math.min(sum, min);
						tmpArr = [];
						if ((sum + lossArr[j] < 0)) {
							tmpArr.push(sum + lossArr[j])
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

			//console.log(sum)
			//console.log(min)

			n1 = Math.abs(sum) / btnQl;
			n1Arr.push(n1)
			let index = Math.abs(n1 - days);
			// console.log(index)
			indexArr.push(index)
			//console.log(indexArr)
			// indexArr.some(function (n) {
			// 	if (n < 0.1) {
			// 		console.log(i);
			// 		//electricity = i;
			// 		return true
			// 	}
			// })
			iArr.push(i)
			//console.log(i+0.00001)
		}
		// indexArr.some(function (n,i) {
		// 	if (n < 0.1) {
		// 		console.log(iArr[i]);
		// 		//electricity = i;
		// 		return true
		// 	}
		// })
		console.log(lossArr);
		console.log(min)
		let indexMin = Math.min.apply(null, indexArr)
		lossArr = []
		for(var i = 0;i<indexArr.length;i++) {
			if(indexMin == indexArr[i]) {
				console.log(iArr[i])
				n1 = n1Arr[i]
				Qg4 = april * iArr[i] * t4 * eff1 * eff2;
				Qg5 = may * iArr[i] * t5 * eff1 * eff2;
				Qg6 = june * iArr[i] * t6 * eff1 * eff2;
				Qg7 = july * iArr[i] * t7 * eff1 * eff2;
				Qg8 = august * iArr[i] * t8 * eff1 * eff2;
				Qg9 = september * iArr[i] * t9 * eff1 * eff2;
				Qg10 = october * iArr[i] * t10 * eff1 * eff2;
				lossApril = Qg4 - Qc4;
				lossMay = Qg5 - Qc5;
				lossJune = Qg6 - Qc6;
				lossJuly = Qg7 - Qc7;
				lossAugust = Qg8 - Qc8;
				lossSeptember = Qg9 - Qc9;
				lossOctober = Qg10 - Qc10;
				lossArr.push(lossApril, lossMay, lossJune, lossJuly, lossAugust, lossSeptember, lossOctober);
				console.log(lossArr);
				tmpArr = [];
				sum = 0;
				min = 0;
				for (var j = 0; j < lossArr.length; j++) {
					if (lossArr[j] < 0) {
						tmpArr.push(lossArr[j])
					} else {
						if (tmpArr.length > 0) {
							sum = Sum(tmpArr);
							min = Math.min(sum, min);
							tmpArr = [];
							if ((sum + lossArr[j] < 0)) {
								tmpArr.push(sum + lossArr[j])
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
				return iArr[i] + 0.00001;
			}
		}

		// console.log(indexArr.length)
		// for (var i = Imi; i < Ima; i += 0.00001) {
		// 	//console.log(i)
		// 	Qg4 = april * i * t4 * eff1 * eff2;
		// 	Qg5 = may * i * t5 * eff1 * eff2;
		// 	Qg6 = june * i * t6 * eff1 * eff2;
		// 	Qg7 = july * i * t7 * eff1 * eff2;
		// 	Qg8 = august * i * t8 * eff1 * eff2;
		// 	Qg9 = september * i * t9 * eff1 * eff2;
		// 	Qg10 = october * i * t10 * eff1 * eff2;
		// 	lossApril = Qg4 - Qc4;
		// 	lossMay = Qg5 - Qc5;
		// 	lossJune = Qg6 - Qc6;
		// 	lossJuly = Qg7 - Qc7;
		// 	lossAugust = Qg8 - Qc8;
		// 	lossSeptember = Qg9 - Qc9;
		// 	lossOctober = Qg10 - Qc10;
		// 	lossArr = [];
		// 	lossArr.push(lossApril, lossMay, lossJune, lossJuly, lossAugust, lossSeptember, lossOctober);
		// 	//console.log(lossArr);
		// 	tmpArr = [];
		// 	sum = 0;
		// 	min = 0;
		// 	for (var j = 0; j < lossArr.length; j++) {
		// 		if (lossArr[j] < 0) {
		// 			tmpArr.push(lossArr[j])
		// 		} else {
		// 			if (tmpArr.length > 0) {
		// 				sum = Sum(tmpArr);
		// 				min = Math.min(sum, min);
		// 				tmpArr = [];
		// 				if ((sum + lossArr[j] < 0)) {
		// 					tmpArr.push(sum + lossArr[j])
		// 				}
		// 				sum = 0;
		// 			}
		// 		}
		// 	}
		// 	sum = 0;
		// 	if (tmpArr.length >= 1) {
		// 		sum = Sum(tmpArr);
		// 		min = Math.min(sum, min)
		// 	}

		// 	//console.log(sum)
		// 	//console.log(min)

		// 	n1 = Math.abs(sum) / btnQl;

		// 	let index = Math.abs(n1 - days);
		// 	// console.log(index)
		// 	//indexArr.push(index)
		// 	//console.log(indexArr)
		// 	if (index == indexMin) {
		// 		console.log(i);
		// 		//electricity = i;
		// 		console.log(min)

		// 		return i + 0.00001;
		// 	}
		// 	//console.log(i+0.00001)
		// }

	}
	//console.log(1)
	let q; //冷指标
	let k; //系数
	let h; //空调开启时长
	let z; //建筑层数
	let Nmax; //最大月天数
	let Qmax; //最大月冷负荷
	//let Q6;						//6月总冷负荷
	let Q4; //4月总冷负荷
	let Q5; //5月总冷负荷
	let Q6; //6月总冷负荷
	let Q7; //7月总冷负荷
	let Q8; //8月总冷负荷
	let Q9; //9月总冷负荷
	let Q10; //10月总冷负荷
	let scale; //制冷机组能耗占整个空调系统能耗的比例
	let K4; //4月份系数
	let K5; //5月份系数
	let K6; //6月份系数
	let K7; //7月份系数
	let K8; //8月份系数
	let K9; //9月份系数
	let K10; //10月份系数
	let COP; //智能机组性能系数
	let voltage; //蓄电池工作电压
	let days; //蓄电池维持天数
	let Qc4; //单位建筑面积空调系统4月耗电量
	let Qc5; //单位建筑面积空调系统5月耗电量
	let Qc6; //单位建筑面积空调系统6月耗电量
	let Qc7; //单位建筑面积空调系统7月耗电量
	let Qc8; //单位建筑面积空调系统8月耗电量
	let Qc9; //单位建筑面积空调系统9月耗电量
	let Qc10; //单位建筑面积空调系统10月耗电量
	let april; //4月份天数
	let may; //5月份天数
	let june; //6月份天数；
	let july; //7月份天数
	let august; //8月份天数
	let september; //9月份天数
	let october; //10月份天数
	let btnQl; //单位面积空调系统年日均耗电量
	let Hz4; //空调期4月水平面日均太阳直射辐射量
	let Hz5; //空调期5月水平面日均太阳直射辐射量
	let Hz6; //空调期6月水平面日均太阳直射辐射量
	let Hz7; //空调期7月水平面日均太阳直射辐射量
	let Hz8; //空调期8月水平面日均太阳直射辐射量
	let Hz9; //空调期9月水平面日均太阳直射辐射量
	let Hz10; //空调期10月水平面日均太阳直射辐射量
	let Hs4; //4月日均散射辐射量
	let Hs5; //5月日均散射辐射量
	let Hs6; //6月日均散射辐射量
	let Hs7; //7月日均散射辐射量
	let Hs8; //8月日均散射辐射量
	let Hs9; //9月日均散射辐射量
	let Hs10; //10月日均散射辐射量
	let dip; //倾角
	let azimuth; //倾斜面方位角
	let A, C;
	let a_4, a_5, a_6, a_7, a_8, a_9, a_10;
	let d4, d5, d6, d7, d8, d9, d10;
	let b4, b5, b6, b7, b8, b9, b10;
	let a4, a5, a6, a7, a8, a9, a10;
	let B4, B5, B6, B7, B8, B9, B10;
	let Ws4, Ws5, Ws6, Ws7, Ws8, Ws9, Ws10;
	let sunangle4, sunangle5, sunangle6, sunangle7, sunangle8, sunangle9, sunangle10;
	let n4, n5, n6, n7, n8, n9, n10;
	let m4, m5, m6, m7, m8, m9, m10;
	let t4, t5, t6, t7, t8, t9, t10;
	let Wsr4, Wsr5, Wsr6, Wsr7, Wsr8, Wsr9, Wsr10;
	let Wss4, Wss5, Wss6, Wss7, Wss8, Wss9, Wss10;
	let sr4, sr5, sr6, sr7, sr8, sr9, sr10;
	let ss4, ss5, ss6, ss7, ss8, ss9, ss10;
	let G14, G15, G16, G17, G18, G19, G10;
	let G24, G25, G26, G27, G28, G29, G20;
	let G34, G35, G36, G37, G38, G39, G30;
	let G44, G45, G46, G47, G48, G49, G40;
	let G54, G55, G56, G57, G58, G59, G50;
	let G64, G65, G66, G67, G68, G69, G60;
	let D14, D15, D16, D17, D18, D19, D10; //D
	let R4, R5, R6, R7, R8, R9, R10; //倾斜面上各月平均太阳辐照量
	let reflectivity; //反射率
	let Ht4; //倾斜面上4月日均太阳辐射量
	let Ht5; //倾斜面上5月日均太阳辐射量
	let Ht6; //倾斜面上6月日均太阳辐射量
	let Ht7; //倾斜面上7月日均太阳辐射量
	let Ht8; //倾斜面上8月日均太阳辐射量
	let Ht9; //倾斜面上9月日均太阳辐射量
	let Ht10; //倾斜面上10月日均太阳辐射量
	let Hm; //倾斜面全年平均日总辐射量
	let eff1; //从方阵到蓄电池输入回路效率η1
	let eff2; //蓄电池到负载的输出回路效率η2
	let Imax; //单位建筑面积方阵输出的最大电流
	let Imin; //单位建筑面积方阵输出的最小电流
	let arrHt; //Ht的数组	
	let electricity; //实际工作电流
	let Qg4; //单位建筑面积方阵4月发电量
	let Qg5; //单位建筑面积方阵5月发电量
	let Qg6; //单位建筑面积方阵6月发电量
	let Qg7; //单位建筑面积方阵7月发电量
	let Qg8; //单位建筑面积方阵8月发电量
	let Qg9; //单位建筑面积方阵9月发电量
	let Qg10; //单位建筑面积方阵10月发电量
	let lossApril; //单位建筑面积4月发电盈亏量
	let lossMay; //单位建筑面积5月发电盈亏量
	let lossJune; //单位建筑面积6月发电盈亏量
	let lossJuly; //单位建筑面积7月发电盈亏量
	let lossAugust; //单位建筑面积8月发电盈亏量
	let lossSeptember; //单位建筑面积9月发电盈亏量
	let lossOctober; //单位建筑面积10月发电盈亏量
	let lossArr; //单位建筑面积各月发电盈亏量数组
	let n1; //决定方阵输出电流
	let sum;
	let tmpArr;
	let min;
	let roof; //建筑屋面类型，0是坡屋面，1是平屋面
	let Im; //单位建筑面积方阵输出电流
	let ImArr; //输出电流数组
	let dipmin; //最小倾角
	let dipmax; //最大倾角
	let bestDip; //最佳倾角
	let Bn; //单位面积电池容量
	let DOD; //蓄电池放电深度
	let safeEff; //安全系数
	let batteryU; //蓄电池充电电压
	let Pn; //单位建筑面积方阵容量Pn
	let Ud; //电压降
	let roof1; //光伏组件屋面安装方式
	let height; //太阳能电池组件高度
	let width; //太阳能电池组件宽度
	let Wp; //单片太阳能组件功率
	let areaEff; //光伏组件有效面价系数
	let Spv; //光伏组件投影面积
	let latitude; //当地纬度；
	let space; //光伏阵列前后排间距
	let spaceEff; //光伏组件间距系数
	let Pm; //光伏阵列最大安装容量
	let temperature //温度修正系数

	$("button").click(function () {
		q = $("#coolingIndex").val();
		k = $("#coefficient").val();
		h = $("#hour").val();
		z = $("#floor").val();
		Nmax = Number($("#Nmax").val());
		Qmax = q * h * Nmax * z * k;
		K4 = $("#k4").val();
		K5 = $("#k5").val();
		K6 = $("#k6").val();
		K7 = $("#k7").val();
		K8 = $("#k8").val();
		K9 = $("#k9").val();
		K10 = $("#k10").val();
		Q4 = Qmax * K4;
		Q5 = Qmax * K5;
		Q6 = Qmax * K6;
		Q7 = Qmax * K7;
		Q8 = Qmax * K8;
		Q9 = Qmax * K9;
		Q10 = Qmax * K10;
		scale = $("#scale").val();
		COP = $("#COP").val();
		voltage = Number($("#voltage").val());
		days = $("#days").val();
		Qc4 = Q4 / (COP * voltage * scale);
		Qc5 = Q5 / (COP * voltage * scale);
		Qc6 = Q6 / (COP * voltage * scale);
		Qc7 = Q7 / (COP * voltage * scale);
		Qc8 = Q8 / (COP * voltage * scale);
		Qc9 = Q9 / (COP * voltage * scale);
		Qc10 = Q10 / (COP * voltage * scale);
		april = Number($("#april").val());
		may = Number($("#may").val());
		june = Number($("#june").val());
		july = Number($("#july").val());
		august = Number($("#august").val());
		september = Number($("#september").val());
		october = Number($("#october").val());
		//console.log(typeof Qc4);
		btnQl = (Qc4 + Qc5 + Qc6 + Qc7 + Qc8 + Qc9 + Qc10) / (april + may + june + july + august + september + october);
		Hz4 = $("#Hz4").val();
		Hz5 = $("#Hz5").val();
		Hz6 = $("#Hz6").val();
		Hz7 = $("#Hz7").val();
		Hz8 = $("#Hz8").val();
		Hz9 = $("#Hz9").val();
		Hz10 = $("#Hz10").val();
		Hs4 = Number($("#Hs4").val());
		Hs5 = Number($("#Hs5").val());
		Hs6 = Number($("#Hs6").val());
		Hs7 = Number($("#Hs7").val());
		Hs8 = Number($("#Hs8").val());
		Hs9 = Number($("#Hs9").val());
		Hs10 = Number($("#Hs10").val());
		dip = Number($("#dip").val());
		azimuth = Number($("#azimuth").val());
		latitude = Number($("#latitude").val());
		reflectivity = Number($("#reflectivity").val());
		n4 = Number($("#n4").val());
		n5 = Number($("#n5").val());
		n6 = Number($("#n6").val());
		n7 = Number($("#n7").val());
		n8 = Number($("#n8").val());
		n9 = Number($("#n9").val());
		n10 = Number($("#n10").val());
		A = Math.cos(Math.PI / 180 * dip) + (Math.tan(Math.PI / 180 * latitude) * Math.cos(Math.PI / 180 * azimuth) * Math.sin(Math.PI / 180 * dip));
		sunangle4 = 23.45 * (Math.sin(Math.PI / 180 * (360 * (284 + n4) / 365)));
		sunangle5 = 23.45 * (Math.sin(Math.PI / 180 * (360 * (284 + n5) / 365)));
		sunangle6 = 23.45 * (Math.sin(Math.PI / 180 * (360 * (284 + n6) / 365)));
		sunangle7 = 23.45 * (Math.sin(Math.PI / 180 * (360 * (284 + n7) / 365)));
		sunangle8 = 23.45 * (Math.sin(Math.PI / 180 * (360 * (284 + n8) / 365)));
		sunangle9 = 23.45 * (Math.sin(Math.PI / 180 * (360 * (284 + n9) / 365)));
		sunangle10 = 23.45 * (Math.sin(Math.PI / 180 * (360 * (284 + n10) / 365)));
		//console.log(sunangle5)
		Ws4 = Math.acos((-(Math.tan(Math.PI / 180 * latitude)) * (Math.tan(Math.PI / 180 * sunangle4)))) * 180 / Math.PI;
		Ws5 = Math.acos((-(Math.tan(Math.PI / 180 * latitude)) * (Math.tan(Math.PI / 180 * sunangle5)))) * 180 / Math.PI;
		Ws6 = Math.acos((-(Math.tan(Math.PI / 180 * latitude)) * (Math.tan(Math.PI / 180 * sunangle6)))) * 180 / Math.PI;
		Ws7 = Math.acos((-(Math.tan(Math.PI / 180 * latitude)) * (Math.tan(Math.PI / 180 * sunangle7)))) * 180 / Math.PI;
		Ws8 = Math.acos((-(Math.tan(Math.PI / 180 * latitude)) * (Math.tan(Math.PI / 180 * sunangle8)))) * 180 / Math.PI;
		Ws9 = Math.acos((-(Math.tan(Math.PI / 180 * latitude)) * (Math.tan(Math.PI / 180 * sunangle9)))) * 180 / Math.PI;
		Ws10 = Math.acos((-(Math.tan(Math.PI / 180 * latitude)) * (Math.tan(Math.PI / 180 * sunangle10)))) * 180 / Math.PI;
		//console.log(Ws10)
		B4 = Math.cos(Math.PI / 180 * Ws4) * Math.cos(Math.PI / 180 * dip) + (Math.tan(Math.PI / 180 * sunangle4) * Math.sin(Math.PI / 180 * dip) * Math.cos(Math.PI / 180 * azimuth));
		B5 = Math.cos(Math.PI / 180 * Ws5) * Math.cos(Math.PI / 180 * dip) + (Math.tan(Math.PI / 180 * sunangle5) * Math.sin(Math.PI / 180 * dip) * Math.cos(Math.PI / 180 * azimuth));
		B6 = Math.cos(Math.PI / 180 * Ws6) * Math.cos(Math.PI / 180 * dip) + (Math.tan(Math.PI / 180 * sunangle6) * Math.sin(Math.PI / 180 * dip) * Math.cos(Math.PI / 180 * azimuth));
		B7 = Math.cos(Math.PI / 180 * Ws7) * Math.cos(Math.PI / 180 * dip) + (Math.tan(Math.PI / 180 * sunangle7) * Math.sin(Math.PI / 180 * dip) * Math.cos(Math.PI / 180 * azimuth));
		B8 = Math.cos(Math.PI / 180 * Ws8) * Math.cos(Math.PI / 180 * dip) + (Math.tan(Math.PI / 180 * sunangle8) * Math.sin(Math.PI / 180 * dip) * Math.cos(Math.PI / 180 * azimuth));
		B9 = Math.cos(Math.PI / 180 * Ws9) * Math.cos(Math.PI / 180 * dip) + (Math.tan(Math.PI / 180 * sunangle9) * Math.sin(Math.PI / 180 * dip) * Math.cos(Math.PI / 180 * azimuth));
		B10 = Math.cos(Math.PI / 180 * Ws10) * Math.cos(Math.PI / 180 * dip) + (Math.tan(Math.PI / 180 * sunangle10) * Math.sin(Math.PI / 180 * dip) * Math.cos(Math.PI / 180 * azimuth));
		//console.log(B6);
		C = (Math.sin(Math.PI / 180 * dip) * Math.sin(Math.PI / 180 * azimuth)) / Math.cos(Math.PI / 180 * latitude);
		//console.log(C)
		a4 = 0.409 + 0.5016 * Math.sin(Math.PI / 180 * (Ws4 - 60));
		a5 = 0.409 + 0.5016 * Math.sin(Math.PI / 180 * (Ws5 - 60));
		a6 = 0.409 + 0.5016 * Math.sin(Math.PI / 180 * (Ws6 - 60));
		a7 = 0.409 + 0.5016 * Math.sin(Math.PI / 180 * (Ws7 - 60));
		a8 = 0.409 + 0.5016 * Math.sin(Math.PI / 180 * (Ws8 - 60));
		a9 = 0.409 + 0.5016 * Math.sin(Math.PI / 180 * (Ws9 - 60));
		a10 = 0.409 + 0.5016 * Math.sin(Math.PI / 180 * (Ws10 - 60));
		//console.log(a4)
		b4 = 0.6609 - 0.4767 * Math.sin(Math.PI / 180 * (Ws4 - 60));
		b5 = 0.6609 - 0.4767 * Math.sin(Math.PI / 180 * (Ws5 - 60));
		b6 = 0.6609 - 0.4767 * Math.sin(Math.PI / 180 * (Ws6 - 60));
		b7 = 0.6609 - 0.4767 * Math.sin(Math.PI / 180 * (Ws7 - 60));
		b8 = 0.6609 - 0.4767 * Math.sin(Math.PI / 180 * (Ws8 - 60));
		b9 = 0.6609 - 0.4767 * Math.sin(Math.PI / 180 * (Ws9 - 60));
		b10 = 0.6609 - 0.4767 * Math.sin(Math.PI / 180 * (Ws10 - 60));
		// console.log(b4)
		d4 = Math.sin(Math.PI / 180 * Ws4) - (Math.PI / 180 * Ws4 * Math.cos(Math.PI / 180 * Ws4));
		d5 = Math.sin(Math.PI / 180 * Ws5) - (Math.PI / 180 * Ws5 * Math.cos(Math.PI / 180 * Ws5));
		d6 = Math.sin(Math.PI / 180 * Ws6) - (Math.PI / 180 * Ws6 * Math.cos(Math.PI / 180 * Ws6));
		d7 = Math.sin(Math.PI / 180 * Ws7) - (Math.PI / 180 * Ws7 * Math.cos(Math.PI / 180 * Ws7));
		d8 = Math.sin(Math.PI / 180 * Ws8) - (Math.PI / 180 * Ws8 * Math.cos(Math.PI / 180 * Ws8));
		d9 = Math.sin(Math.PI / 180 * Ws9) - (Math.PI / 180 * Ws9 * Math.cos(Math.PI / 180 * Ws9));
		d10 = Math.sin(Math.PI / 180 * Ws10) - (Math.PI / 180 * Ws10 * Math.cos(Math.PI / 180 * Ws10));
		// console.log(d4)
		a_4 = a4 - (Hs4 / Hz4);
		a_5 = a5 - (Hs5 / Hz5);
		a_6 = a6 - (Hs6 / Hz6);
		a_7 = a7 - (Hs7 / Hz7);
		a_8 = a8 - (Hs8 / Hz8);
		a_9 = a9 - (Hs9 / Hz9);
		a_10 = a10 - (Hs10 / Hz10);
		// console.log(a_4)
		m4 = Math.acos((A * B4 + (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B4, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
		m5 = Math.acos((A * B5 + (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B5, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
		m6 = Math.acos((A * B6 + (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B6, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
		m7 = Math.acos((A * B7 + (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B7, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
		m8 = Math.acos((A * B8 + (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B8, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
		m9 = Math.acos((A * B9 + (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B9, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
		m10 = Math.acos((A * B10 + (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B10, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
		// console.log(m7);
		t4 = Math.acos((A * B4 - (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B4, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
		t5 = Math.acos((A * B5 - (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B5, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
		t6 = Math.acos((A * B6 - (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B6, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
		t7 = Math.acos((A * B7 - (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B7, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
		t8 = Math.acos((A * B8 - (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B8, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
		t9 = Math.acos((A * B9 - (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B9, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
		t10 = Math.acos((A * B10 - (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B10, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
		// console.log(t4);
		Ws4 < t4 ? ss4 = Ws4 : ss4 = t4;
		Ws5 < t5 ? ss5 = Ws5 : ss5 = t5;
		Ws6 < t6 ? ss6 = Ws6 : ss6 = t6;
		Ws7 < t7 ? ss7 = Ws7 : ss7 = t7;
		Ws8 < t8 ? ss8 = Ws8 : ss8 = t8;
		Ws9 < t9 ? ss9 = Ws9 : ss9 = t9;
		Ws10 < t10 ? ss10 = Ws10 : ss10 = t10;
		//console.log(ss4)

		if (Ws4 < m4) {
			sr4 = Ws4
		} else {
			sr4 = m4
		}
		if (Ws5 < m5) {
			sr5 = Ws5
		} else {
			sr5 = m5
		}
		if (Ws6 < m6) {
			sr6 = Ws6
		} else {
			sr6 = m6
		}
		if (Ws7 < m7) {
			sr7 = Ws7
		} else {
			sr7 = m7
		}
		if (Ws8 < m8) {
			sr8 = Ws8
		} else {
			sr8 = m8
		}
		if (Ws9 < m9) {
			sr9 = Ws9
		} else {
			sr9 = m9
		}
		if (Ws10 < m10) {
			sr10 = Ws10
		} else {
			sr10 = m10
		}

		if (A > 0 & B4 > 0) {
			Wsr4 = -sr4;
			Wss4 = ss4
		} else if (A >= B4) {
			Wsr4 = -sr4;
			Wss4 = ss4
		} else {
			Wsr4 = sr4;
			Wss4 = -ss4
		}

		if (A > 0 & B5 > 0) {
			Wsr5 = -sr5
			Wss5 = ss5
		} else if (A >= B5) {
			Wsr5 = -sr5;
			Wss5 = ss5
		} else {
			Wsr5 = sr5;
			Wss5 = -ss5
		}
		if (A > 0 & B6 > 0) {
			Wsr6 = -sr6;
			Wss6 = ss6
		} else if (A >= B6) {
			Wsr6 = -sr6;
			Wss6 = ss6
		} else {
			Wsr6 = sr6;
			Wss6 = -ss6
		}
		if (A > 0 & B7 > 0) {
			Wsr7 = -sr7;
			Wss7 = ss7
		} else if (A >= B7) {
			Wsr7 = -sr7;
			Wss7 = ss7
		} else {
			Wsr7 = sr7;
			Wss7 = -ss7
		}
		if (A > 0 & B8 > 0) {
			Wsr8 = -sr8;
			Wss8 = ss8
		} else if (A >= B8) {
			Wsr8 = -sr8;
			Wss8 = ss8
		} else {
			Wsr8 = sr8;
			Wss8 = -ss8
		}
		if (A > 0 & B9 > 0) {
			Wsr9 = -sr9;
			Wss9 = ss9
		} else if (A >= B9) {
			Wsr9 = -sr9;
			Wss9 = ss9
		} else {
			Wsr9 = sr9;
			Wss9 = -ss9
		}
		if (A > 0 & B10 > 0) {
			Wsr10 = -sr10;
			Wss10 = ss10
		} else if (A >= B10) {
			Wsr10 = -sr10;
			Wss10 = ss10
		} else {
			Wsr10 = sr10;
			Wss10 = -ss10
		}
		G14 = 1 / (2 * d4) * ((b4 * A / 2 - (a_4 * B4)) * (Wss4 - Wsr4) * (Math.PI / 180) + ((a_4 * A - b4 * B4) * (Math.sin(Math.PI / 180 * Wss4) - Math.sin(Math.PI / 180 * Wsr4))) - (a_4 * C * (Math.cos(Math.PI / 180 * Wss4) - Math.cos(Math.PI / 180 * Wsr4))) + (b4 * A / 2 * (Math.sin(Math.PI / 180 * Wss4) * Math.cos(Math.PI / 180 * Wsr4) - (Math.sin(Math.PI / 180 * Wsr4) * Math.cos(Math.PI / 180 * Wsr4)))) + (b4 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss4), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr4), 2))))
		G15 = 1 / (2 * d5) * ((b5 * A / 2 - (a_5 * B5)) * (Wss5 - Wsr5) * (Math.PI / 180) + ((a_5 * A - b5 * B5) * (Math.sin(Math.PI / 180 * Wss5) - Math.sin(Math.PI / 180 * Wsr5))) - (a_5 * C * (Math.cos(Math.PI / 180 * Wss5) - Math.cos(Math.PI / 180 * Wsr5))) + (b5 * A / 2 * (Math.sin(Math.PI / 180 * Wss5) * Math.cos(Math.PI / 180 * Wsr5) - (Math.sin(Math.PI / 180 * Wsr5) * Math.cos(Math.PI / 180 * Wsr5)))) + (b5 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss5), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr5), 2))))
		G16 = 1 / (2 * d6) * ((b6 * A / 2 - (a_6 * B6)) * (Wss6 - Wsr6) * (Math.PI / 180) + ((a_6 * A - b6 * B6) * (Math.sin(Math.PI / 180 * Wss6) - Math.sin(Math.PI / 180 * Wsr6))) - (a_6 * C * (Math.cos(Math.PI / 180 * Wss6) - Math.cos(Math.PI / 180 * Wsr6))) + (b6 * A / 2 * (Math.sin(Math.PI / 180 * Wss6) * Math.cos(Math.PI / 180 * Wsr6) - (Math.sin(Math.PI / 180 * Wsr6) * Math.cos(Math.PI / 180 * Wsr6)))) + (b6 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss6), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr6), 2))))
		G17 = 1 / (2 * d7) * ((b7 * A / 2 - (a_7 * B7)) * (Wss7 - Wsr7) * (Math.PI / 180) + ((a_7 * A - b7 * B7) * (Math.sin(Math.PI / 180 * Wss7) - Math.sin(Math.PI / 180 * Wsr7))) - (a_7 * C * (Math.cos(Math.PI / 180 * Wss7) - Math.cos(Math.PI / 180 * Wsr7))) + (b7 * A / 2 * (Math.sin(Math.PI / 180 * Wss7) * Math.cos(Math.PI / 180 * Wsr7) - (Math.sin(Math.PI / 180 * Wsr7) * Math.cos(Math.PI / 180 * Wsr7)))) + (b7 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss7), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr7), 2))))
		G18 = 1 / (2 * d8) * ((b8 * A / 2 - (a_8 * B8)) * (Wss8 - Wsr8) * (Math.PI / 180) + ((a_8 * A - b8 * B8) * (Math.sin(Math.PI / 180 * Wss8) - Math.sin(Math.PI / 180 * Wsr8))) - (a_8 * C * (Math.cos(Math.PI / 180 * Wss8) - Math.cos(Math.PI / 180 * Wsr8))) + (b8 * A / 2 * (Math.sin(Math.PI / 180 * Wss8) * Math.cos(Math.PI / 180 * Wsr8) - (Math.sin(Math.PI / 180 * Wsr8) * Math.cos(Math.PI / 180 * Wsr8)))) + (b8 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss8), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr8), 2))))
		G19 = 1 / (2 * d9) * ((b9 * A / 2 - (a_9 * B9)) * (Wss9 - Wsr9) * (Math.PI / 180) + ((a_9 * A - b9 * B9) * (Math.sin(Math.PI / 180 * Wss9) - Math.sin(Math.PI / 180 * Wsr9))) - (a_9 * C * (Math.cos(Math.PI / 180 * Wss9) - Math.cos(Math.PI / 180 * Wsr9))) + (b9 * A / 2 * (Math.sin(Math.PI / 180 * Wss9) * Math.cos(Math.PI / 180 * Wsr9) - (Math.sin(Math.PI / 180 * Wsr9) * Math.cos(Math.PI / 180 * Wsr9)))) + (b9 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss9), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr9), 2))))
		G10 = 1 / (2 * d10) * ((b10 * A / 2 - (a_10 * B10)) * (Wss10 - Wsr10) * (Math.PI / 180) + ((a_10 * A - b10 * B10) * (Math.sin(Math.PI / 180 * Wss10) - Math.sin(Math.PI / 180 * Wsr10))) - (a_10 * C * (Math.cos(Math.PI / 180 * Wss10) - Math.cos(Math.PI / 180 * Wsr10))) + (b10 * A / 2 * (Math.sin(Math.PI / 180 * Wss10) * Math.cos(Math.PI / 180 * Wsr10) - (Math.sin(Math.PI / 180 * Wsr10) * Math.cos(Math.PI / 180 * Wsr10)))) + (b10 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss10), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr10), 2))))
		// console.log(G10)	
		G24 = 1 / (2 * d4) * ((b4 * A / 2 - (a_4 * B4)) * (Wss4 + Ws4) * (Math.PI / 180) + ((a_4 * A - b4 * B4) * (Math.sin(Math.PI / 180 * Wss4) - Math.sin(Math.PI / 180 * (-Ws4)))) - (a_4 * C * (Math.cos(Math.PI / 180 * Wss4) - Math.cos(Math.PI / 180 * (-Ws4)))) + (b4 * A / 2 * (Math.sin(Math.PI / 180 * Wss4) * Math.cos(Math.PI / 180 * (-Ws4)) - (Math.sin(Math.PI / 180 * (-Ws4)) * Math.cos(Math.PI / 180 * (-Ws4))))) + (b4 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss4), 2) - Math.pow(Math.sin(Math.PI / 180 * (-Ws4)), 2))))
		G25 = 1 / (2 * d5) * ((b5 * A / 2 - (a_5 * B5)) * (Wss5 + Ws5) * (Math.PI / 180) + ((a_5 * A - b5 * B5) * (Math.sin(Math.PI / 180 * Wss5) - Math.sin(Math.PI / 180 * (-Ws5)))) - (a_5 * C * (Math.cos(Math.PI / 180 * Wss5) - Math.cos(Math.PI / 180 * (-Ws5)))) + (b5 * A / 2 * (Math.sin(Math.PI / 180 * Wss5) * Math.cos(Math.PI / 180 * (-Ws5)) - (Math.sin(Math.PI / 180 * (-Ws5)) * Math.cos(Math.PI / 180 * (-Ws5))))) + (b5 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss5), 2) - Math.pow(Math.sin(Math.PI / 180 * (-Ws5)), 2))))
		G26 = 1 / (2 * d6) * ((b6 * A / 2 - (a_6 * B6)) * (Wss6 + Ws6) * (Math.PI / 180) + ((a_6 * A - b6 * B6) * (Math.sin(Math.PI / 180 * Wss6) - Math.sin(Math.PI / 180 * (-Ws6)))) - (a_6 * C * (Math.cos(Math.PI / 180 * Wss6) - Math.cos(Math.PI / 180 * (-Ws6)))) + (b6 * A / 2 * (Math.sin(Math.PI / 180 * Wss6) * Math.cos(Math.PI / 180 * (-Ws6)) - (Math.sin(Math.PI / 180 * (-Ws6)) * Math.cos(Math.PI / 180 * (-Ws6))))) + (b6 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss6), 2) - Math.pow(Math.sin(Math.PI / 180 * (-Ws6)), 2))))
		G27 = 1 / (2 * d7) * ((b7 * A / 2 - (a_7 * B7)) * (Wss7 + Ws7) * (Math.PI / 180) + ((a_7 * A - b7 * B7) * (Math.sin(Math.PI / 180 * Wss7) - Math.sin(Math.PI / 180 * (-Ws7)))) - (a_7 * C * (Math.cos(Math.PI / 180 * Wss7) - Math.cos(Math.PI / 180 * (-Ws7)))) + (b7 * A / 2 * (Math.sin(Math.PI / 180 * Wss7) * Math.cos(Math.PI / 180 * (-Ws7)) - (Math.sin(Math.PI / 180 * (-Ws7)) * Math.cos(Math.PI / 180 * (-Ws7))))) + (b7 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss7), 2) - Math.pow(Math.sin(Math.PI / 180 * (-Ws7)), 2))))
		G28 = 1 / (2 * d8) * ((b8 * A / 2 - (a_8 * B8)) * (Wss8 + Ws8) * (Math.PI / 180) + ((a_8 * A - b8 * B8) * (Math.sin(Math.PI / 180 * Wss8) - Math.sin(Math.PI / 180 * (-Ws8)))) - (a_8 * C * (Math.cos(Math.PI / 180 * Wss8) - Math.cos(Math.PI / 180 * (-Ws8)))) + (b8 * A / 2 * (Math.sin(Math.PI / 180 * Wss8) * Math.cos(Math.PI / 180 * (-Ws8)) - (Math.sin(Math.PI / 180 * (-Ws8)) * Math.cos(Math.PI / 180 * (-Ws8))))) + (b8 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss8), 2) - Math.pow(Math.sin(Math.PI / 180 * (-Ws8)), 2))))
		G29 = 1 / (2 * d9) * ((b9 * A / 2 - (a_9 * B9)) * (Wss9 + Ws9) * (Math.PI / 180) + ((a_9 * A - b9 * B9) * (Math.sin(Math.PI / 180 * Wss9) - Math.sin(Math.PI / 180 * (-Ws9)))) - (a_9 * C * (Math.cos(Math.PI / 180 * Wss9) - Math.cos(Math.PI / 180 * (-Ws9)))) + (b9 * A / 2 * (Math.sin(Math.PI / 180 * Wss9) * Math.cos(Math.PI / 180 * (-Ws9)) - (Math.sin(Math.PI / 180 * (-Ws9)) * Math.cos(Math.PI / 180 * (-Ws9))))) + (b9 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss9), 2) - Math.pow(Math.sin(Math.PI / 180 * (-Ws9)), 2))))
		G20 = 1 / (2 * d10) * ((b10 * A / 2 - (a_10 * B10)) * (Wss10 + Ws10) * (Math.PI / 180) + ((a_10 * A - b10 * B10) * (Math.sin(Math.PI / 180 * Wss10) - Math.sin(Math.PI / 180 * (-Ws10)))) - (a_10 * C * (Math.cos(Math.PI / 180 * Wss10) - Math.cos(Math.PI / 180 * (-Ws10)))) + (b10 * A / 2 * (Math.sin(Math.PI / 180 * Wss10) * Math.cos(Math.PI / 180 * (-Ws10)) - (Math.sin(Math.PI / 180 * (-Ws10)) * Math.cos(Math.PI / 180 * (-Ws10))))) + (b10 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss10), 2) - Math.pow(Math.sin(Math.PI / 180 * (-Ws10)), 2))))
		console.log(G24)
		G34 = 1 / (2 * d4) * ((b4 * A / 2 - (a_4 * B4)) * (Ws4 - Wsr4) * (Math.PI / 180) + ((a_4 * A - b4 * B4) * (Math.sin(Math.PI / 180 * Ws4) - Math.sin(Math.PI / 180 * Wsr4))) - (a_4 * C * (Math.cos(Math.PI / 180 * Ws4) - Math.cos(Math.PI / 180 * Wsr4))) + (b4 * A / 2 * (Math.sin(Math.PI / 180 * Ws4) * Math.cos(Math.PI / 180 * Wsr4) - (Math.sin(Math.PI / 180 * Wsr4) * Math.cos(Math.PI / 180 * Wsr4)))) + (b4 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Ws4), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr4), 2))))
		G35 = 1 / (2 * d5) * ((b5 * A / 2 - (a_5 * B5)) * (Ws5 - Wsr5) * (Math.PI / 180) + ((a_5 * A - b5 * B5) * (Math.sin(Math.PI / 180 * Ws5) - Math.sin(Math.PI / 180 * Wsr5))) - (a_5 * C * (Math.cos(Math.PI / 180 * Ws5) - Math.cos(Math.PI / 180 * Wsr5))) + (b5 * A / 2 * (Math.sin(Math.PI / 180 * Ws5) * Math.cos(Math.PI / 180 * Wsr5) - (Math.sin(Math.PI / 180 * Wsr5) * Math.cos(Math.PI / 180 * Wsr5)))) + (b5 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Ws5), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr5), 2))))
		G36 = 1 / (2 * d6) * ((b6 * A / 2 - (a_6 * B6)) * (Ws6 - Wsr6) * (Math.PI / 180) + ((a_6 * A - b6 * B6) * (Math.sin(Math.PI / 180 * Ws6) - Math.sin(Math.PI / 180 * Wsr6))) - (a_6 * C * (Math.cos(Math.PI / 180 * Ws6) - Math.cos(Math.PI / 180 * Wsr6))) + (b6 * A / 2 * (Math.sin(Math.PI / 180 * Ws6) * Math.cos(Math.PI / 180 * Wsr6) - (Math.sin(Math.PI / 180 * Wsr6) * Math.cos(Math.PI / 180 * Wsr6)))) + (b6 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Ws6), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr6), 2))))
		G37 = 1 / (2 * d7) * ((b7 * A / 2 - (a_7 * B7)) * (Ws7 - Wsr7) * (Math.PI / 180) + ((a_7 * A - b7 * B7) * (Math.sin(Math.PI / 180 * Ws7) - Math.sin(Math.PI / 180 * Wsr7))) - (a_7 * C * (Math.cos(Math.PI / 180 * Ws7) - Math.cos(Math.PI / 180 * Wsr7))) + (b7 * A / 2 * (Math.sin(Math.PI / 180 * Ws7) * Math.cos(Math.PI / 180 * Wsr7) - (Math.sin(Math.PI / 180 * Wsr7) * Math.cos(Math.PI / 180 * Wsr7)))) + (b7 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Ws7), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr7), 2))))
		G38 = 1 / (2 * d8) * ((b8 * A / 2 - (a_8 * B8)) * (Ws8 - Wsr8) * (Math.PI / 180) + ((a_8 * A - b8 * B8) * (Math.sin(Math.PI / 180 * Ws8) - Math.sin(Math.PI / 180 * Wsr8))) - (a_8 * C * (Math.cos(Math.PI / 180 * Ws8) - Math.cos(Math.PI / 180 * Wsr8))) + (b8 * A / 2 * (Math.sin(Math.PI / 180 * Ws8) * Math.cos(Math.PI / 180 * Wsr8) - (Math.sin(Math.PI / 180 * Wsr8) * Math.cos(Math.PI / 180 * Wsr8)))) + (b8 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Ws8), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr8), 2))))
		G39 = 1 / (2 * d9) * ((b9 * A / 2 - (a_9 * B9)) * (Ws9 - Wsr9) * (Math.PI / 180) + ((a_9 * A - b9 * B9) * (Math.sin(Math.PI / 180 * Ws9) - Math.sin(Math.PI / 180 * Wsr9))) - (a_9 * C * (Math.cos(Math.PI / 180 * Ws9) - Math.cos(Math.PI / 180 * Wsr9))) + (b9 * A / 2 * (Math.sin(Math.PI / 180 * Ws9) * Math.cos(Math.PI / 180 * Wsr9) - (Math.sin(Math.PI / 180 * Wsr9) * Math.cos(Math.PI / 180 * Wsr9)))) + (b9 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Ws9), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr9), 2))))
		G30 = 1 / (2 * d10) * ((b10 * A / 2 - (a_10 * B10)) * (Ws10 - Wsr10) * (Math.PI / 180) + ((a_10 * A - b10 * B10) * (Math.sin(Math.PI / 180 * Ws10) - Math.sin(Math.PI / 180 * Wsr10))) - (a_10 * C * (Math.cos(Math.PI / 180 * Ws10) - Math.cos(Math.PI / 180 * Wsr10))) + (b10 * A / 2 * (Math.sin(Math.PI / 180 * Ws10) * Math.cos(Math.PI / 180 * Wsr10) - (Math.sin(Math.PI / 180 * Wsr10) * Math.cos(Math.PI / 180 * Wsr10)))) + (b10 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Ws10), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr10), 2))))
		//console.log(G34)
		G44 = G24 + G34;
		G45 = G25 + G35;
		G46 = G26 + G36;
		G47 = G27 + G37;
		G48 = G28 + G38;
		G49 = G29 + G39;
		G40 = G20 + G30;
		//console.log(G44)
		0 > G14 ? G54 = 0 : G54 = G14;
		0 > G15 ? G55 = 0 : G55 = G15;
		0 > G16 ? G56 = 0 : G56 = G16;
		0 > G17 ? G57 = 0 : G57 = G17;
		0 > G18 ? G58 = 0 : G58 = G18;
		0 > G19 ? G59 = 0 : G59 = G19;
		0 > G10 ? G50 = 0 : G50 = G10;
		//console.log(G54)
		0 > G44 ? G64 = 0 : G64 = G44;
		0 > G45 ? G65 = 0 : G65 = G45;
		0 > G46 ? G66 = 0 : G66 = G46;
		0 > G47 ? G67 = 0 : G67 = G47;
		0 > G48 ? G68 = 0 : G68 = G48;
		0 > G49 ? G69 = 0 : G69 = G49;
		0 > G40 ? G60 = 0 : G60 = G40;
		//console.log(G64)
		Wss4 < Wsr4 ? D14 = G64 : D14 = G54;
		Wss5 < Wsr5 ? D15 = G65 : D15 = G55;
		Wss6 < Wsr6 ? D16 = G66 : D16 = G56;
		Wss7 < Wsr7 ? D17 = G67 : D17 = G57;
		Wss8 < Wsr8 ? D18 = G68 : D18 = G58;
		Wss9 < Wsr9 ? D19 = G69 : D19 = G59;
		Wss10 < Wsr10 ? D10 = G60 : D10 = G50;
		//console.log(D18)
		R4 = D14 + (Hs4 / (2 * Hz4) * (1 + Math.cos(Math.PI / 180 * dip))) + (reflectivity / 2 * (1 - Math.cos(Math.PI / 180 * dip)));
		R5 = D15 + (Hs5 / (2 * Hz5) * (1 + Math.cos(Math.PI / 180 * dip))) + (reflectivity / 2 * (1 - Math.cos(Math.PI / 180 * dip)));
		R6 = D16 + (Hs6 / (2 * Hz6) * (1 + Math.cos(Math.PI / 180 * dip))) + (reflectivity / 2 * (1 - Math.cos(Math.PI / 180 * dip)));
		R7 = D17 + (Hs7 / (2 * Hz7) * (1 + Math.cos(Math.PI / 180 * dip))) + (reflectivity / 2 * (1 - Math.cos(Math.PI / 180 * dip)));
		R8 = D18 + (Hs8 / (2 * Hz8) * (1 + Math.cos(Math.PI / 180 * dip))) + (reflectivity / 2 * (1 - Math.cos(Math.PI / 180 * dip)));
		R9 = D19 + (Hs9 / (2 * Hz9) * (1 + Math.cos(Math.PI / 180 * dip))) + (reflectivity / 2 * (1 - Math.cos(Math.PI / 180 * dip)));
		R10 = D10 + (Hs10 / (2 * Hz10) * (1 + Math.cos(Math.PI / 180 * dip))) + (reflectivity / 2 * (1 - Math.cos(Math.PI / 180 * dip)));
		//console.log(R6)

		Ht4 = R4 * Hz4;
		Ht5 = R5 * Hz5;
		Ht6 = R6 * Hz6;
		Ht7 = R7 * Hz7;
		Ht8 = R8 * Hz8;
		Ht9 = R9 * Hz9;
		Ht10 = R10 * Hz10;



		Hm = ((Ht4 * april) + (Ht5 * may) + (Ht6 * june) + (Ht7 * july) + (Ht8 * august) + (Ht9 * september) + (Ht10 * october)) / (april + may + june + july + august + september + october);

		eff1 = $("#eff-loop-one").val();
		eff2 = $("#eff-loop-two").val();
		Imin = btnQl / (Hm * eff1 * eff2);
		arrHt = [];
		arrHt.push(Ht4, Ht5, Ht6, Ht7, Ht8, Ht9, Ht10);
		//console.log(arrHt);
		let HtMin = Math.min.apply(null, arrHt);
		//console.log(HtMin);
		Imax = btnQl / (HtMin * eff1 * eff2);
		console.log(Imax)


		/*electricity = Number($("#electricity").val());
		Qg4 = april*electricity*Ht4*eff1*eff2;
		Qg5 = may*electricity*Ht5*eff1*eff2;
		Qg6 = june*electricity*Ht6*eff1*eff2;
		Qg7 = july*electricity*Ht7*eff1*eff2;
		Qg8 = august*electricity*Ht8*eff1*eff2;
		Qg9 = september*electricity*Ht9*eff1*eff2;
		Qg10 = october*electricity*Ht10*eff1*eff2;
		lossApril = Qg4 - Qc4;
		lossMay = Qg5 - Qc5;
		lossJune = Qg6 - Qc6;
		lossJuly = Qg7 - Qc7;
		lossAugust = Qg8 - Qc8;
		lossSeptember = Qg9 - Qc9;
		lossOctober = Qg10 - Qc10;
		
		
		
		
		lossArr = [];
		lossArr.push(lossApril,lossMay,lossJune,lossJuly,lossAugust,lossSeptember,lossOctober);
		console.log(lossArr);
		tmpArr = [];
		sum = 0;
		min = 0;
		for (var i = 0; i < lossArr.length; i++) {
		    if (lossArr[i] < 0) {
		        tmpArr.push(lossArr[i])
		    } else {
		        if (tmpArr.length > 0) {
		            sum = Sum(tmpArr);
		            min = Math.min(sum,min);
		            tmpArr = [];
		            if((sum + lossArr[i] < 0)){
		        		tmpArr.push(sum + lossArr[i])
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
		
		console.log(sum)
		console.log(min)
		
		n1 = Math.abs(sum)/btnQl;*/
		roof = $("#roof").val();
		dipmax = Number($("#dipmax").val())
		dipmin = Number($("#dipmin").val())
		DOD = Number($("#accumulator").val());
		safeEff = Number($("#safe-eff").val())
		//Bn = 
		batteryU = voltage * 1.2;
		$("#ub-number").text(function () {
			return batteryU
		});
		Ud = Number($("#voltageDrop").val());
		roof1 = Number($("#roof-1").val());
		height = Number($("#sunHeight").val());
		width = Number($("#sunWidth").val());
		Wp = Number($("#sunPower").val());
		areaEff = Number($("#usefulArea").val());

	})
	//计算6月份总冷负荷
	// $("#juneCooling").click(function(){
	// 	console.log(q);
	// 	$("#juneCooling-calculate").css("display","block");
	// 	$("#june-cooling-number").text(function(){
	// 		return Qmax
	// 	})
	// })
	//计算其他各月份总冷负荷
	// $("#elseCooling").click(function(){
	// 	$("#elseCooling-load").css("display","block");
	// 	$("#april-cooling-number").text(function(){
	// 		return Q4.toFixed(2)
	// 	});
	// 	$("#may-cooling-number").text(function(){
	// 		return Q5.toFixed(2)
	// 	});
	// 	$("#june1-cooling-number").text(function(){
	// 		return Q6.toFixed(2)
	// 	});
	// 	$("#july-cooling-number").text(function(){
	// 		return Q7.toFixed(2)
	// 	});
	// 	$("#august-cooling-number").text(function(){
	// 		return Q8.toFixed(2)
	// 	});
	// 	$("#september-cooling--number").text(function(){
	// 		return Q9.toFixed(2)
	// 	});
	// 	$("#october-cooling-number").text(function(){
	// 		return Q10.toFixed(2)
	// 	});
	// });
	//计算单位建筑面积空调系统各月耗电量Qc值
	// $("#Qc").click(function(){
	// 	$("#everyQc").css("display","block");
	// 	$("#Qc4").text(function(){
	// 		return Qc4.toFixed(2)
	// 	});
	// 	$("#Qc5").text(function(){
	// 		return Qc5.toFixed(2)
	// 	});
	// 	$("#Qc6").text(function(){
	// 		return Qc6.toFixed(2)
	// 	});
	// 	$("#Qc7").text(function(){
	// 		return Qc7.toFixed(2)
	// 	});
	// 	$("#Qc8").text(function(){
	// 		return Qc8.toFixed(2)
	// 	});
	// 	$("#Qc9").text(function(){
	// 		return Qc9.toFixed(2)
	// 	});
	// 	$("#Qc10").text(function(){
	// 		return Qc10.toFixed(2)
	// 	})
	// });
	//计算单位建筑面积空调系统年日均耗热量
	// $("#btn-Ql").click(function(){
	// 	//console.log(april)
	// 	$("#Ql-number").css("display","block");
	// 	$("#Ql").text(function(){
	// 		return btnQl.toFixed(2)
	// 	})
	// })
	//计算倾斜面上各月日均太阳辐射量Ht和全年平均太阳总辐射量Hm
	// $("#btn-Ht-Hm").click(function(){
	// 	$("#ht-and-hm").css("display","block");
	// 	//console.log(Ht4)
	// 	$("#Ht4").text(function(){
	// 		return Ht4.toFixed(2)
	// 	});
	// 	$("#Ht5").text(function(){
	// 		return Ht5.toFixed(2)
	// 	});
	// 	$("#Ht6").text(function(){
	// 		return Ht6.toFixed(2)
	// 	});
	// 	$("#Ht7").text(function(){
	// 		return Ht7.toFixed(2)
	// 	});
	// 	$("#Ht8").text(function(){
	// 		return Ht8.toFixed(2)
	// 	});
	// 	$("#Ht9").text(function(){
	// 		return Ht9.toFixed(2)
	// 	});
	// 	$("#Ht10").text(function(){
	// 		return Ht10.toFixed(2)
	// 	});
	// 	$("#Hm").text(function(){
	// 		return Hm.toFixed(2)
	// 	});
	// });
	//计算单位建筑面积方阵所需输出的最大电流Imax
	// $("#btn-Imax").click(function(){

	// 	console.log(btnQl);
	// 	$("#Imax-number").css("display","block");
	// 	$("#Imax").text(function(){
	// 		return Imax.toFixed(2)
	// 	})
	// });
	//计算单位面积方阵输出的最小电流Imin
	// $("#btn-Imin").click(function(){
	// 	$("#Imin-number").css("display","block");
	// 	$("#Imin").text(function(){
	// 		return Imin.toFixed(2)
	// 	})
	// })
	//计算符合要求的实际工作电流I
	// $("#btn-electricity").click(function(){
	// 	$("#electricity-number").css("display","block");
	// 	let i = getElectricity(Imin,Imax,Ht4,Ht5,Ht6,Ht7,Ht8,Ht9,Ht10);
	// 	console.log(i);
	// 	console.log(Imax);
	// 	console.log(Imin);
	// 	electricity = i;
	// 	$("#electricity").text(function(){
	// 		return electricity.toFixed(5)
	// 	})
	// })
	//计算单位建筑面积方阵各月发电量Qg
	// $("#btn-Qg").click(function(){
	// 	$("#every-Qg").css("display","block");
	// 	$("#Qg4").text(function(){
	// 		return Qg4.toFixed(2)
	// 	});
	// 	$("#Qg5").text(function(){
	// 		return Qg5.toFixed(2)
	// 	});
	// 	$("#Qg6").text(function(){
	// 		return Qg6.toFixed(2)
	// 	});
	// 	$("#Qg7").text(function(){
	// 		return Qg7.toFixed(2)
	// 	});
	// 	$("#Qg8").text(function(){
	// 		return Qg8.toFixed(2)
	// 	});
	// 	$("#Qg9").text(function(){
	// 		return Qg9.toFixed(2)
	// 	});
	// 	$("#Qg10").text(function(){
	// 		return Qg10.toFixed(2)
	// 	});
	// });
	//计算单位建筑面积各月发电盈亏量
	// $("#btn-Q").click(function(){
	// 	$("#Q-number").css("display","block");

	// 	$("#loss-april").text(function(){
	// 		return lossApril.toFixed(2)
	// 	});
	// 	$("#loss-may").text(function(){
	// 		return lossMay.toFixed(2)
	// 	});
	// 	$("#loss-june").text(function(){
	// 		return lossJune.toFixed(2)
	// 	});
	// 	$("#loss-july").text(function(){
	// 		return lossJuly.toFixed(2)
	// 	});
	// 	$("#loss-august").text(function(){
	// 		return lossAugust.toFixed(2)
	// 	});
	// 	$("#loss-september").text(function(){
	// 		return lossSeptember.toFixed(2)
	// 	});
	// 	$("#loss-october").text(function(){
	// 		return lossOctober.toFixed(2)
	// 	})
	// });
	//计算累计亏欠量
	// $("#btn-total").click(function(){
	// 	$("#total-loss").css("display","block");
	// 	$("#all-loss").text(function(){
	// 		return Math.abs(min.toFixed(5))
	// 	})
	// });
	//决定方阵输出电流
	$("#btn-n1").click(function () {
		//最大月总冷负荷
		$("#juneCooling-calculate").css("display", "block");
		$("#june-cooling-number").text(function () {
			return Qmax
		})
		//计算各月总冷负荷
		$("#elseCooling-load").css("display", "block");
		$("#april-cooling-number").text(function () {
			return Q4.toFixed(2)
		});
		$("#may-cooling-number").text(function () {
			return Q5.toFixed(2)
		});
		$("#june1-cooling-number").text(function () {
			return Q6.toFixed(2)
		});
		$("#july-cooling-number").text(function () {
			return Q7.toFixed(2)
		});
		$("#august-cooling-number").text(function () {
			return Q8.toFixed(2)
		});
		$("#september-cooling--number").text(function () {
			return Q9.toFixed(2)
		});
		$("#october-cooling-number").text(function () {
			return Q10.toFixed(2)
		});
		//各月耗电量Qc
		$("#everyQc").css("display", "block");
		$("#Qc4").text(function () {
			return Qc4.toFixed(2)
		});
		$("#Qc5").text(function () {
			return Qc5.toFixed(2)
		});
		$("#Qc6").text(function () {
			return Qc6.toFixed(2)
		});
		$("#Qc7").text(function () {
			return Qc7.toFixed(2)
		});
		$("#Qc8").text(function () {
			return Qc8.toFixed(2)
		});
		$("#Qc9").text(function () {
			return Qc9.toFixed(2)
		});
		$("#Qc10").text(function () {
			return Qc10.toFixed(2)
		})
		//年日均耗电量
		$("#Ql-number").css("display", "block");
		$("#Ql").text(function () {
			return btnQl.toFixed(2)
		})
		//各月日均太阳辐射量Ht(kW·h/(㎡·d))以及全年平均日总辐照量Hm(kW·h/(㎡·d))
		$("#ht-and-hm").css("display", "block");
		//console.log(Ht4)
		$("#Ht4").text(function () {
			return Ht4.toFixed(2)
		});
		$("#Ht5").text(function () {
			return Ht5.toFixed(2)
		});
		$("#Ht6").text(function () {
			return Ht6.toFixed(2)
		});
		$("#Ht7").text(function () {
			return Ht7.toFixed(2)
		});
		$("#Ht8").text(function () {
			return Ht8.toFixed(2)
		});
		$("#Ht9").text(function () {
			return Ht9.toFixed(2)
		});
		$("#Ht10").text(function () {
			return Ht10.toFixed(2)
		});
		$("#Hm").text(function () {
			return Hm.toFixed(2)
		});
		//最大电流Imax
		$("#Imax-number").css("display", "block");
		$("#Imax").text(function () {
			return Imax.toFixed(2)
		})
		//最小电流Imin
		$("#Imin-number").css("display", "block");
		$("#Imin").text(function () {
			return Imin.toFixed(2)
		})
		//实际工作电流I
		$("#electricity-number").css("display", "block");
		let i = getElectricity(Imin, Imax, Ht4, Ht5, Ht6, Ht7, Ht8, Ht9, Ht10);
		//console.log(Ht6);
		// console.log(Imax);
		// console.log(Imin);
		electricity = i;
		$("#electricity").text(function () {
			return electricity.toFixed(5)
		})
		//各月发电量Qg
		$("#every-Qg").css("display", "block");
		$("#Qg4").text(function () {
			return Qg4.toFixed(2)
		});
		$("#Qg5").text(function () {
			return Qg5.toFixed(2)
		});
		$("#Qg6").text(function () {
			return Qg6.toFixed(2)
		});
		$("#Qg7").text(function () {
			return Qg7.toFixed(2)
		});
		$("#Qg8").text(function () {
			return Qg8.toFixed(2)
		});
		$("#Qg9").text(function () {
			return Qg9.toFixed(2)
		});
		$("#Qg10").text(function () {
			return Qg10.toFixed(2)
		});
		//各月发电盈亏量
		$("#Q-number").css("display", "block");

		$("#loss-april").text(function () {
			return lossApril.toFixed(2)
		});
		$("#loss-may").text(function () {
			return lossMay.toFixed(2)
		});
		$("#loss-june").text(function () {
			return lossJune.toFixed(2)
		});
		$("#loss-july").text(function () {
			return lossJuly.toFixed(2)
		});
		$("#loss-august").text(function () {
			return lossAugust.toFixed(2)
		});
		$("#loss-september").text(function () {
			return lossSeptember.toFixed(2)
		});
		$("#loss-october").text(function () {
			return lossOctober.toFixed(2)
		})
		//累计盈亏量
		$("#total-loss").css("display", "block");
		$("#all-loss").text(function () {
			return Math.abs(min.toFixed(5))
		})
		//与维持天数作比较
		$("#n1-number").css("display", "block");
		$("#n1").text(function () {
			return n1.toFixed(2)
		})
	});
	//决定方阵最佳倾角和实际电流；
	$("#btn-Im").click(function () {
		let arr = [];
		let arrDip = [];
		if (roof === "0") {
			Im = electricity;
			bestDip = dip;
			$("#dip-Im").css("display", "block");
			$("#dip-range").css("display", "none");
			$("#get-Im").text(function () {
				return Im.toFixed(5)
			})
			//console.log(Im)
		} else if (roof === "1") {
			$("#dip-range").css("display", "block");
			$("#dip-Im").css("display", "none");
			$("#btn-Im-get").click(function () {
				$("#Im-number-1").css("display", "block")
				for (var i = dipmin; i <= dipmax; i++) {
					let A = Math.cos(Math.PI / 180 * i) + (Math.tan(Math.PI / 180 * latitude) * Math.cos(Math.PI / 180 * azimuth) * Math.sin(Math.PI / 180 * i));
					let sunangle4 = 23.45 * (Math.sin(Math.PI / 180 * (360 * (284 + n4) / 365)));
					let sunangle5 = 23.45 * (Math.sin(Math.PI / 180 * (360 * (284 + n5) / 365)));
					let sunangle6 = 23.45 * (Math.sin(Math.PI / 180 * (360 * (284 + n6) / 365)));
					let sunangle7 = 23.45 * (Math.sin(Math.PI / 180 * (360 * (284 + n7) / 365)));
					let sunangle8 = 23.45 * (Math.sin(Math.PI / 180 * (360 * (284 + n8) / 365)));
					let sunangle9 = 23.45 * (Math.sin(Math.PI / 180 * (360 * (284 + n9) / 365)));
					let sunangle10 = 23.45 * (Math.sin(Math.PI / 180 * (360 * (284 + n10) / 365)));
					//console.log(sunangle5)
					let Ws4 = Math.acos((-(Math.tan(Math.PI / 180 * latitude)) * (Math.tan(Math.PI / 180 * sunangle4)))) * 180 / Math.PI;
					let Ws5 = Math.acos((-(Math.tan(Math.PI / 180 * latitude)) * (Math.tan(Math.PI / 180 * sunangle5)))) * 180 / Math.PI;
					let Ws6 = Math.acos((-(Math.tan(Math.PI / 180 * latitude)) * (Math.tan(Math.PI / 180 * sunangle6)))) * 180 / Math.PI;
					let Ws7 = Math.acos((-(Math.tan(Math.PI / 180 * latitude)) * (Math.tan(Math.PI / 180 * sunangle7)))) * 180 / Math.PI;
					let Ws8 = Math.acos((-(Math.tan(Math.PI / 180 * latitude)) * (Math.tan(Math.PI / 180 * sunangle8)))) * 180 / Math.PI;
					let Ws9 = Math.acos((-(Math.tan(Math.PI / 180 * latitude)) * (Math.tan(Math.PI / 180 * sunangle9)))) * 180 / Math.PI;
					let Ws10 = Math.acos((-(Math.tan(Math.PI / 180 * latitude)) * (Math.tan(Math.PI / 180 * sunangle10)))) * 180 / Math.PI;
					//console.log(Ws10)
					let B4 = Math.cos(Math.PI / 180 * Ws4) * Math.cos(Math.PI / 180 * i) + (Math.tan(Math.PI / 180 * sunangle4) * Math.sin(Math.PI / 180 * i) * Math.cos(Math.PI / 180 * azimuth));
					let B5 = Math.cos(Math.PI / 180 * Ws5) * Math.cos(Math.PI / 180 * i) + (Math.tan(Math.PI / 180 * sunangle5) * Math.sin(Math.PI / 180 * i) * Math.cos(Math.PI / 180 * azimuth));
					let B6 = Math.cos(Math.PI / 180 * Ws6) * Math.cos(Math.PI / 180 * i) + (Math.tan(Math.PI / 180 * sunangle6) * Math.sin(Math.PI / 180 * i) * Math.cos(Math.PI / 180 * azimuth));
					let B7 = Math.cos(Math.PI / 180 * Ws7) * Math.cos(Math.PI / 180 * i) + (Math.tan(Math.PI / 180 * sunangle7) * Math.sin(Math.PI / 180 * i) * Math.cos(Math.PI / 180 * azimuth));
					let B8 = Math.cos(Math.PI / 180 * Ws8) * Math.cos(Math.PI / 180 * i) + (Math.tan(Math.PI / 180 * sunangle8) * Math.sin(Math.PI / 180 * i) * Math.cos(Math.PI / 180 * azimuth));
					let B9 = Math.cos(Math.PI / 180 * Ws9) * Math.cos(Math.PI / 180 * i) + (Math.tan(Math.PI / 180 * sunangle9) * Math.sin(Math.PI / 180 * i) * Math.cos(Math.PI / 180 * azimuth));
					let B10 = Math.cos(Math.PI / 180 * Ws10) * Math.cos(Math.PI / 180 * i) + (Math.tan(Math.PI / 180 * sunangle10) * Math.sin(Math.PI / 180 * i) * Math.cos(Math.PI / 180 * azimuth));
					//console.log(B6);
					let C = (Math.sin(Math.PI / 180 * i) * Math.sin(Math.PI / 180 * azimuth)) / Math.cos(Math.PI / 180 * latitude);
					//console.log(C)
					let a4 = 0.409 + 0.5016 * Math.sin(Math.PI / 180 * (Ws4 - 60));
					let a5 = 0.409 + 0.5016 * Math.sin(Math.PI / 180 * (Ws5 - 60));
					let a6 = 0.409 + 0.5016 * Math.sin(Math.PI / 180 * (Ws6 - 60));
					let a7 = 0.409 + 0.5016 * Math.sin(Math.PI / 180 * (Ws7 - 60));
					let a8 = 0.409 + 0.5016 * Math.sin(Math.PI / 180 * (Ws8 - 60));
					let a9 = 0.409 + 0.5016 * Math.sin(Math.PI / 180 * (Ws9 - 60));
					let a10 = 0.409 + 0.5016 * Math.sin(Math.PI / 180 * (Ws10 - 60));
					//console.log(a4)
					let b4 = 0.6609 - 0.4767 * Math.sin(Math.PI / 180 * (Ws4 - 60));
					let b5 = 0.6609 - 0.4767 * Math.sin(Math.PI / 180 * (Ws5 - 60));
					let b6 = 0.6609 - 0.4767 * Math.sin(Math.PI / 180 * (Ws6 - 60));
					let b7 = 0.6609 - 0.4767 * Math.sin(Math.PI / 180 * (Ws7 - 60));
					let b8 = 0.6609 - 0.4767 * Math.sin(Math.PI / 180 * (Ws8 - 60));
					let b9 = 0.6609 - 0.4767 * Math.sin(Math.PI / 180 * (Ws9 - 60));
					let b10 = 0.6609 - 0.4767 * Math.sin(Math.PI / 180 * (Ws10 - 60));
					//console.log(b4)
					let d4 = Math.sin(Math.PI / 180 * Ws4) - (Math.PI / 180 * Ws4 * Math.cos(Math.PI / 180 * Ws4));
					let d5 = Math.sin(Math.PI / 180 * Ws5) - (Math.PI / 180 * Ws5 * Math.cos(Math.PI / 180 * Ws5));
					let d6 = Math.sin(Math.PI / 180 * Ws6) - (Math.PI / 180 * Ws6 * Math.cos(Math.PI / 180 * Ws6));
					let d7 = Math.sin(Math.PI / 180 * Ws7) - (Math.PI / 180 * Ws7 * Math.cos(Math.PI / 180 * Ws7));
					let d8 = Math.sin(Math.PI / 180 * Ws8) - (Math.PI / 180 * Ws8 * Math.cos(Math.PI / 180 * Ws8));
					let d9 = Math.sin(Math.PI / 180 * Ws9) - (Math.PI / 180 * Ws9 * Math.cos(Math.PI / 180 * Ws9));
					let d10 = Math.sin(Math.PI / 180 * Ws10) - (Math.PI / 180 * Ws10 * Math.cos(Math.PI / 180 * Ws10));
					//console.log(d4)
					let a_4 = a4 - (Hs4 / Hz4);
					let a_5 = a5 - (Hs5 / Hz5);
					let a_6 = a6 - (Hs6 / Hz6);
					let a_7 = a7 - (Hs7 / Hz7);
					let a_8 = a8 - (Hs8 / Hz8);
					let a_9 = a9 - (Hs9 / Hz9);
					let a_10 = a10 - (Hs10 / Hz10);
					//console.log(a_4)
					let m4 = Math.acos((A * B4 + (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B4, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
					let m5 = Math.acos((A * B5 + (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B5, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
					let m6 = Math.acos((A * B6 + (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B6, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
					let m7 = Math.acos((A * B7 + (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B7, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
					let m8 = Math.acos((A * B8 + (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B8, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
					let m9 = Math.acos((A * B9 + (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B9, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
					let m10 = Math.acos((A * B10 + (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B10, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
					//console.log(m7);
					let t4 = Math.acos((A * B4 - (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B4, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
					let t5 = Math.acos((A * B5 - (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B5, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
					let t6 = Math.acos((A * B6 - (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B6, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
					let t7 = Math.acos((A * B7 - (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B7, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
					let t8 = Math.acos((A * B8 - (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B8, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
					let t9 = Math.acos((A * B9 - (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B9, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
					let t10 = Math.acos((A * B10 - (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B10, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
					//console.log(t4);
					Ws4 < t4 ? ss4 = Ws4 : ss4 = t4;
					Ws5 < t5 ? ss5 = Ws5 : ss5 = t5;
					Ws6 < t6 ? ss6 = Ws6 : ss6 = t6;
					Ws7 < t7 ? ss7 = Ws7 : ss7 = t7;
					Ws8 < t8 ? ss8 = Ws8 : ss8 = t8;
					Ws9 < t9 ? ss9 = Ws9 : ss9 = t9;
					Ws10 < t10 ? ss10 = Ws10 : ss10 = t10;
					//console.log(ss4)

					if (Ws4 < m4) {
						sr4 = Ws4
					} else {
						sr4 = m4
					}
					if (Ws5 < m5) {
						sr5 = Ws5
					} else {
						sr5 = m5
					}
					if (Ws6 < m6) {
						sr6 = Ws6
					} else {
						sr6 = m6
					}
					if (Ws7 < m7) {
						sr7 = Ws7
					} else {
						sr7 = m7
					}
					if (Ws8 < m8) {
						sr8 = Ws8
					} else {
						sr8 = m8
					}
					if (Ws9 < m9) {
						sr9 = Ws9
					} else {
						sr9 = m9
					}
					if (Ws10 < m10) {
						sr10 = Ws10
					} else {
						sr10 = m10
					}

					if (A > 0 & B4 > 0) {
						Wsr4 = -sr4;
						Wss4 = ss4
					} else if (A >= B4) {
						Wsr4 = -sr4;
						Wss4 = ss4
					} else {
						Wsr4 = sr4;
						Wss4 = -ss4
					}

					if (A > 0 & B5 > 0) {
						Wsr5 = -sr5
						Wss5 = ss5
					} else if (A >= B5) {
						Wsr5 = -sr5;
						Wss5 = ss5
					} else {
						Wsr5 = sr5;
						Wss5 = -ss5
					}
					if (A > 0 & B6 > 0) {
						Wsr6 = -sr6;
						Wss6 = ss6
					} else if (A >= B6) {
						Wsr6 = -sr6;
						Wss6 = ss6
					} else {
						Wsr6 = sr6;
						Wss6 = -ss6
					}
					if (A > 0 & B7 > 0) {
						Wsr7 = -sr7;
						Wss7 = ss7
					} else if (A >= B7) {
						Wsr7 = -sr7;
						Wss7 = ss7
					} else {
						Wsr7 = sr7;
						Wss7 = -ss7
					}
					if (A > 0 & B8 > 0) {
						Wsr8 = -sr8;
						Wss8 = ss8
					} else if (A >= B8) {
						Wsr8 = -sr8;
						Wss8 = ss8
					} else {
						Wsr8 = sr8;
						Wss8 = -ss8
					}
					if (A > 0 & B9 > 0) {
						Wsr9 = -sr9;
						Wss9 = ss9
					} else if (A >= B9) {
						Wsr9 = -sr9;
						Wss9 = ss9
					} else {
						Wsr9 = sr9;
						Wss9 = -ss9
					}
					if (A > 0 & B10 > 0) {
						Wsr10 = -sr10;
						Wss10 = ss10
					} else if (A >= B10) {
						Wsr10 = -sr10;
						Wss10 = ss10
					} else {
						Wsr10 = sr10;
						Wss10 = -ss10
					}
					//console.log(Wsr10)
					//console.log(Wss10)
					let G14 = 1 / (2 * d4) * ((b4 * A / 2 - (a_4 * B4)) * (Wss4 - Wsr4) * (Math.PI / 180) + ((a_4 * A - b4 * B4) * (Math.sin(Math.PI / 180 * Wss4) - Math.sin(Math.PI / 180 * Wsr4))) - (a_4 * C * (Math.cos(Math.PI / 180 * Wss4) - Math.cos(Math.PI / 180 * Wsr4))) + (b4 * A / 2 * (Math.sin(Math.PI / 180 * Wss4) * Math.cos(Math.PI / 180 * Wsr4) - (Math.sin(Math.PI / 180 * Wsr4) * Math.cos(Math.PI / 180 * Wsr4)))) + (b4 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss4), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr4), 2))))
					let G15 = 1 / (2 * d5) * ((b5 * A / 2 - (a_5 * B5)) * (Wss5 - Wsr5) * (Math.PI / 180) + ((a_5 * A - b5 * B5) * (Math.sin(Math.PI / 180 * Wss5) - Math.sin(Math.PI / 180 * Wsr5))) - (a_5 * C * (Math.cos(Math.PI / 180 * Wss5) - Math.cos(Math.PI / 180 * Wsr5))) + (b5 * A / 2 * (Math.sin(Math.PI / 180 * Wss5) * Math.cos(Math.PI / 180 * Wsr5) - (Math.sin(Math.PI / 180 * Wsr5) * Math.cos(Math.PI / 180 * Wsr5)))) + (b5 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss5), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr5), 2))))
					let G16 = 1 / (2 * d6) * ((b6 * A / 2 - (a_6 * B6)) * (Wss6 - Wsr6) * (Math.PI / 180) + ((a_6 * A - b6 * B6) * (Math.sin(Math.PI / 180 * Wss6) - Math.sin(Math.PI / 180 * Wsr6))) - (a_6 * C * (Math.cos(Math.PI / 180 * Wss6) - Math.cos(Math.PI / 180 * Wsr6))) + (b6 * A / 2 * (Math.sin(Math.PI / 180 * Wss6) * Math.cos(Math.PI / 180 * Wsr6) - (Math.sin(Math.PI / 180 * Wsr6) * Math.cos(Math.PI / 180 * Wsr6)))) + (b6 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss6), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr6), 2))))
					let G17 = 1 / (2 * d7) * ((b7 * A / 2 - (a_7 * B7)) * (Wss7 - Wsr7) * (Math.PI / 180) + ((a_7 * A - b7 * B7) * (Math.sin(Math.PI / 180 * Wss7) - Math.sin(Math.PI / 180 * Wsr7))) - (a_7 * C * (Math.cos(Math.PI / 180 * Wss7) - Math.cos(Math.PI / 180 * Wsr7))) + (b7 * A / 2 * (Math.sin(Math.PI / 180 * Wss7) * Math.cos(Math.PI / 180 * Wsr7) - (Math.sin(Math.PI / 180 * Wsr7) * Math.cos(Math.PI / 180 * Wsr7)))) + (b7 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss7), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr7), 2))))
					let G18 = 1 / (2 * d8) * ((b8 * A / 2 - (a_8 * B8)) * (Wss8 - Wsr8) * (Math.PI / 180) + ((a_8 * A - b8 * B8) * (Math.sin(Math.PI / 180 * Wss8) - Math.sin(Math.PI / 180 * Wsr8))) - (a_8 * C * (Math.cos(Math.PI / 180 * Wss8) - Math.cos(Math.PI / 180 * Wsr8))) + (b8 * A / 2 * (Math.sin(Math.PI / 180 * Wss8) * Math.cos(Math.PI / 180 * Wsr8) - (Math.sin(Math.PI / 180 * Wsr8) * Math.cos(Math.PI / 180 * Wsr8)))) + (b8 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss8), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr8), 2))))
					let G19 = 1 / (2 * d9) * ((b9 * A / 2 - (a_9 * B9)) * (Wss9 - Wsr9) * (Math.PI / 180) + ((a_9 * A - b9 * B9) * (Math.sin(Math.PI / 180 * Wss9) - Math.sin(Math.PI / 180 * Wsr9))) - (a_9 * C * (Math.cos(Math.PI / 180 * Wss9) - Math.cos(Math.PI / 180 * Wsr9))) + (b9 * A / 2 * (Math.sin(Math.PI / 180 * Wss9) * Math.cos(Math.PI / 180 * Wsr9) - (Math.sin(Math.PI / 180 * Wsr9) * Math.cos(Math.PI / 180 * Wsr9)))) + (b9 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss9), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr9), 2))))
					let G10 = 1 / (2 * d10) * ((b10 * A / 2 - (a_10 * B10)) * (Wss10 - Wsr10) * (Math.PI / 180) + ((a_10 * A - b10 * B10) * (Math.sin(Math.PI / 180 * Wss10) - Math.sin(Math.PI / 180 * Wsr10))) - (a_10 * C * (Math.cos(Math.PI / 180 * Wss10) - Math.cos(Math.PI / 180 * Wsr10))) + (b10 * A / 2 * (Math.sin(Math.PI / 180 * Wss10) * Math.cos(Math.PI / 180 * Wsr10) - (Math.sin(Math.PI / 180 * Wsr10) * Math.cos(Math.PI / 180 * Wsr10)))) + (b10 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss10), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr10), 2))))
					//console.log(G10)	
					let G24 = 1 / (2 * d4) * ((b4 * A / 2 - (a_4 * B4)) * (Wss4 + Ws4) * (Math.PI / 180) + ((a_4 * A - b4 * B4) * (Math.sin(Math.PI / 180 * Wss4) - Math.sin(Math.PI / 180 * (-Ws4)))) - (a_4 * C * (Math.cos(Math.PI / 180 * Wss4) - Math.cos(Math.PI / 180 * (-Ws4)))) + (b4 * A / 2 * (Math.sin(Math.PI / 180 * Wss4) * Math.cos(Math.PI / 180 * (-Ws4)) - (Math.sin(Math.PI / 180 * (-Ws4)) * Math.cos(Math.PI / 180 * (-Ws4))))) + (b4 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss4), 2) - Math.pow(Math.sin(Math.PI / 180 * (-Ws4)), 2))))
					let G25 = 1 / (2 * d5) * ((b5 * A / 2 - (a_5 * B5)) * (Wss5 + Ws5) * (Math.PI / 180) + ((a_5 * A - b5 * B5) * (Math.sin(Math.PI / 180 * Wss5) - Math.sin(Math.PI / 180 * (-Ws5)))) - (a_5 * C * (Math.cos(Math.PI / 180 * Wss5) - Math.cos(Math.PI / 180 * (-Ws5)))) + (b5 * A / 2 * (Math.sin(Math.PI / 180 * Wss5) * Math.cos(Math.PI / 180 * (-Ws5)) - (Math.sin(Math.PI / 180 * (-Ws5)) * Math.cos(Math.PI / 180 * (-Ws5))))) + (b5 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss5), 2) - Math.pow(Math.sin(Math.PI / 180 * (-Ws5)), 2))))
					let G26 = 1 / (2 * d6) * ((b6 * A / 2 - (a_6 * B6)) * (Wss6 + Ws6) * (Math.PI / 180) + ((a_6 * A - b6 * B6) * (Math.sin(Math.PI / 180 * Wss6) - Math.sin(Math.PI / 180 * (-Ws6)))) - (a_6 * C * (Math.cos(Math.PI / 180 * Wss6) - Math.cos(Math.PI / 180 * (-Ws6)))) + (b6 * A / 2 * (Math.sin(Math.PI / 180 * Wss6) * Math.cos(Math.PI / 180 * (-Ws6)) - (Math.sin(Math.PI / 180 * (-Ws6)) * Math.cos(Math.PI / 180 * (-Ws6))))) + (b6 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss6), 2) - Math.pow(Math.sin(Math.PI / 180 * (-Ws6)), 2))))
					let G27 = 1 / (2 * d7) * ((b7 * A / 2 - (a_7 * B7)) * (Wss7 + Ws7) * (Math.PI / 180) + ((a_7 * A - b7 * B7) * (Math.sin(Math.PI / 180 * Wss7) - Math.sin(Math.PI / 180 * (-Ws7)))) - (a_7 * C * (Math.cos(Math.PI / 180 * Wss7) - Math.cos(Math.PI / 180 * (-Ws7)))) + (b7 * A / 2 * (Math.sin(Math.PI / 180 * Wss7) * Math.cos(Math.PI / 180 * (-Ws7)) - (Math.sin(Math.PI / 180 * (-Ws7)) * Math.cos(Math.PI / 180 * (-Ws7))))) + (b7 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss7), 2) - Math.pow(Math.sin(Math.PI / 180 * (-Ws7)), 2))))
					let G28 = 1 / (2 * d8) * ((b8 * A / 2 - (a_8 * B8)) * (Wss8 + Ws8) * (Math.PI / 180) + ((a_8 * A - b8 * B8) * (Math.sin(Math.PI / 180 * Wss8) - Math.sin(Math.PI / 180 * (-Ws8)))) - (a_8 * C * (Math.cos(Math.PI / 180 * Wss8) - Math.cos(Math.PI / 180 * (-Ws8)))) + (b8 * A / 2 * (Math.sin(Math.PI / 180 * Wss8) * Math.cos(Math.PI / 180 * (-Ws8)) - (Math.sin(Math.PI / 180 * (-Ws8)) * Math.cos(Math.PI / 180 * (-Ws8))))) + (b8 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss8), 2) - Math.pow(Math.sin(Math.PI / 180 * (-Ws8)), 2))))
					let G29 = 1 / (2 * d9) * ((b9 * A / 2 - (a_9 * B9)) * (Wss9 + Ws9) * (Math.PI / 180) + ((a_9 * A - b9 * B9) * (Math.sin(Math.PI / 180 * Wss9) - Math.sin(Math.PI / 180 * (-Ws9)))) - (a_9 * C * (Math.cos(Math.PI / 180 * Wss9) - Math.cos(Math.PI / 180 * (-Ws9)))) + (b9 * A / 2 * (Math.sin(Math.PI / 180 * Wss9) * Math.cos(Math.PI / 180 * (-Ws9)) - (Math.sin(Math.PI / 180 * (-Ws9)) * Math.cos(Math.PI / 180 * (-Ws9))))) + (b9 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss9), 2) - Math.pow(Math.sin(Math.PI / 180 * (-Ws9)), 2))))
					let G20 = 1 / (2 * d10) * ((b10 * A / 2 - (a_10 * B10)) * (Wss10 + Ws10) * (Math.PI / 180) + ((a_10 * A - b10 * B10) * (Math.sin(Math.PI / 180 * Wss10) - Math.sin(Math.PI / 180 * (-Ws10)))) - (a_10 * C * (Math.cos(Math.PI / 180 * Wss10) - Math.cos(Math.PI / 180 * (-Ws10)))) + (b10 * A / 2 * (Math.sin(Math.PI / 180 * Wss10) * Math.cos(Math.PI / 180 * (-Ws10)) - (Math.sin(Math.PI / 180 * (-Ws10)) * Math.cos(Math.PI / 180 * (-Ws10))))) + (b10 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss10), 2) - Math.pow(Math.sin(Math.PI / 180 * (-Ws10)), 2))))
					//console.log(G24)
					let G34 = 1 / (2 * d4) * ((b4 * A / 2 - (a_4 * B4)) * (Ws4 - Wsr4) * (Math.PI / 180) + ((a_4 * A - b4 * B4) * (Math.sin(Math.PI / 180 * Ws4) - Math.sin(Math.PI / 180 * Wsr4))) - (a_4 * C * (Math.cos(Math.PI / 180 * Ws4) - Math.cos(Math.PI / 180 * Wsr4))) + (b4 * A / 2 * (Math.sin(Math.PI / 180 * Ws4) * Math.cos(Math.PI / 180 * Wsr4) - (Math.sin(Math.PI / 180 * Wsr4) * Math.cos(Math.PI / 180 * Wsr4)))) + (b4 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Ws4), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr4), 2))))
					let G35 = 1 / (2 * d5) * ((b5 * A / 2 - (a_5 * B5)) * (Ws5 - Wsr5) * (Math.PI / 180) + ((a_5 * A - b5 * B5) * (Math.sin(Math.PI / 180 * Ws5) - Math.sin(Math.PI / 180 * Wsr5))) - (a_5 * C * (Math.cos(Math.PI / 180 * Ws5) - Math.cos(Math.PI / 180 * Wsr5))) + (b5 * A / 2 * (Math.sin(Math.PI / 180 * Ws5) * Math.cos(Math.PI / 180 * Wsr5) - (Math.sin(Math.PI / 180 * Wsr5) * Math.cos(Math.PI / 180 * Wsr5)))) + (b5 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Ws5), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr5), 2))))
					let G36 = 1 / (2 * d6) * ((b6 * A / 2 - (a_6 * B6)) * (Ws6 - Wsr6) * (Math.PI / 180) + ((a_6 * A - b6 * B6) * (Math.sin(Math.PI / 180 * Ws6) - Math.sin(Math.PI / 180 * Wsr6))) - (a_6 * C * (Math.cos(Math.PI / 180 * Ws6) - Math.cos(Math.PI / 180 * Wsr6))) + (b6 * A / 2 * (Math.sin(Math.PI / 180 * Ws6) * Math.cos(Math.PI / 180 * Wsr6) - (Math.sin(Math.PI / 180 * Wsr6) * Math.cos(Math.PI / 180 * Wsr6)))) + (b6 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Ws6), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr6), 2))))
					let G37 = 1 / (2 * d7) * ((b7 * A / 2 - (a_7 * B7)) * (Ws7 - Wsr7) * (Math.PI / 180) + ((a_7 * A - b7 * B7) * (Math.sin(Math.PI / 180 * Ws7) - Math.sin(Math.PI / 180 * Wsr7))) - (a_7 * C * (Math.cos(Math.PI / 180 * Ws7) - Math.cos(Math.PI / 180 * Wsr7))) + (b7 * A / 2 * (Math.sin(Math.PI / 180 * Ws7) * Math.cos(Math.PI / 180 * Wsr7) - (Math.sin(Math.PI / 180 * Wsr7) * Math.cos(Math.PI / 180 * Wsr7)))) + (b7 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Ws7), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr7), 2))))
					let G38 = 1 / (2 * d8) * ((b8 * A / 2 - (a_8 * B8)) * (Ws8 - Wsr8) * (Math.PI / 180) + ((a_8 * A - b8 * B8) * (Math.sin(Math.PI / 180 * Ws8) - Math.sin(Math.PI / 180 * Wsr8))) - (a_8 * C * (Math.cos(Math.PI / 180 * Ws8) - Math.cos(Math.PI / 180 * Wsr8))) + (b8 * A / 2 * (Math.sin(Math.PI / 180 * Ws8) * Math.cos(Math.PI / 180 * Wsr8) - (Math.sin(Math.PI / 180 * Wsr8) * Math.cos(Math.PI / 180 * Wsr8)))) + (b8 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Ws8), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr8), 2))))
					let G39 = 1 / (2 * d9) * ((b9 * A / 2 - (a_9 * B9)) * (Ws9 - Wsr9) * (Math.PI / 180) + ((a_9 * A - b9 * B9) * (Math.sin(Math.PI / 180 * Ws9) - Math.sin(Math.PI / 180 * Wsr9))) - (a_9 * C * (Math.cos(Math.PI / 180 * Ws9) - Math.cos(Math.PI / 180 * Wsr9))) + (b9 * A / 2 * (Math.sin(Math.PI / 180 * Ws9) * Math.cos(Math.PI / 180 * Wsr9) - (Math.sin(Math.PI / 180 * Wsr9) * Math.cos(Math.PI / 180 * Wsr9)))) + (b9 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Ws9), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr9), 2))))
					let G30 = 1 / (2 * d10) * ((b10 * A / 2 - (a_10 * B10)) * (Ws10 - Wsr10) * (Math.PI / 180) + ((a_10 * A - b10 * B10) * (Math.sin(Math.PI / 180 * Ws10) - Math.sin(Math.PI / 180 * Wsr10))) - (a_10 * C * (Math.cos(Math.PI / 180 * Ws10) - Math.cos(Math.PI / 180 * Wsr10))) + (b10 * A / 2 * (Math.sin(Math.PI / 180 * Ws10) * Math.cos(Math.PI / 180 * Wsr10) - (Math.sin(Math.PI / 180 * Wsr10) * Math.cos(Math.PI / 180 * Wsr10)))) + (b10 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Ws10), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr10), 2))))
					//console.log(G34)
					let G44 = G24 + G34;
					let G45 = G25 + G35;
					let G46 = G26 + G36;
					let G47 = G27 + G37;
					let G48 = G28 + G38;
					let G49 = G29 + G39;
					let G40 = G20 + G30;
					//console.log(G44)
					0 > G14 ? G54 = 0 : G54 = G14;
					0 > G15 ? G55 = 0 : G55 = G15;
					0 > G16 ? G56 = 0 : G56 = G16;
					0 > G17 ? G57 = 0 : G57 = G17;
					0 > G18 ? G58 = 0 : G58 = G18;
					0 > G19 ? G59 = 0 : G59 = G19;
					0 > G10 ? G50 = 0 : G50 = G10;
					//console.log(G54)
					0 > G44 ? G64 = 0 : G64 = G44;
					0 > G45 ? G65 = 0 : G65 = G45;
					0 > G46 ? G66 = 0 : G66 = G46;
					0 > G47 ? G67 = 0 : G67 = G47;
					0 > G48 ? G68 = 0 : G68 = G48;
					0 > G49 ? G69 = 0 : G69 = G49;
					0 > G40 ? G60 = 0 : G60 = G40;
					//console.log(G64)
					Wss4 < Wsr4 ? D14 = G64 : D14 = G54;
					Wss5 < Wsr5 ? D15 = G65 : D15 = G55;
					Wss6 < Wsr6 ? D16 = G66 : D16 = G56;
					Wss7 < Wsr7 ? D17 = G67 : D17 = G57;
					Wss8 < Wsr8 ? D18 = G68 : D18 = G58;
					Wss9 < Wsr9 ? D19 = G69 : D19 = G59;
					Wss10 < Wsr10 ? D10 = G60 : D10 = G50;
					//console.log(D18)
					let R4 = D14 + (Hs4 / (2 * Hz4) * (1 + Math.cos(Math.PI / 180 * i))) + (reflectivity / 2 * (1 - Math.cos(Math.PI / 180 * i)));
					let R5 = D15 + (Hs5 / (2 * Hz5) * (1 + Math.cos(Math.PI / 180 * i))) + (reflectivity / 2 * (1 - Math.cos(Math.PI / 180 * i)));
					let R6 = D16 + (Hs6 / (2 * Hz6) * (1 + Math.cos(Math.PI / 180 * i))) + (reflectivity / 2 * (1 - Math.cos(Math.PI / 180 * i)));
					let R7 = D17 + (Hs7 / (2 * Hz7) * (1 + Math.cos(Math.PI / 180 * i))) + (reflectivity / 2 * (1 - Math.cos(Math.PI / 180 * i)));
					let R8 = D18 + (Hs8 / (2 * Hz8) * (1 + Math.cos(Math.PI / 180 * i))) + (reflectivity / 2 * (1 - Math.cos(Math.PI / 180 * i)));
					let R9 = D19 + (Hs9 / (2 * Hz9) * (1 + Math.cos(Math.PI / 180 * i))) + (reflectivity / 2 * (1 - Math.cos(Math.PI / 180 * i)));
					let R10 = D10 + (Hs10 / (2 * Hz10) * (1 + Math.cos(Math.PI / 180 * i))) + (reflectivity / 2 * (1 - Math.cos(Math.PI / 180 * i)));
					//console.log(R6)

					let Ht4 = R4 * Hz4;
					let Ht5 = R5 * Hz5;
					let Ht6 = R6 * Hz6;
					let Ht7 = R7 * Hz7;
					let Ht8 = R8 * Hz8;
					let Ht9 = R9 * Hz9;
					let Ht10 = R10 * Hz10;


					/*let Ht4 = (Hz4/Math.cos(Math.PI/180*i))+Hs4;
					//console.log(Ht4)
					//console.log(typeof Ht4)
					let Ht5 = (Hz5/Math.cos(Math.PI/180*i))+Hs5;
					let Ht6 = (Hz6/Math.cos(Math.PI/180*i))+Hs6;
					let Ht7 = (Hz7/Math.cos(Math.PI/180*i))+Hs7;
					let Ht8 = (Hz8/Math.cos(Math.PI/180*i))+Hs8;
					let Ht9 = (Hz9/Math.cos(Math.PI/180*i))+Hs9;
					let Ht10 = (Hz10/Math.cos(Math.PI/180*i))+Hs10;*/
					let Hm = ((Ht4 * april) + (Ht5 * may) + (Ht6 * june) + (Ht7 * july) + (Ht8 * august) + (Ht9 * september) + (Ht10 * october)) / (april + may + june + july + august + september + october);
					let arrHt = [];
					arrHt.push(Ht4, Ht5, Ht6, Ht7, Ht8, Ht9, Ht10);
					//console.log(arrHt);
					let HtMin = Math.min.apply(null, arrHt);
					//console.log(HtMin);
					let Imin = btnQl / (Hm * eff1 * eff2);
					let Imax = btnQl / (HtMin * eff1 * eff2);
					let numI = getElectricity(Imin, Imax, Ht4, Ht5, Ht6, Ht7, Ht8, Ht9, Ht10);
					//console.log(numI);
					//					console.log(Imin);
					//					console.log(Imax);
					//					console.log(numI);
					if (numI !== undefined) {
						arr.push(numI);
						arrDip.push(i)
					}
				};
				/*for(var i = dip;i>=dipmin;i--){
					let Ht4 = (Hz4/Math.cos(Math.PI/180*i))+Hs4;
					//console.log(Ht4)
					//console.log(typeof Ht4)
					let Ht5 = (Hz5/Math.cos(Math.PI/180*i))+Hs5;
					let Ht6 = (Hz6/Math.cos(Math.PI/180*i))+Hs6;
					let Ht7 = (Hz7/Math.cos(Math.PI/180*i))+Hs7;
					let Ht8 = (Hz8/Math.cos(Math.PI/180*i))+Hs8;
					let Ht9 = (Hz9/Math.cos(Math.PI/180*i))+Hs9;
					let Ht10 = (Hz10/Math.cos(Math.PI/180*i))+Hs10;
					let Hm = ((Ht4*april)+(Ht5*may)+(Ht6*june)+(Ht7*july)+(Ht8*august)+(Ht9*september)+(Ht10*october))/(april+may+june+july+august+september+october);
					let arrHt = [];
					arrHt.push(Ht4,Ht5,Ht6,Ht7,Ht8,Ht9,Ht10);
					//console.log(arrHt);
					let HtMin = Math.min.apply(null,arrHt);
					//console.log(HtMin);
					let Imin = btnQl/(Hm*eff1*eff2);
					let Imax = btnQl/(HtMin*eff1*eff2);
					let numI = getElectricity(Imin,Imax,Ht4,Ht5,Ht6,Ht7,Ht8,Ht9,Ht10);
//					console.log(Imin);
//					console.log(Imax);
//					console.log(numI);
					if(numI !== undefined){
						arr.push(numI);
						arrDip.push(i)
					}
				}*/
				//console.log(arrDip);
				//console.log(arr);
				let Im = Math.min.apply(null, arr);
				//console.log(Im);
				for (var i = 0; i < arr.length; i++) {
					if (arr[i] == Im) {
						//console.log(i);
						//dip = i;
						bestDip = arrDip[i];
						break;
					}
				}
				electricity = Im;

				A = Math.cos(Math.PI / 180 * bestDip) + (Math.tan(Math.PI / 180 * latitude) * Math.cos(Math.PI / 180 * azimuth) * Math.sin(Math.PI / 180 * bestDip));
				sunangle4 = 23.45 * (Math.sin(Math.PI / 180 * (360 * (284 + n4) / 365)));
				sunangle5 = 23.45 * (Math.sin(Math.PI / 180 * (360 * (284 + n5) / 365)));
				sunangle6 = 23.45 * (Math.sin(Math.PI / 180 * (360 * (284 + n6) / 365)));
				sunangle7 = 23.45 * (Math.sin(Math.PI / 180 * (360 * (284 + n7) / 365)));
				sunangle8 = 23.45 * (Math.sin(Math.PI / 180 * (360 * (284 + n8) / 365)));
				sunangle9 = 23.45 * (Math.sin(Math.PI / 180 * (360 * (284 + n9) / 365)));
				sunangle10 = 23.45 * (Math.sin(Math.PI / 180 * (360 * (284 + n10) / 365)));
				//console.log(sunangle5)
				Ws4 = Math.acos((-(Math.tan(Math.PI / 180 * latitude)) * (Math.tan(Math.PI / 180 * sunangle4)))) * 180 / Math.PI;
				Ws5 = Math.acos((-(Math.tan(Math.PI / 180 * latitude)) * (Math.tan(Math.PI / 180 * sunangle5)))) * 180 / Math.PI;
				Ws6 = Math.acos((-(Math.tan(Math.PI / 180 * latitude)) * (Math.tan(Math.PI / 180 * sunangle6)))) * 180 / Math.PI;
				Ws7 = Math.acos((-(Math.tan(Math.PI / 180 * latitude)) * (Math.tan(Math.PI / 180 * sunangle7)))) * 180 / Math.PI;
				Ws8 = Math.acos((-(Math.tan(Math.PI / 180 * latitude)) * (Math.tan(Math.PI / 180 * sunangle8)))) * 180 / Math.PI;
				Ws9 = Math.acos((-(Math.tan(Math.PI / 180 * latitude)) * (Math.tan(Math.PI / 180 * sunangle9)))) * 180 / Math.PI;
				Ws10 = Math.acos((-(Math.tan(Math.PI / 180 * latitude)) * (Math.tan(Math.PI / 180 * sunangle10)))) * 180 / Math.PI;
				//console.log(Ws10)
				B4 = Math.cos(Math.PI / 180 * Ws4) * Math.cos(Math.PI / 180 * bestDip) + (Math.tan(Math.PI / 180 * sunangle4) * Math.sin(Math.PI / 180 * bestDip) * Math.cos(Math.PI / 180 * azimuth));
				B5 = Math.cos(Math.PI / 180 * Ws5) * Math.cos(Math.PI / 180 * bestDip) + (Math.tan(Math.PI / 180 * sunangle5) * Math.sin(Math.PI / 180 * bestDip) * Math.cos(Math.PI / 180 * azimuth));
				B6 = Math.cos(Math.PI / 180 * Ws6) * Math.cos(Math.PI / 180 * bestDip) + (Math.tan(Math.PI / 180 * sunangle6) * Math.sin(Math.PI / 180 * bestDip) * Math.cos(Math.PI / 180 * azimuth));
				B7 = Math.cos(Math.PI / 180 * Ws7) * Math.cos(Math.PI / 180 * bestDip) + (Math.tan(Math.PI / 180 * sunangle7) * Math.sin(Math.PI / 180 * bestDip) * Math.cos(Math.PI / 180 * azimuth));
				B8 = Math.cos(Math.PI / 180 * Ws8) * Math.cos(Math.PI / 180 * bestDip) + (Math.tan(Math.PI / 180 * sunangle8) * Math.sin(Math.PI / 180 * bestDip) * Math.cos(Math.PI / 180 * azimuth));
				B9 = Math.cos(Math.PI / 180 * Ws9) * Math.cos(Math.PI / 180 * bestDip) + (Math.tan(Math.PI / 180 * sunangle9) * Math.sin(Math.PI / 180 * bestDip) * Math.cos(Math.PI / 180 * azimuth));
				B10 = Math.cos(Math.PI / 180 * Ws10) * Math.cos(Math.PI / 180 * bestDip) + (Math.tan(Math.PI / 180 * sunangle10) * Math.sin(Math.PI / 180 * bestDip) * Math.cos(Math.PI / 180 * azimuth));
				//console.log(B6);
				C = (Math.sin(Math.PI / 180 * bestDip) * Math.sin(Math.PI / 180 * azimuth)) / Math.cos(Math.PI / 180 * latitude);
				//console.log(C)
				a4 = 0.409 + 0.5016 * Math.sin(Math.PI / 180 * (Ws4 - 60));
				a5 = 0.409 + 0.5016 * Math.sin(Math.PI / 180 * (Ws5 - 60));
				a6 = 0.409 + 0.5016 * Math.sin(Math.PI / 180 * (Ws6 - 60));
				a7 = 0.409 + 0.5016 * Math.sin(Math.PI / 180 * (Ws7 - 60));
				a8 = 0.409 + 0.5016 * Math.sin(Math.PI / 180 * (Ws8 - 60));
				a9 = 0.409 + 0.5016 * Math.sin(Math.PI / 180 * (Ws9 - 60));
				a10 = 0.409 + 0.5016 * Math.sin(Math.PI / 180 * (Ws10 - 60));
				//console.log(a4)
				b4 = 0.6609 - 0.4767 * Math.sin(Math.PI / 180 * (Ws4 - 60));
				b5 = 0.6609 - 0.4767 * Math.sin(Math.PI / 180 * (Ws5 - 60));
				b6 = 0.6609 - 0.4767 * Math.sin(Math.PI / 180 * (Ws6 - 60));
				b7 = 0.6609 - 0.4767 * Math.sin(Math.PI / 180 * (Ws7 - 60));
				b8 = 0.6609 - 0.4767 * Math.sin(Math.PI / 180 * (Ws8 - 60));
				b9 = 0.6609 - 0.4767 * Math.sin(Math.PI / 180 * (Ws9 - 60));
				b10 = 0.6609 - 0.4767 * Math.sin(Math.PI / 180 * (Ws10 - 60));
				//console.log(b4)
				d4 = Math.sin(Math.PI / 180 * Ws4) - (Math.PI / 180 * Ws4 * Math.cos(Math.PI / 180 * Ws4));
				d5 = Math.sin(Math.PI / 180 * Ws5) - (Math.PI / 180 * Ws5 * Math.cos(Math.PI / 180 * Ws5));
				d6 = Math.sin(Math.PI / 180 * Ws6) - (Math.PI / 180 * Ws6 * Math.cos(Math.PI / 180 * Ws6));
				d7 = Math.sin(Math.PI / 180 * Ws7) - (Math.PI / 180 * Ws7 * Math.cos(Math.PI / 180 * Ws7));
				d8 = Math.sin(Math.PI / 180 * Ws8) - (Math.PI / 180 * Ws8 * Math.cos(Math.PI / 180 * Ws8));
				d9 = Math.sin(Math.PI / 180 * Ws9) - (Math.PI / 180 * Ws9 * Math.cos(Math.PI / 180 * Ws9));
				d10 = Math.sin(Math.PI / 180 * Ws10) - (Math.PI / 180 * Ws10 * Math.cos(Math.PI / 180 * Ws10));
				//console.log(d4)
				a_4 = a4 - (Hs4 / Hz4);
				a_5 = a5 - (Hs5 / Hz5);
				a_6 = a6 - (Hs6 / Hz6);
				a_7 = a7 - (Hs7 / Hz7);
				a_8 = a8 - (Hs8 / Hz8);
				a_9 = a9 - (Hs9 / Hz9);
				a_10 = a10 - (Hs10 / Hz10);
				//console.log(a_4)
				m4 = Math.acos((A * B4 + (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B4, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
				m5 = Math.acos((A * B5 + (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B5, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
				m6 = Math.acos((A * B6 + (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B6, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
				m7 = Math.acos((A * B7 + (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B7, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
				m8 = Math.acos((A * B8 + (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B8, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
				m9 = Math.acos((A * B9 + (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B9, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
				m10 = Math.acos((A * B10 + (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B10, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
				//console.log(m7);
				t4 = Math.acos((A * B4 - (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B4, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
				t5 = Math.acos((A * B5 - (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B5, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
				t6 = Math.acos((A * B6 - (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B6, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
				t7 = Math.acos((A * B7 - (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B7, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
				t8 = Math.acos((A * B8 - (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B8, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
				t9 = Math.acos((A * B9 - (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B9, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
				t10 = Math.acos((A * B10 - (C * Math.sqrt(Math.pow(A, 2) - Math.pow(B10, 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
				//console.log(t4);
				Ws4 < t4 ? ss4 = Ws4 : ss4 = t4;
				Ws5 < t5 ? ss5 = Ws5 : ss5 = t5;
				Ws6 < t6 ? ss6 = Ws6 : ss6 = t6;
				Ws7 < t7 ? ss7 = Ws7 : ss7 = t7;
				Ws8 < t8 ? ss8 = Ws8 : ss8 = t8;
				Ws9 < t9 ? ss9 = Ws9 : ss9 = t9;
				Ws10 < t10 ? ss10 = Ws10 : ss10 = t10;
				//console.log(ss4)

				if (Ws4 < m4) {
					sr4 = Ws4
				} else {
					sr4 = m4
				}
				if (Ws5 < m5) {
					sr5 = Ws5
				} else {
					sr5 = m5
				}
				if (Ws6 < m6) {
					sr6 = Ws6
				} else {
					sr6 = m6
				}
				if (Ws7 < m7) {
					sr7 = Ws7
				} else {
					sr7 = m7
				}
				if (Ws8 < m8) {
					sr8 = Ws8
				} else {
					sr8 = m8
				}
				if (Ws9 < m9) {
					sr9 = Ws9
				} else {
					sr9 = m9
				}
				if (Ws10 < m10) {
					sr10 = Ws10
				} else {
					sr10 = m10
				}

				if (A > 0 & B4 > 0) {
					Wsr4 = -sr4;
					Wss4 = ss4
				} else if (A >= B4) {
					Wsr4 = -sr4;
					Wss4 = ss4
				} else {
					Wsr4 = sr4;
					Wss4 = -ss4
				}

				if (A > 0 & B5 > 0) {
					Wsr5 = -sr5
					Wss5 = ss5
				} else if (A >= B5) {
					Wsr5 = -sr5;
					Wss5 = ss5
				} else {
					Wsr5 = sr5;
					Wss5 = -ss5
				}
				if (A > 0 & B6 > 0) {
					Wsr6 = -sr6;
					Wss6 = ss6
				} else if (A >= B6) {
					Wsr6 = -sr6;
					Wss6 = ss6
				} else {
					Wsr6 = sr6;
					Wss6 = -ss6
				}
				if (A > 0 & B7 > 0) {
					Wsr7 = -sr7;
					Wss7 = ss7
				} else if (A >= B7) {
					Wsr7 = -sr7;
					Wss7 = ss7
				} else {
					Wsr7 = sr7;
					Wss7 = -ss7
				}
				if (A > 0 & B8 > 0) {
					Wsr8 = -sr8;
					Wss8 = ss8
				} else if (A >= B8) {
					Wsr8 = -sr8;
					Wss8 = ss8
				} else {
					Wsr8 = sr8;
					Wss8 = -ss8
				}
				if (A > 0 & B9 > 0) {
					Wsr9 = -sr9;
					Wss9 = ss9
				} else if (A >= B9) {
					Wsr9 = -sr9;
					Wss9 = ss9
				} else {
					Wsr9 = sr9;
					Wss9 = -ss9
				}
				if (A > 0 & B10 > 0) {
					Wsr10 = -sr10;
					Wss10 = ss10
				} else if (A >= B10) {
					Wsr10 = -sr10;
					Wss10 = ss10
				} else {
					Wsr10 = sr10;
					Wss10 = -ss10
				}
				//console.log(Wsr10)
				//console.log(Wss10)
				G14 = 1 / (2 * d4) * ((b4 * A / 2 - (a_4 * B4)) * (Wss4 - Wsr4) * (Math.PI / 180) + ((a_4 * A - b4 * B4) * (Math.sin(Math.PI / 180 * Wss4) - Math.sin(Math.PI / 180 * Wsr4))) - (a_4 * C * (Math.cos(Math.PI / 180 * Wss4) - Math.cos(Math.PI / 180 * Wsr4))) + (b4 * A / 2 * (Math.sin(Math.PI / 180 * Wss4) * Math.cos(Math.PI / 180 * Wsr4) - (Math.sin(Math.PI / 180 * Wsr4) * Math.cos(Math.PI / 180 * Wsr4)))) + (b4 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss4), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr4), 2))))
				G15 = 1 / (2 * d5) * ((b5 * A / 2 - (a_5 * B5)) * (Wss5 - Wsr5) * (Math.PI / 180) + ((a_5 * A - b5 * B5) * (Math.sin(Math.PI / 180 * Wss5) - Math.sin(Math.PI / 180 * Wsr5))) - (a_5 * C * (Math.cos(Math.PI / 180 * Wss5) - Math.cos(Math.PI / 180 * Wsr5))) + (b5 * A / 2 * (Math.sin(Math.PI / 180 * Wss5) * Math.cos(Math.PI / 180 * Wsr5) - (Math.sin(Math.PI / 180 * Wsr5) * Math.cos(Math.PI / 180 * Wsr5)))) + (b5 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss5), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr5), 2))))
				G16 = 1 / (2 * d6) * ((b6 * A / 2 - (a_6 * B6)) * (Wss6 - Wsr6) * (Math.PI / 180) + ((a_6 * A - b6 * B6) * (Math.sin(Math.PI / 180 * Wss6) - Math.sin(Math.PI / 180 * Wsr6))) - (a_6 * C * (Math.cos(Math.PI / 180 * Wss6) - Math.cos(Math.PI / 180 * Wsr6))) + (b6 * A / 2 * (Math.sin(Math.PI / 180 * Wss6) * Math.cos(Math.PI / 180 * Wsr6) - (Math.sin(Math.PI / 180 * Wsr6) * Math.cos(Math.PI / 180 * Wsr6)))) + (b6 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss6), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr6), 2))))
				G17 = 1 / (2 * d7) * ((b7 * A / 2 - (a_7 * B7)) * (Wss7 - Wsr7) * (Math.PI / 180) + ((a_7 * A - b7 * B7) * (Math.sin(Math.PI / 180 * Wss7) - Math.sin(Math.PI / 180 * Wsr7))) - (a_7 * C * (Math.cos(Math.PI / 180 * Wss7) - Math.cos(Math.PI / 180 * Wsr7))) + (b7 * A / 2 * (Math.sin(Math.PI / 180 * Wss7) * Math.cos(Math.PI / 180 * Wsr7) - (Math.sin(Math.PI / 180 * Wsr7) * Math.cos(Math.PI / 180 * Wsr7)))) + (b7 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss7), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr7), 2))))
				G18 = 1 / (2 * d8) * ((b8 * A / 2 - (a_8 * B8)) * (Wss8 - Wsr8) * (Math.PI / 180) + ((a_8 * A - b8 * B8) * (Math.sin(Math.PI / 180 * Wss8) - Math.sin(Math.PI / 180 * Wsr8))) - (a_8 * C * (Math.cos(Math.PI / 180 * Wss8) - Math.cos(Math.PI / 180 * Wsr8))) + (b8 * A / 2 * (Math.sin(Math.PI / 180 * Wss8) * Math.cos(Math.PI / 180 * Wsr8) - (Math.sin(Math.PI / 180 * Wsr8) * Math.cos(Math.PI / 180 * Wsr8)))) + (b8 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss8), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr8), 2))))
				G19 = 1 / (2 * d9) * ((b9 * A / 2 - (a_9 * B9)) * (Wss9 - Wsr9) * (Math.PI / 180) + ((a_9 * A - b9 * B9) * (Math.sin(Math.PI / 180 * Wss9) - Math.sin(Math.PI / 180 * Wsr9))) - (a_9 * C * (Math.cos(Math.PI / 180 * Wss9) - Math.cos(Math.PI / 180 * Wsr9))) + (b9 * A / 2 * (Math.sin(Math.PI / 180 * Wss9) * Math.cos(Math.PI / 180 * Wsr9) - (Math.sin(Math.PI / 180 * Wsr9) * Math.cos(Math.PI / 180 * Wsr9)))) + (b9 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss9), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr9), 2))))
				G10 = 1 / (2 * d10) * ((b10 * A / 2 - (a_10 * B10)) * (Wss10 - Wsr10) * (Math.PI / 180) + ((a_10 * A - b10 * B10) * (Math.sin(Math.PI / 180 * Wss10) - Math.sin(Math.PI / 180 * Wsr10))) - (a_10 * C * (Math.cos(Math.PI / 180 * Wss10) - Math.cos(Math.PI / 180 * Wsr10))) + (b10 * A / 2 * (Math.sin(Math.PI / 180 * Wss10) * Math.cos(Math.PI / 180 * Wsr10) - (Math.sin(Math.PI / 180 * Wsr10) * Math.cos(Math.PI / 180 * Wsr10)))) + (b10 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss10), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr10), 2))))
				//console.log(G10)	
				G24 = 1 / (2 * d4) * ((b4 * A / 2 - (a_4 * B4)) * (Wss4 + Ws4) * (Math.PI / 180) + ((a_4 * A - b4 * B4) * (Math.sin(Math.PI / 180 * Wss4) - Math.sin(Math.PI / 180 * (-Ws4)))) - (a_4 * C * (Math.cos(Math.PI / 180 * Wss4) - Math.cos(Math.PI / 180 * (-Ws4)))) + (b4 * A / 2 * (Math.sin(Math.PI / 180 * Wss4) * Math.cos(Math.PI / 180 * (-Ws4)) - (Math.sin(Math.PI / 180 * (-Ws4)) * Math.cos(Math.PI / 180 * (-Ws4))))) + (b4 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss4), 2) - Math.pow(Math.sin(Math.PI / 180 * (-Ws4)), 2))))
				G25 = 1 / (2 * d5) * ((b5 * A / 2 - (a_5 * B5)) * (Wss5 + Ws5) * (Math.PI / 180) + ((a_5 * A - b5 * B5) * (Math.sin(Math.PI / 180 * Wss5) - Math.sin(Math.PI / 180 * (-Ws5)))) - (a_5 * C * (Math.cos(Math.PI / 180 * Wss5) - Math.cos(Math.PI / 180 * (-Ws5)))) + (b5 * A / 2 * (Math.sin(Math.PI / 180 * Wss5) * Math.cos(Math.PI / 180 * (-Ws5)) - (Math.sin(Math.PI / 180 * (-Ws5)) * Math.cos(Math.PI / 180 * (-Ws5))))) + (b5 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss5), 2) - Math.pow(Math.sin(Math.PI / 180 * (-Ws5)), 2))))
				G26 = 1 / (2 * d6) * ((b6 * A / 2 - (a_6 * B6)) * (Wss6 + Ws6) * (Math.PI / 180) + ((a_6 * A - b6 * B6) * (Math.sin(Math.PI / 180 * Wss6) - Math.sin(Math.PI / 180 * (-Ws6)))) - (a_6 * C * (Math.cos(Math.PI / 180 * Wss6) - Math.cos(Math.PI / 180 * (-Ws6)))) + (b6 * A / 2 * (Math.sin(Math.PI / 180 * Wss6) * Math.cos(Math.PI / 180 * (-Ws6)) - (Math.sin(Math.PI / 180 * (-Ws6)) * Math.cos(Math.PI / 180 * (-Ws6))))) + (b6 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss6), 2) - Math.pow(Math.sin(Math.PI / 180 * (-Ws6)), 2))))
				G27 = 1 / (2 * d7) * ((b7 * A / 2 - (a_7 * B7)) * (Wss7 + Ws7) * (Math.PI / 180) + ((a_7 * A - b7 * B7) * (Math.sin(Math.PI / 180 * Wss7) - Math.sin(Math.PI / 180 * (-Ws7)))) - (a_7 * C * (Math.cos(Math.PI / 180 * Wss7) - Math.cos(Math.PI / 180 * (-Ws7)))) + (b7 * A / 2 * (Math.sin(Math.PI / 180 * Wss7) * Math.cos(Math.PI / 180 * (-Ws7)) - (Math.sin(Math.PI / 180 * (-Ws7)) * Math.cos(Math.PI / 180 * (-Ws7))))) + (b7 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss7), 2) - Math.pow(Math.sin(Math.PI / 180 * (-Ws7)), 2))))
				G28 = 1 / (2 * d8) * ((b8 * A / 2 - (a_8 * B8)) * (Wss8 + Ws8) * (Math.PI / 180) + ((a_8 * A - b8 * B8) * (Math.sin(Math.PI / 180 * Wss8) - Math.sin(Math.PI / 180 * (-Ws8)))) - (a_8 * C * (Math.cos(Math.PI / 180 * Wss8) - Math.cos(Math.PI / 180 * (-Ws8)))) + (b8 * A / 2 * (Math.sin(Math.PI / 180 * Wss8) * Math.cos(Math.PI / 180 * (-Ws8)) - (Math.sin(Math.PI / 180 * (-Ws8)) * Math.cos(Math.PI / 180 * (-Ws8))))) + (b8 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss8), 2) - Math.pow(Math.sin(Math.PI / 180 * (-Ws8)), 2))))
				G29 = 1 / (2 * d9) * ((b9 * A / 2 - (a_9 * B9)) * (Wss9 + Ws9) * (Math.PI / 180) + ((a_9 * A - b9 * B9) * (Math.sin(Math.PI / 180 * Wss9) - Math.sin(Math.PI / 180 * (-Ws9)))) - (a_9 * C * (Math.cos(Math.PI / 180 * Wss9) - Math.cos(Math.PI / 180 * (-Ws9)))) + (b9 * A / 2 * (Math.sin(Math.PI / 180 * Wss9) * Math.cos(Math.PI / 180 * (-Ws9)) - (Math.sin(Math.PI / 180 * (-Ws9)) * Math.cos(Math.PI / 180 * (-Ws9))))) + (b9 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss9), 2) - Math.pow(Math.sin(Math.PI / 180 * (-Ws9)), 2))))
				G20 = 1 / (2 * d10) * ((b10 * A / 2 - (a_10 * B10)) * (Wss10 + Ws10) * (Math.PI / 180) + ((a_10 * A - b10 * B10) * (Math.sin(Math.PI / 180 * Wss10) - Math.sin(Math.PI / 180 * (-Ws10)))) - (a_10 * C * (Math.cos(Math.PI / 180 * Wss10) - Math.cos(Math.PI / 180 * (-Ws10)))) + (b10 * A / 2 * (Math.sin(Math.PI / 180 * Wss10) * Math.cos(Math.PI / 180 * (-Ws10)) - (Math.sin(Math.PI / 180 * (-Ws10)) * Math.cos(Math.PI / 180 * (-Ws10))))) + (b10 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Wss10), 2) - Math.pow(Math.sin(Math.PI / 180 * (-Ws10)), 2))))
				//console.log(G24)
				G34 = 1 / (2 * d4) * ((b4 * A / 2 - (a_4 * B4)) * (Ws4 - Wsr4) * (Math.PI / 180) + ((a_4 * A - b4 * B4) * (Math.sin(Math.PI / 180 * Ws4) - Math.sin(Math.PI / 180 * Wsr4))) - (a_4 * C * (Math.cos(Math.PI / 180 * Ws4) - Math.cos(Math.PI / 180 * Wsr4))) + (b4 * A / 2 * (Math.sin(Math.PI / 180 * Ws4) * Math.cos(Math.PI / 180 * Wsr4) - (Math.sin(Math.PI / 180 * Wsr4) * Math.cos(Math.PI / 180 * Wsr4)))) + (b4 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Ws4), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr4), 2))))
				G35 = 1 / (2 * d5) * ((b5 * A / 2 - (a_5 * B5)) * (Ws5 - Wsr5) * (Math.PI / 180) + ((a_5 * A - b5 * B5) * (Math.sin(Math.PI / 180 * Ws5) - Math.sin(Math.PI / 180 * Wsr5))) - (a_5 * C * (Math.cos(Math.PI / 180 * Ws5) - Math.cos(Math.PI / 180 * Wsr5))) + (b5 * A / 2 * (Math.sin(Math.PI / 180 * Ws5) * Math.cos(Math.PI / 180 * Wsr5) - (Math.sin(Math.PI / 180 * Wsr5) * Math.cos(Math.PI / 180 * Wsr5)))) + (b5 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Ws5), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr5), 2))))
				G36 = 1 / (2 * d6) * ((b6 * A / 2 - (a_6 * B6)) * (Ws6 - Wsr6) * (Math.PI / 180) + ((a_6 * A - b6 * B6) * (Math.sin(Math.PI / 180 * Ws6) - Math.sin(Math.PI / 180 * Wsr6))) - (a_6 * C * (Math.cos(Math.PI / 180 * Ws6) - Math.cos(Math.PI / 180 * Wsr6))) + (b6 * A / 2 * (Math.sin(Math.PI / 180 * Ws6) * Math.cos(Math.PI / 180 * Wsr6) - (Math.sin(Math.PI / 180 * Wsr6) * Math.cos(Math.PI / 180 * Wsr6)))) + (b6 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Ws6), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr6), 2))))
				G37 = 1 / (2 * d7) * ((b7 * A / 2 - (a_7 * B7)) * (Ws7 - Wsr7) * (Math.PI / 180) + ((a_7 * A - b7 * B7) * (Math.sin(Math.PI / 180 * Ws7) - Math.sin(Math.PI / 180 * Wsr7))) - (a_7 * C * (Math.cos(Math.PI / 180 * Ws7) - Math.cos(Math.PI / 180 * Wsr7))) + (b7 * A / 2 * (Math.sin(Math.PI / 180 * Ws7) * Math.cos(Math.PI / 180 * Wsr7) - (Math.sin(Math.PI / 180 * Wsr7) * Math.cos(Math.PI / 180 * Wsr7)))) + (b7 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Ws7), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr7), 2))))
				G38 = 1 / (2 * d8) * ((b8 * A / 2 - (a_8 * B8)) * (Ws8 - Wsr8) * (Math.PI / 180) + ((a_8 * A - b8 * B8) * (Math.sin(Math.PI / 180 * Ws8) - Math.sin(Math.PI / 180 * Wsr8))) - (a_8 * C * (Math.cos(Math.PI / 180 * Ws8) - Math.cos(Math.PI / 180 * Wsr8))) + (b8 * A / 2 * (Math.sin(Math.PI / 180 * Ws8) * Math.cos(Math.PI / 180 * Wsr8) - (Math.sin(Math.PI / 180 * Wsr8) * Math.cos(Math.PI / 180 * Wsr8)))) + (b8 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Ws8), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr8), 2))))
				G39 = 1 / (2 * d9) * ((b9 * A / 2 - (a_9 * B9)) * (Ws9 - Wsr9) * (Math.PI / 180) + ((a_9 * A - b9 * B9) * (Math.sin(Math.PI / 180 * Ws9) - Math.sin(Math.PI / 180 * Wsr9))) - (a_9 * C * (Math.cos(Math.PI / 180 * Ws9) - Math.cos(Math.PI / 180 * Wsr9))) + (b9 * A / 2 * (Math.sin(Math.PI / 180 * Ws9) * Math.cos(Math.PI / 180 * Wsr9) - (Math.sin(Math.PI / 180 * Wsr9) * Math.cos(Math.PI / 180 * Wsr9)))) + (b9 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Ws9), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr9), 2))))
				G30 = 1 / (2 * d10) * ((b10 * A / 2 - (a_10 * B10)) * (Ws10 - Wsr10) * (Math.PI / 180) + ((a_10 * A - b10 * B10) * (Math.sin(Math.PI / 180 * Ws10) - Math.sin(Math.PI / 180 * Wsr10))) - (a_10 * C * (Math.cos(Math.PI / 180 * Ws10) - Math.cos(Math.PI / 180 * Wsr10))) + (b10 * A / 2 * (Math.sin(Math.PI / 180 * Ws10) * Math.cos(Math.PI / 180 * Wsr10) - (Math.sin(Math.PI / 180 * Wsr10) * Math.cos(Math.PI / 180 * Wsr10)))) + (b10 * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * Ws10), 2) - Math.pow(Math.sin(Math.PI / 180 * Wsr10), 2))))
				//console.log(G34)
				G44 = G24 + G34;
				G45 = G25 + G35;
				G46 = G26 + G36;
				G47 = G27 + G37;
				G48 = G28 + G38;
				G49 = G29 + G39;
				G40 = G20 + G30;
				//console.log(G44)
				0 > G14 ? G54 = 0 : G54 = G14;
				0 > G15 ? G55 = 0 : G55 = G15;
				0 > G16 ? G56 = 0 : G56 = G16;
				0 > G17 ? G57 = 0 : G57 = G17;
				0 > G18 ? G58 = 0 : G58 = G18;
				0 > G19 ? G59 = 0 : G59 = G19;
				0 > G10 ? G50 = 0 : G50 = G10;
				//console.log(G54)
				0 > G44 ? G64 = 0 : G64 = G44;
				0 > G45 ? G65 = 0 : G65 = G45;
				0 > G46 ? G66 = 0 : G66 = G46;
				0 > G47 ? G67 = 0 : G67 = G47;
				0 > G48 ? G68 = 0 : G68 = G48;
				0 > G49 ? G69 = 0 : G69 = G49;
				0 > G40 ? G60 = 0 : G60 = G40;
				//console.log(G64)
				Wss4 < Wsr4 ? D14 = G64 : D14 = G54;
				Wss5 < Wsr5 ? D15 = G65 : D15 = G55;
				Wss6 < Wsr6 ? D16 = G66 : D16 = G56;
				Wss7 < Wsr7 ? D17 = G67 : D17 = G57;
				Wss8 < Wsr8 ? D18 = G68 : D18 = G58;
				Wss9 < Wsr9 ? D19 = G69 : D19 = G59;
				Wss10 < Wsr10 ? D10 = G60 : D10 = G50;
				//console.log(D18)
				R4 = D14 + (Hs4 / (2 * Hz4) * (1 + Math.cos(Math.PI / 180 * bestDip))) + (reflectivity / 2 * (1 - Math.cos(Math.PI / 180 * bestDip)));
				R5 = D15 + (Hs5 / (2 * Hz5) * (1 + Math.cos(Math.PI / 180 * bestDip))) + (reflectivity / 2 * (1 - Math.cos(Math.PI / 180 * bestDip)));
				R6 = D16 + (Hs6 / (2 * Hz6) * (1 + Math.cos(Math.PI / 180 * bestDip))) + (reflectivity / 2 * (1 - Math.cos(Math.PI / 180 * bestDip)));
				R7 = D17 + (Hs7 / (2 * Hz7) * (1 + Math.cos(Math.PI / 180 * bestDip))) + (reflectivity / 2 * (1 - Math.cos(Math.PI / 180 * bestDip)));
				R8 = D18 + (Hs8 / (2 * Hz8) * (1 + Math.cos(Math.PI / 180 * bestDip))) + (reflectivity / 2 * (1 - Math.cos(Math.PI / 180 * bestDip)));
				R9 = D19 + (Hs9 / (2 * Hz9) * (1 + Math.cos(Math.PI / 180 * bestDip))) + (reflectivity / 2 * (1 - Math.cos(Math.PI / 180 * bestDip)));
				R10 = D10 + (Hs10 / (2 * Hz10) * (1 + Math.cos(Math.PI / 180 * bestDip))) + (reflectivity / 2 * (1 - Math.cos(Math.PI / 180 * bestDip)));
				//console.log(R6)

				Ht4 = R4 * Hz4;
				Ht5 = R5 * Hz5;
				Ht6 = R6 * Hz6;
				Ht7 = R7 * Hz7;
				Ht8 = R8 * Hz8;
				Ht9 = R9 * Hz9;
				Ht10 = R10 * Hz10;



				/*Ht4 = (Hz4/Math.cos(Math.PI/180*bestDip))+Hs4;
				console.log(Ht4)
				//console.log(typeof Ht4)
				Ht5 = (Hz5/Math.cos(Math.PI/180*bestDip))+Hs5;
				Ht6 = (Hz6/Math.cos(Math.PI/180*bestDip))+Hs6;
				Ht7 = (Hz7/Math.cos(Math.PI/180*bestDip))+Hs7;
				Ht8 = (Hz8/Math.cos(Math.PI/180*bestDip))+Hs8;
				Ht9 = (Hz9/Math.cos(Math.PI/180*bestDip))+Hs9;
				Ht10 = (Hz10/Math.cos(Math.PI/180*bestDip))+Hs10;*/
				Hm = ((Ht4 * april) + (Ht5 * may) + (Ht6 * june) + (Ht7 * july) + (Ht8 * august) + (Ht9 * september) + (Ht10 * october)) / (april + may + june + july + august + september + october);
				Qg4 = april * electricity * Ht4 * eff1 * eff2;
				Qg5 = may * electricity * Ht5 * eff1 * eff2;
				Qg6 = june * electricity * Ht6 * eff1 * eff2;
				Qg7 = july * electricity * Ht7 * eff1 * eff2;
				Qg8 = august * electricity * Ht8 * eff1 * eff2;
				Qg9 = september * electricity * Ht9 * eff1 * eff2;
				Qg10 = october * electricity * Ht10 * eff1 * eff2;
				lossApril = Qg4 - Qc4;
				lossMay = Qg5 - Qc5;
				lossJune = Qg6 - Qc6;
				lossJuly = Qg7 - Qc7;
				lossAugust = Qg8 - Qc8;
				lossSeptember = Qg9 - Qc9;
				lossOctober = Qg10 - Qc10;
				lossArr = [];
				lossArr.push(lossApril, lossMay, lossJune, lossJuly, lossAugust, lossSeptember, lossOctober);
				//console.log(lossArr);
				tmpArr = [];
				sum = 0;
				min = 0;
				for (var j = 0; j < lossArr.length; j++) {
					if (lossArr[j] < 0) {
						tmpArr.push(lossArr[j])
					} else {
						if (tmpArr.length > 0) {
							sum = Sum(tmpArr);
							min = Math.min(sum, min);
							tmpArr = [];
							if ((sum + lossArr[j] < 0)) {
								tmpArr.push(sum + lossArr[j])
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
				$("#electricity").text(function () {
					return electricity.toFixed(5)
				});
				$("#Im-1").text(function () {
					return electricity.toFixed(5)
				});
				$("#dip-1").text(function () {
					return bestDip
				});
				$("#Ht4").text(function () {
					return Ht4.toFixed(2)
				});
				$("#Ht5").text(function () {
					return Ht5.toFixed(2)
				});
				$("#Ht6").text(function () {
					return Ht6.toFixed(2)
				});
				$("#Ht7").text(function () {
					return Ht7.toFixed(2)
				});
				$("#Ht8").text(function () {
					return Ht8.toFixed(2)
				});
				$("#Ht9").text(function () {
					return Ht9.toFixed(2)
				});
				$("#Ht10").text(function () {
					return Ht10.toFixed(2)
				});
				$("#Hm").text(function () {
					return Hm.toFixed(2)
				});
				$("#Qg4").text(function () {
					return Qg4.toFixed(2)
				});
				$("#Qg5").text(function () {
					return Qg5.toFixed(2)
				});
				$("#Qg6").text(function () {
					return Qg6.toFixed(2)
				});
				$("#Qg7").text(function () {
					return Qg7.toFixed(2)
				});
				$("#Qg8").text(function () {
					return Qg8.toFixed(2)
				});
				$("#Qg9").text(function () {
					return Qg9.toFixed(2)
				});
				$("#Qg10").text(function () {
					return Qg10.toFixed(2)
				});
				$("#loss-april").text(function () {
					return lossApril.toFixed(2)
				});
				$("#loss-may").text(function () {
					return lossMay.toFixed(2)
				});
				$("#loss-june").text(function () {
					return lossJune.toFixed(2)
				});
				$("#loss-july").text(function () {
					return lossJuly.toFixed(2)
				});
				$("#loss-august").text(function () {
					return lossAugust.toFixed(2)
				});
				$("#loss-september").text(function () {
					return lossSeptember.toFixed(2)
				});
				$("#loss-october").text(function () {
					return lossOctober.toFixed(2)
				});
				$("#all-loss").text(function () {
					return Math.abs(min.toFixed(5))
				})
			})
		}
	})
	//计算单位面积蓄电池容量
	$("#btn-Bn").click(function () {
		$("#Bn-number").css("display", "block");
		Bn = Math.abs(min.toFixed(5)) / (DOD * eff2);
		$("#Bn").text(function () {
			return Bn.toFixed(2)
		})
	});
	//计算单位建筑面积方阵容量Pn
	$("#btn-Pn").click(function () {
		Pn = safeEff * electricity * (batteryU + Ud)
		$("#pn-number").css("display", "block");
		$("#Pn").text(function () {
			return Pn.toFixed(2)
		})
	})
	//光伏组件投影面积
	$("#btn-Spv").click(function () {
		//(Hz5/Math.cos(Math.PI/180*dip))+Hs5
		if (roof1 == 1 || roof1 == 2) {
			Spv = height * width * Math.cos(Math.PI / 180 * bestDip)
		} else if (roof1 == 3) {
			Spv = height * width
		} else if (roof1 == 4 || roof1 == 5) {
			Spv = height * width * Math.cos(Math.PI / 180 * dip)
			console.log(dip)
		}
		console.log(bestDip);
		$("#Spv-number").css("display", "block");
		$("#Spv").text(function () {
			return Spv.toFixed(2)
		})
	})
	//光伏阵列容量计算
	$("#btn-Pm").click(function () {
		if (roof1 == 1) {
			$("#install-1").css("display", "block");
		} else if (roof1 == 2) {
			$("#install-2").css("display", "block")
		} else if (roof1 == 3) {
			$("#install-3").css("display", "block")
		} else if (roof1 == 4) {
			$("#install-4").css("display", "block")
		} else if (roof1 == 5) {
			$("#install-5").css("display", "block");
			temperature = Number($("#temperature").val())
		}
	})
	//光伏阵列前后排间距计算
	$("#btn-D").click(function () {
		$("#D-number").css("display", "block");
		space = (height * Math.cos(Math.PI / 180 * bestDip)) + (height * Math.sin(Math.PI / 180 * bestDip) * (((0.707 * Math.tan(Math.PI / 180 * latitude)) + 0.4338) / (0.707 - (0.4338 * Math.tan(Math.PI / 180 * latitude)))))
		console.log(space)
		$("#D").text(function () {
			return space.toFixed(2)
		})
	})
	//屋面光伏组件间系数
	$("#btn-y").click(function () {
		$("#yy-number").css("display", "block");
		spaceEff = (2 * height * Math.cos(Math.PI / 180 * bestDip)) / ((height * Math.cos(Math.PI / 180 * bestDip)) + space);
		console.log(spaceEff)
		$("#yy").text(function () {
			return spaceEff.toFixed(2)
		})
	})
	//安装方式1的Pm
	$("#btn-pm1").click(function () {
		$("#pm1-number").css("display", "block");
		$("#pm2-number").css("display", "none");
		$("#pm3-number").css("display", "none");
		$("#pm4-number").css("display", "none");
		$("#pm5-number").css("display", "none");
		Pm = (Wp / Spv) * spaceEff * areaEff;
		$("#pm1").text(function () {
			return Pm.toFixed(2)
		})
	})
	//安装方式2的Pm
	$("#btn-pm2").click(function () {
		$("#pm2-number").css("display", "block");
		$("#pm1-number").css("display", "none");
		$("#pm3-number").css("display", "none");
		$("#pm4-number").css("display", "none");
		$("#pm5-number").css("display", "none");
		Pm = (Wp / Spv) * areaEff
		$("#pm2").text(function () {
			return Pm.toFixed(2)
		})
	})
	//安装方式3的Pm
	$("#btn-pm3").click(function () {
		$("#pm3-number").css("display", "block");
		$("#pm2-number").css("display", "none");
		$("#pm1-number").css("display", "none");
		$("#pm4-number").css("display", "none");
		$("#pm5-number").css("display", "none");
		Pm = (Wp / Spv) * areaEff
		$("#pm3").text(function () {
			return Pm.toFixed(2)
		})
	})
	//安装方式4的Pm
	$("#btn-pm4").click(function () {
		$("#pm4-number").css("display", "block");
		$("#pm2-number").css("display", "none");
		$("#pm3-number").css("display", "none");
		$("#pm1-number").css("display", "none");
		$("#pm5-number").css("display", "none");
		let location1 = Number($("#location1").val());
		Pm = (Wp / Spv) * areaEff * location1
		$("#pm4").text(function () {
			return Pm.toFixed(2)
		})
	})
	//安装方式5的Pm
	$("#btn-pm5").click(function () {
		$("#pm5-number").css("display", "block");
		$("#pm2-number").css("display", "none");
		$("#pm3-number").css("display", "none");
		$("#pm4-number").css("display", "none");
		$("#pm1-number").css("display", "none");
		let location2 = Number($("#location2").val());
		Pm = (Wp / Spv) * areaEff * temperature * location2
		$("#pm5").text(function () {
			return Pm.toFixed(2)
		})
	})
	//最终决定最佳搭配
	$("#btn-judge").click(function () {
		if (Pn > Pm) {
			$("#judge1").css("display", "block")
			$("#judge2").css("display", "none")
		} else if (Pn <= Pm) {
			$("#judge2").css("display", "block")
			$("#judge1").css("display", "none")
		}
	})
	//最终计算方阵容量和蓄电池容量、
	$("#btn-BP").click(function () {
		let area = Number($("#areaF").val());
		let B = Bn * area;
		let P = Pn * area;
		$("#B-number").css("display", "block")
		$("#P-number").css("display", "block")
		$("#B").text(function () {
			return B.toFixed(2)
		})
		$("#P").text(function () {
			return P.toFixed(2)
		})
	})
})