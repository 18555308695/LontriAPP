var api = "";
$(function() {
		api = 'https://iotlighting.lontri.com:8081/SmartIoTWCFService/IoTRESTService.svc'
		//api = 'https://ab-inbev-ziy.lontri.com/SmartIoTWCFService/IoTRESTService.svc'
	GetToken();
	BindToggle();
	BindStatusToggle();
	GW();
//	GetGW();
	//queryJoin();
	//$("#optionLoading").hide();
	// $("#bcid").hide(); //页面加载完毕后即将DIV隐藏
	// $("#btn6").click(function(){$("#bcid").show();});


})

// 打开二维码扫描界面 
function openBarcode() {
	createWithoutTitle('barcode_scan.html', {
		titleNView: {
			type: 'float',
			backgroundColor: 'rgba(215,75,40,0.3)',
			titleText: '扫一扫',
			titleColor: '#FFFFFF',
			autoBackButton: true,
			buttons: [{
				fontSrc: '_www/helloh5.ttf',
				text: '\ue302',
				fontSize: '18px',
				onclick: 'javascript:scanPicture()'
			}]
		}
	});
}
// 网关二维码扫描界面 
function openBarcodeGW() {
	createWithoutTitle('barcode_scan2.html', {
		titleNView: {
			type: 'float',
			backgroundColor: 'rgba(215,75,40,0.3)',
			titleText: '扫一扫',
			titleColor: '#FFFFFF',
			autoBackButton: true,
			buttons: [{
				fontSrc: '_www/helloh5.ttf',
				text: '\ue302',
				fontSize: '18px',
				onclick: 'javascript:scanPicture()'
			}]
		}
	});
}
//网关扫描var scanGatewayId="";function scanedGW(t, r, f) {	//alert(r)	scanGatewayId=r
//	alert(scanGatewayId)	var number = /^[a-fA-F0-9]*$/	if (!number.test(r)) {		alert("请扫描正确的网关二维码 内容:" + r)	} else if (r.length != 24) {		alert("请扫描正确的网关二维码 内容长度:" + r.length)	} else {		QueryGateway();		// let flag = true;		// $('li').each(function() {		// 	if ($(this).text().substring($(this).text().length - 16, $(this).text().length) == r) {		// 		flag = false;		// 		alert("请不要重复扫描二维码")		// 	}		// });	}}
//根据gatewayid查找网关
var GlobgatewayId="";
var GlobgatewayName="";
function QueryGateway(){
	var gatewayid=scanGatewayId;
	console.log(gatewayid)
	$.ajax({
		type: "GET",
		url: api + '/queryGateway/'+gatewayid,
		contentType: "application/x-www-form-urlencoded; charset=gbk",
		beforeSend: function(request) {
			request.setRequestHeader("Authorization", "Bearer " + getLocalData());
		},
		success: function(data) {
			console.log("data"+data)
			GlobgatewayId=data.gatewayId
			GlobgatewayName=data.gatewayName
			if(GlobgatewayId==undefined){
				window.localStorage.setItem("GlobgatewayId",scanGatewayId);
				alert("该网关信息编号不存在，请填写网关编号")
				var optio = '';
				optio = optio + "<option value='" + scanGatewayId + "'>" + scanGatewayId + "</option>";
				$('#gwID').html(optio);
			}
			else{
			 window.localStorage.setItem("GlobgatewayId",data.gatewayId);
			 window.localStorage.setItem("GlobgatewayName",data.gatewayName);
			console.log(data)
			var optio = '';
			optio = optio + "<option value='" + data.gatewayId + "'>" + data.gatewayName + "</option>";
			$('#gwID').html(optio);
			GW();
			}
			
		}
	});
}
function GW(){
		// localStorage.removeItem("GlobgatewayName");
		// localStorage.removeItem("GlobgatewayId");
	console.log("GlobgatewayId"+GlobgatewayId)
	console.log("GlobgatewayName"+GlobgatewayName)
	var GlobgatewayId = window.localStorage.getItem('GlobgatewayId');
	var GlobgatewayName = window.localStorage.getItem('GlobgatewayName');
	if(GlobgatewayName==null||GlobgatewayName==undefined){
		$('#gwID').html();
	}
	
	// else if(scanGatewayId!=GlobgatewayName){
	// 	localStorage.removeItem("GlobgatewayName");
	// 	localStorage.removeItem("GlobgatewayId");
	// }
	else{
		var optio = '';
		optio = optio + "<option value='" + GlobgatewayId + "'>" + GlobgatewayName+ "</option>";
		$('#gwID').html(optio);
	}

	
}
//加载扫描出的二维码信息
var arrinfor = [];
var two = [];

function scaned(t, r, f) {
	var number = /^[a-fA-F0-9]*$/
	if (!number.test(r)) {
		alert("请扫描正确的CU二维码 内容:" + r)
	} else if (r.length != 16) {
		alert("请扫描正确的CU二维码 内容长度:" + r.length)
	} else {
		let flag = true;
		$('li').each(function() {
			if ($(this).text().substring($(this).text().length - 16, $(this).text().length) == r) {
				flag = false;
				alert("请不要重复扫描二维码")
			}
		});
		if (flag) {
			let indexId = $("#lstCU li").length + 1
			// $("#lstCU").prepend("<li class='mui-table-view-cell mui-collapse'>" +
			// 	"<a class='mui-navigate-right' href=' '>" +
			// 	"<input name='chkcu' type='checkbox' checked='checked' value='" + r + "'>&nbsp;" + "<span class='hdata'>" + "序号:" +
			// 	indexId + "</span>" +
			// 	"<div class='hdata'>" + r + "</div>" +"<input id='cuinfo' type='text' style='width:80px;height:30px'>"+
			// 	"</ a>" +
			// 	"</li>"
			// );
			$("#lstCU").prepend("<li class='mui-table-view-cell mui-collapse'>" +
				"<a class='mui-navigate-right' href=' '>" +
				"<input name='chkcu' type='checkbox' checked='checked' value='" + r + "'>&nbsp;" + "<span class='hdata'>" + "序号:" +
				indexId + "</span>" +
				"<div class='hdata'>" + r + "</div>" +
				"</ a>" +
				"</li>"
			);
		}
	}
}
//批量入网操作
function joinNet() {
	if (!confirm('确认要批量入网吗')) {
		return;
	}

var libselect = document.getElementById("gwID");//获取下拉框ID
	var index=libselect.selectedIndex;        //拿到选中项(option)的索引(index)
	var selectvalue=libselect.options[index].value;             //拿到选中项options的value
	if (selectvalue == null || selectvalue == "") {
		alert("请选择网关信息")
	}
	var arrZigbeeID=[];
	var cuhead=[];
	$('input[name="chkcu"]').each(function() {
		var flag = $(this).prop('checked');
		if (flag == true) {
			$(this).prop("checked", true);
			arrZigbeeID.push($(this).attr("value"));
		}
	});
	 var controls = document.getElementsByTagName('input');
		 for(var i=0; i<controls.length; i++){
		     if(controls[i].type=='text'){
		        var vl=controls[i].value
				console.log(vl)
				if(vl==""){
					alert("请输入CU编号信息");
					return;
					}
					else{
							cuhead.push(vl);
					}
		       }
		 }
	//var arrZigbeeID=["60A423FFFE571F95"]
	//var selectvalue="39FFD6055256323444592243"
	if (arrZigbeeID.length == 0) {
		alert('请选择提交CU信息');
		return;
	}
	console.log("arrZigbeeID"+arrZigbeeID)
	console.log("selectvalue"+selectvalue)
	
	var CUListInfo=[]	for (var x = 0; x < arrZigbeeID.length; x++) {	  var cuInfo = {	    "zigbeeid": arrZigbeeID[x],	    "header": cuhead[x]	  };	  CUListInfo.push(cuInfo);	}
	console.log("CUListInfo"+JSON.stringify(CUListInfo))
	console.log("selectvalue"+selectvalue)
	$.ajax({
		type: 'post', //也可为get
		url: api + '/uploaddriverlightsintialrawdata',
		async: true,
		data: JSON.stringify({
			//'lightIds': arrZigbeeID, //json格式
			'gatewayId': selectvalue,
			'CUListInfo':CUListInfo
		}),
		header: {
			'Authorization': 'Bearer ' + getLocalData()
		},
		dataType: 'json',
		beforeSend: function(request) {
			request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		},
		success: function(data, status) {
			if (data.success == true) {
			//	alert(data.message);
				 alert('指令发送成功！');
			} else {
				alert(data.message);
			}
		},
		error: function(data, status, e) {
			alert("接口调用失败")
		}
	});
}


//清空缓存
function updateexpiredata(){
	$.ajax({
		type: 'post', //也可为get
		url: api + '/updateexpiredata',
		//data: JSON.stringify(paramarr),
		dataType: 'json',
		async: true,
		beforeSend: function(request) {
			request.setRequestHeader("Authorization", "Bearer " + getLocalData());
			request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		},
		success: function(data, status) {
			alert(data.message);
		},
		error: function(data, status, e) {
	
		}
	});
}
var currentMacID = [];
//写入白名单查询
function queryJoinMacID() {
	var arrwriteJoin = [];
	var arrwriteClear = [];
	var libselect = document.getElementById("gwID");//获取下拉框ID
	var index=libselect.selectedIndex;        //拿到选中项(option)的索引(index)
	var selectvalue=libselect.options[index].value;             //拿到选中项options的value
	if (selectvalue == null || selectvalue == "") {
		alert("请选择网关信息")
	}
	currentMacID = [];
	$("#lstCUwrite").empty();
	$.ajax({
		type: 'post', //也可为get
		url: api + '/queryWhiteListByGW',
		header: {
			'Authorization': 'Bearer ' + getLocalData()
		},
		data: JSON.stringify({
			'gatewayId': selectvalue
		}),
		beforeSend: function(request) {
			request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		},
		async: true,
		success: function(data) {
			currentMacID = [];
			for (var i = 0; i < data.length; i++) {
				var zig = data[i].zigbeeid.substring(4, 20)
				if (data[i].WriteListStatus == 1) {
					arrwriteJoin.push(data[i]);
					data[i].WriteListStatus = "写入";
					currentMacID.push(data[i]);
					$("#lstCUwrite").append("<li  class='mui-table-view-cell mui-collapse skincheck'>" +
						"<a class='hdata' href='#'>" +
						"<input onclick='checkRad(this)' name='chkcu' type='checkbox' checked='checked' value='" + data[i].zigbeeid +
						"' status='" + data[i].IsJoinNet + "' lightid='" + data[i].LightID + "' gwName='" + data[i].expectGatewayName +
						"'>&nbsp;" + zig +
						"&nbsp; &nbsp;状态:" + data[i].WriteListStatus +
						"</a>" +
						"<ul class='mui-table-view mui-table-view-chevron'>" +
						"<a class='mui-navigate-right' href='#'>" +
						"<li class='mui-table-view-cell'>" + "<a class='mui-navigate-right' href='#'>" +
						"设备名:" + zig + "  ZigbeeID:" + zig + "</a></li>" +
						"</a>"
					);
				} else {
					arrwriteClear.push(data[i])
					data[i].WriteListStatus = "未写入";
					currentMacID.push(data[i]);
					$("#lstCU").append("<li  class='mui-table-view-cell mui-collapse skincheck'>" +
						"<a class='hdata' href='#'>" +
						"<input onclick='checkRad(this)' name='chkcu' type='checkbox' checked='checked' value='" + data[i].zigbeeid +
						"' status='" + data[i].IsJoinNet + "' lightid='" + data[i].LightID + "' gwName='" + data[i].expectGatewayName +
						"'>&nbsp;" + zig +
						"&nbsp; &nbsp;状态:" + data[i].WriteListStatus +
						"</a>" +
						"<ul class='mui-table-view mui-table-view-chevron'>" +
						"<a class='mui-navigate-right' href='#'>" +
						"<li class='mui-table-view-cell'>" + "<a class='mui-navigate-right' href='#'>" +
						"设备名:" + zig + "  ZigbeeID:" + zig + "</a></li>" +
						"</a>" +
						"<li style='margin-left:30px; margin-bottom:5px;'><button name='checkitem' onclick='turnOnTwo()'>开灯</button><button onclick='turnOffTwo()'>关灯</button></li> </ul>" +
						"</li>"
					);
				}
			}
			$("#joinwritecount").html("写入量:" + "<lable style='color:red;'>" + arrwriteJoin.length + "</lable>");
			$("#leavewritecount").html("未写入量:" + "<lable style='color:red;'>" + arrwriteClear.length + "</lable>");
		},
		error: function(data, status, e) {
			alert("发送指令发送失败")
		}
	});
}
//入网状态查询
var numbermin;
var arrRetry=[]
var arrjoin=[];
function queryJoin() {
	var arrClear = [];
	var arrJoin = [];
	var libselect = document.getElementById("gwID");//获取下拉框ID
	var index=libselect.selectedIndex;        //拿到选中项(option)的索引(index)
	var selectvalue=libselect.options[index].value;             //拿到选中项options的value
	if (selectvalue == null || selectvalue == "") {
		alert("请选择网关信息")
	}
	currentData = [];
	$("#lstCU").empty();
	$.ajax({
		type: 'post', //也可为get
		url: api + '/queryWhiteListByGW',
		header: {
			'Authorization': 'Bearer ' + getLocalData()
		},
		data: JSON.stringify({
			'gatewayId': selectvalue
		}),
		beforeSend: function(request) {
			request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		},
		async: true,
		success: function(data) {
			currentData = [];
			arrRetry=[];
			arrjoin=[];
			var html = "";
			for (var i = 0; i < data.length; i++) {
				var zig = data[i].zigbeeid.substring(4, 20)
				if (data[i].IsJoinNet == true) {
					arrJoin.push(data[i]);
					data[i].IsJoinNet = "入网";
					//arrjoin.push(data[i].zigbeeid)
					currentData.push(data[i]);
					$("#lstCU").append("<li  class='mui-table-view-cell mui-collapse skincheck'>" +
						"<a class='hdata' href='#'>" +
						"<input onclick='checkRad(this)' name='chkcu' type='checkbox' checked='checked' value='" + data[i].zigbeeid +
						"' status='" + data[i].IsJoinNet + "' lightid='" + data[i].LightID + "' gwName='" + data[i].expectGatewayName +
						"'>&nbsp;" + zig +
						"&nbsp; &nbsp;状态:" + data[i].IsJoinNet +
						"</a>" +
						"<ul class='mui-table-view mui-table-view-chevron'>" +
						"<a class='mui-navigate-right' href='#'>" +
						"<li class='mui-table-view-cell'>"  +
						"设备名:" + zig + "  ZigbeeID:" + data[i].LightID + "</a></li>" +
						"<a class='mui-navigate-right' href='#'>" +
						"<li class='mui-table-view-cell'>" +
						"<button name='checkitem' onclick='turnOnTwo()'>开灯</button><button onclick='turnOffTwo()'>关灯</button>"+ "</a></li>" +
						"</ul>"+
						//"<li style='margin-left:30px; margin-bottom:15px;'><button name='checkitem' onclick='turnOnTwo()'>开灯</button><button onclick='turnOffTwo()'>关灯</button></li> </ul>" +
						"</li>"
					);
				} else {
					arrClear.push(data[i])
					data[i].IsJoinNet = "离网";
					currentData.push(data[i]);
					arrRetry.push(data[i].zigbeeid)
					$("#lstCU").append("<li  class='mui-table-view-cell mui-collapse skincheck'>" +
						"<a class='clearnet' href='#'>" +
						"<input onclick='checkRad(this)' name='chkcu' type='checkbox' checked='checked' value='" + data[i].zigbeeid +
						"' status='" + data[i].IsJoinNet + "' lightid='" + data[i].LightID + "' gwName='" + data[i].expectGatewayName +
						"'>&nbsp;" + zig +
						"&nbsp; &nbsp;状态:" + data[i].IsJoinNet +
						"</a>" + "<ul class='mui-table-view mui-table-view-chevron'>" +
						//"<a class='mui-navigate-right' href='#'>" +
						"<li class='mui-table-view-cell'>" + "<a class='mui-navigate-right' href='#'>" +
						"设备名:" + zig + "  ZigbeeID:" + zig + "</a></li>"
						//"</a>"+
						// "<li style='margin-left:30px; margin-bottom:5px;'><button name='checkitem' onclick='turnOn()'>开灯</button><button onclick='turnOff()'>关灯</button></li> </ul>"+
						// "</li>"
					);
				}

			}
			numbermin = arrClear.length
			$("#joincount").html("入网量:" + "<lable style='color:red;'>" + arrJoin.length + "</lable>");
			$("#leavecount").html("离网量:" + "<lable style='color:red;'>" + arrClear.length + "</lable>");
			//window.setInterval("queryJoin()", 2000);
		},
		error: function(data, status, e) {
			alert("发送指令发送失败")
		}
	});
}

function checkRad(ths) {
	var flag = $(ths).prop('checked');
	if (flag == true) {
		$(this).prop("checked", true);
	} else {
		$(ths).removeAttr("checked");
	}

	// if($(ths).hasOwnProperty("checked")){
	// 	$(ths).removeAttr("checked");
	// }
	// else{
	// 	$(ths).attr("checked", "checked");
	// 	alert(1)
	// }
	//$(ths.parentElement).attr("skipCheck", "true");
	//$(ths.parentNode).removeClass("mui-collapse")
}
//清网
function cleanNet() {
	if (!confirm('确认要清网吗')) {
		return;
	}

	var libselect = document.getElementById("gwID");//获取下拉框ID
	var index=libselect.selectedIndex;        //拿到选中项(option)的索引(index)
	var selectvalue=libselect.options[index].value;             //拿到选中项options的value
	if (selectvalue == null || selectvalue == "") {
		alert("请选择网关信息")
	}

	var lightIDLst = [];
	$('input[name="chkcu"]').each(function() {
		if ($(this).attr("checked") == "checked") {
			var gwName = $(this).attr("gwName");
			lightIDLst.push($(this).attr("lightid"));
		}
	});
	if (lightIDLst.length == 0) {
		alert('请选择清网灯信息');
		return;
	}
	$.ajax({
		type: 'post', //也可为get
		url: api + '/clearjoinnet',
		async: true,
		data: JSON.stringify({
			'lightIds': lightIDLst, //json格式
			'gatewayId': selectvalue,
			type: "clearjoinnet"
		}),
		header: {
			'Authorization': 'Bearer' + getLocalData()
		},
		dataType: 'json',
		beforeSend: function(request) {
			request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		},
		success: function(data, status) {

			alert('指令发送成功！');

		},
		error: function(data, status, e) {
			alert('接口调用错误！');
		}
	});

}
//一键开灯
function AllturnOn() {
	{
		var libselect = document.getElementById("gwID");//获取下拉框ID
		var index=libselect.selectedIndex;        //拿到选中项(option)的索引(index)
		var selectvalue=libselect.options[index].value;             //拿到选中项options的value
		if (selectvalue == null || selectvalue == "") {
			alert("请选择网关信息")
		}
		var paramarr = {
			'id': selectvalue, //json格式
			'value': selectvalue,
			'type': "gw"
		}
		$.ajax({
			type: 'post', //也可为get
			url: api + '/turnonbygw',
			data: JSON.stringify(paramarr),
			dataType: 'json',
			async: true,
			beforeSend: function(request) {
				request.setRequestHeader("Authorization", "Bearer " + getLocalData());
				request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			},
			success: function(data, status) {
				if (data.success == true) {
					alert("广播开灯执行完成")
				} else {
					alert(data.message);
				}
			},
			error: function(data, status, e) {

			}
		});
	}

}
//一键关灯
function AllturnOff() {
	{
		var libselect = document.getElementById("gwID");//获取下拉框ID
		var index=libselect.selectedIndex;        //拿到选中项(option)的索引(index)
		var selectvalue=libselect.options[index].value;             //拿到选中项options的value
		if (selectvalue == null || selectvalue == "") {
			alert("请选择网关信息")
		}
		var paramarr = {
			'id': selectvalue, //json格式
			'value': selectvalue,
			'type': "gw"
		}
		$.ajax({
			type: 'post', //也可为get
			url: api + '/turnoffbygw',
			data: JSON.stringify(paramarr),
			dataType: 'json',
			async: true,
			beforeSend: function(request) {
				request.setRequestHeader("Authorization", "Bearer " + getLocalData());
				request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			},
			success: function(data, status) {
				if (data.success == true) {
					alert('广播关灯执行完成！');
				} else {
					alert(data.message);
				}
			},
			error: function(data, status, e) {

			}
		});
	}
	//alert("广播关灯执行完成")
}
//顺序开灯
function turnOn() {
	var count = $('input[name="chkcu"]:checked').length;
	if (count == 0) {
		alert('请选择顺序开灯信息');
		return;
	}
	plus.nativeUI.showWaiting();
	$('input[name="chkcu"]').each(function() {
		var flag = $(this).prop('checked');
		if (flag == true) {
			$(this).prop("checked", true);
			var gwName = $(this).attr("gwName");
			if (gwName != null && gwName != "") {
				$.ajax({
					type: 'post',
					url: api + '/turnon',
					data: JSON.stringify({
						'id': $(this).attr("lightid"),
						'type': "light"
					}),
					dataType: 'json',
					beforeSend: function(request) {
						request.setRequestHeader("Authorization", "Bearer " + getLocalData());
						request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
					},
					success: function(data, status) {
						$(this).removeAttr("checked");
						//	$("#optionLoadings").html("222");
					},
					error: function(data, status, e) {}
				});
			}
			sleep(1000);
		}
	});
	plus.nativeUI.closeWaiting();
	alert("顺序开灯执行完成");
}
//顺序关灯
function turnOff() {
	var count = $('input[name="chkcu"]:checked').length;
	if (count == 0) {
		alert('请选择顺序关灯信息');
		return;
	}
	//plus.nativeUI.showWaiting();
	$('input[name="chkcu"]').each(function() {
		//if($(this).attr("status")=="离网") continue;
		// if ($(this).attr("checked") == "checked") {
		var flag = $(this).prop('checked');
		if (flag == true) {
			$(this).prop("checked", true);
			var gwName = $(this).attr("gwName");
			if (gwName != null && gwName != "") {
				$.ajax({
					type: 'post',
					url: api + '/turnoff',
					data: JSON.stringify({
						'id': $(this).attr("lightid"),
						'type': "light"
					}),
					dataType: 'json',
					async: true,
					beforeSend: function(request) {
						request.setRequestHeader("Authorization", "Bearer " + getLocalData());
						request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
					},
					success: function(data, status) {
						$(this).removeAttr("checked");

					},
					error: function(data, status, e) {

					}
				});
			}
			//sleep(1000);
		}


	});
	//plus.nativeUI.closeWaiting();
	alert("顺序关灯执行完成")

}
//单个开灯
function turnOnTwo() {
	//plus.nativeUI.showWaiting();
	var obj_lis = document.getElementById("lstCU").getElementsByTagName("li");
	for (i = 0; i < obj_lis.length; i++) {
		obj_lis[i].onclick = function() {
			console.log(this.innerText);
			console.log(this.innerText.substring(56,92));
			$.ajax({
				type: 'post',
				url: api + '/turnon',
				data: JSON.stringify({
					'id':this.innerText.substring(56,92),
					'type': "light"
				}),
				dataType: 'json',
				beforeSend: function(request) {
					request.setRequestHeader("Authorization", "Bearer " + getLocalData());
					request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				},
				success: function(data, status) {
				alert("单个开灯执行完成");
				},
				error: function(data, status, e) {}
			});
		}
	}
	//sleep(1000);
	//plus.nativeUI.closeWaiting();
	
}
//单个关灯
function turnOffTwo(){
	//plus.nativeUI.showWaiting();
	var obj_lis = document.getElementById("lstCU").getElementsByTagName("li");
	for (i = 0; i < obj_lis.length; i++) {
		obj_lis[i].onclick = function() {
			console.log(this.innerText);
			console.log(this.innerText.substring(56,92));
			$.ajax({
				type: 'post',
				url: api + '/turnoff',
				data: JSON.stringify({
					'id':this.innerText.substring(56,92),
					'type': "light"
				}),
				dataType: 'json',
				beforeSend: function(request) {
					request.setRequestHeader("Authorization", "Bearer " + getLocalData());
					request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				}, 
				success: function(data, status) {
					alert("单个关灯执行完成");
				},
				error: function(data, status, e) {}
			});
		}
	}
	//sleep(1000);
	//plus.nativeUI.closeWaiting();
	
}


function BindToggle() {
	$("#M_Toggle").bind("toggle", function(event) {
		//event.detail.isActive 可直接获取当前状态  
		if (event.detail.isActive) {
			$('input[name="chkcu"]').each(function() {
				var flag = $(this).prop('checked');
				if (typeof flag !== typeof undefined && flag !== true) {
					$(this).prop("checked", true);
				}
				// else if(flag==false){
				// 	$(this).prop("checked", true);
				// }
				// else{
				// $(this).prop("checked", true);
				// }
			});
		} else {
			$('input[name="chkcu"]').each(function() {
				var flag = $(this).prop('checked');
				if (typeof flag !== typeof undefined && flag !== false) {
					$(this).prop("checked", false);
				}
				// else{
				// 	$(this).prop("checked", false);
				// }

			});
		}
	})
}

function BindStatusToggle() {

	$("#M_Toggle_Status").bind("toggle", function(event) {
		//event.detail.isActive 可直接获取当前状态  
		if (event.detail.isActive) {
			var fillData = [];
			for (var i = 0; i < currentData.length; i++) {
				if (currentData[i].IsJoinNet == "入网") {
					fillData.push(currentData[i]);
				}
			}
		} else {
			var fillData = [];
			for (var i = 0; i < currentData.length; i++) {
				if (currentData[i].IsJoinNet == "离网") {
					fillData.push(currentData[i]);
				}
			}
		}
		BindJoinNetData(fillData);
	});
	$("#M_Toggle_Write").bind("toggle", function(event) {
		//event.detail.isActive 可直接获取当前状态  
		if (event.detail.isActive) {
			var fillData2 = [];
			for (var i = 0; i < currentMacID.length; i++) {
				if (currentMacID[i].WriteListStatus == "写入") {
					fillData2.push(currentMacID[i]);
				}
			}
		} else {
			var fillData2 = [];
			for (var i = 0; i < currentMacID.length; i++) {
				if (currentMacID[i].WriteListStatus == "未写入") {
					fillData2.push(currentMacID[i]);
				}
			}
		}
		BindJoinNetData2(fillData2);

	});
}

function BindJoinNetData(data) {
	$("#lstCU").empty();
	for (var i = 0; i < data.length; i++) {
		var zig = data[i].zigbeeid.substring(4, 20)
		if (data[i].IsJoinNet == "入网") {
			$("#lstCU").append("<li  class='mui-table-view-cell mui-collapse skincheck'>" +
				"<a class='hdata' href='#'>" +
				"<input onclick='checkRad(this)' name='chkcu' type='checkbox' checked='checked' value='" + data[i].zigbeeid +
				"' status='" + data[i].IsJoinNet + "' lightid='" + data[i].LightID + "' gwName='" + data[i].expectGatewayName +
				"'>&nbsp;" + zig +
				"&nbsp; &nbsp;状态:" + data[i].IsJoinNet +
				"</a>" +
				"<ul class='mui-table-view mui-table-view-chevron'>" +
				"<a class='mui-navigate-right' href='#'>" +
				"<li class='mui-table-view-cell'>" + "<a class='mui-navigate-right' href='#'>" +
				"设备名:" + zig + "  ZigbeeID:" + zig + "</a></li>" +
				"</a>" +
				"<li style='margin-left:30px; margin-bottom:5px;'><button name='checkitem' onclick='turnOnTwo()'>开灯</button><button onclick='turnOffTwo()'>关灯</button></li> </ul>" +
				"</li>"
			);
		} else {
			$("#lstCU").append("<li  class='mui-table-view-cell mui-collapse skincheck'>" +
				"<a class='clearnet' href='#'>" +
				"<input onclick='checkRad(this)' name='chkcu' type='checkbox' checked='checked' value='" + data[i].zigbeeid +
				"' status='" + data[i].IsJoinNet + "' lightid='" + data[i].LightID + "' gwName='" + data[i].expectGatewayName +
				"'>&nbsp;" + zig +
				"&nbsp; &nbsp;状态:" + data[i].IsJoinNet +
				"</a>" + "<ul class='mui-table-view mui-table-view-chevron'>" +
				//"<a class='mui-navigate-right' href='#'>" +
				"<li class='mui-table-view-cell'>" + "<a class='mui-navigate-right' href='#'>" +
				"设备名:" + zig + "  ZigbeeID:" + zig + "</a></li>"
				//"</a>"+
				// "<li style='margin-left:30px; margin-bottom:5px;'><button name='checkitem' onclick='turnOn()'>开灯</button><button onclick='turnOff()'>关灯</button></li> </ul>"+
				// "</li>"
			);
		}

	}
}

function BindJoinNetData2(data) {
	$("#lstCUwrite").empty();
	for (var i = 0; i < data.length; i++) {
		var zig = data[i].zigbeeid.substring(4, 20)
		if (data[i].WriteListStatus == "写入") {
			$("#lstCUwrite").append("<li  class='mui-table-view-cell mui-collapse skincheck'>" +
				"<a class='hdata' href='#'>" +
				"<input onclick='checkRad(this)' name='chkcu' type='checkbox' checked='checked' value='" + data[i].zigbeeid +
				"' status='" + data[i].IsJoinNet + "' lightid='" + data[i].LightID + "' gwName='" + data[i].expectGatewayName +
				"'>&nbsp;" + zig +
				"&nbsp; &nbsp;状态:" + data[i].WriteListStatus +
				"</a>" +
				"<ul class='mui-table-view mui-table-view-chevron'>" +
				"<a class='mui-navigate-right' href='#'>" +
				"<li class='mui-table-view-cell'>" + "<a class='mui-navigate-right' href='#'>" +
				"设备名:" + zig + "  ZigbeeID:" + zig + "</a></li>" +
				"</a>"
				// +
				// "<li style='margin-left:30px; margin-bottom:5px;'><button name='checkitem' onclick='turnOn()'>开灯</button><button onclick='turnOff()'>关灯</button></li> </ul>"+
				// "</li>"
			);
		} else {
			$("#lstCUwrite").append("<li  class='mui-table-view-cell mui-collapse skincheck'>" +
				"<a class='clearnet' href='#'>" +
				"<input onclick='checkRad(this)' name='chkcu' type='checkbox' checked='checked' value='" + data[i].zigbeeid +
				"' status='" + data[i].IsJoinNet + "' lightid='" + data[i].LightID + "' gwName='" + data[i].expectGatewayName +
				"'>&nbsp;" + zig +
				"&nbsp; &nbsp;状态:" + data[i].WriteListStatus +
				"</a>" + "<ul class='mui-table-view mui-table-view-chevron'>" +
				//"<a class='mui-navigate-right' href='#'>" +
				"<li class='mui-table-view-cell'>" + "<a class='mui-navigate-right' href='#'>" +
				"设备名:" + zig + "  ZigbeeID:" + zig + "</a></li>"
				//"</a>"+
				// "<li style='margin-left:30px; margin-bottom:5px;'><button name='checkitem' onclick='turnOn()'>开灯</button><button onclick='turnOff()'>关灯</button></li> </ul>"+
				// "</li>"
			);
		}

	}
}
//确认网关编号
function setNetwork(){
	var gatewayID = document.getElementById('gwValue').value;
	if (gatewayID== null || gatewayID == "") {
		alert('请输入网关编号');
		return;
	}
	var libselect = document.getElementById("gwID");//获取下拉框ID
	var index=libselect.selectedIndex;        //拿到选中项(option)的索引(index)
	var selectvalue=libselect.options[index].value;             //拿到选中项options的value
	if (selectvalue == null || selectvalue == "") {
		alert("请选择网关信息")
	}
	var GlobgatewayId = window.localStorage.getItem('GlobgatewayId');
	if (GlobgatewayId== null || GlobgatewayId == "") {
		alert('请选择扫描的网关信息');
		return;
	}
	console.log(gatewayID)
	$.ajax({
		type: "POST",
		url: api + '/setgatewaybygatewayid',
		data: JSON.stringify({
			'value':gatewayID,
			'gatewayId': selectvalue
		}),
		beforeSend: function(request) {
			request.setRequestHeader("Authorization", "Bearer " + getLocalData());
			request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		},
		success: function(data) {
			if (data.success == true) {
				alert(data.message)
				window.localStorage.setItem("GlobgatewayName",gatewayID);
				var optio = '';
				optio = optio + "<option value='" + selectvalue + "'>" + gatewayID + "</option>";
				$('#gwID').html(optio);
				
			} else {
				alert(data.message)
			}
	
		},
		error: function(data, status, e) {
			alert("发送指令发送失败")
		}
	});
	}
//清空网关
function emptyNetwork() {
	//var gatewayID = $("#gwID").attr("value");
	var libselect = document.getElementById("gwID");//获取下拉框ID
	var index=libselect.selectedIndex;        //拿到选中项(option)的索引(index)
	var selectvalue=libselect.options[index].value;             //拿到选中项options的value
	if (selectvalue == null || selectvalue == "") {
		alert("请选择网关信息")
	}
	var GlobgatewayId = window.localStorage.getItem('GlobgatewayId');
	if (GlobgatewayId== null || GlobgatewayId == "") {
		alert('请选择扫描的网关信息');
		return;
	}
	console.log("selectvalue:"+selectvalue)
	$.ajax({
		type: "POST",
		url: api + '/initgateway',
		data: JSON.stringify({
			'gatewayId': selectvalue
		}),
		beforeSend: function(request) {
			request.setRequestHeader("Authorization", "Bearer " + getLocalData());
			request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		},
		success: function(data) {
			if (data.success == true) {
				alert('指令发送成功')
			} else {
				alert(data.message)
			}

		},
		error: function(data, status, e) {
			alert("发送指令发送失败")
		}
	});
}
//下发MacID
function issueMacID() {
	//var gatewayID = $("#gwID").attr("value");
	var libselect = document.getElementById("gwID");//获取下拉框ID
	var index=libselect.selectedIndex;        //拿到选中项(option)的索引(index)
	var selectvalue=libselect.options[index].value;             //拿到选中项options的value
	if (selectvalue == null || selectvalue == "") {
		alert("请选择网关信息")
	}
	$.ajax({
		type: "POST",
		url: api + '/writewhitelist',
		beforeSend: function(request) {
			request.setRequestHeader("Authorization", "Bearer " + getLocalData());
			request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		},
		data: JSON.stringify({
			'gatewayId': selectvalue,
			'type': 'whiteList'
		}),
		success: function(data) {
			if (data.success == true) {
				alert('指令发送成功')
			} else {
				alert(data.message)
			}
			queryJoin();

		},
		error: function(data, status, e) {
			alert("发送指令发送失败")
		}
	});
}

//白名单入网
function joinMACToGW() {
	queryJoin();
	var libselect = document.getElementById("gwID");//获取下拉框ID
	var index=libselect.selectedIndex;        //拿到选中项(option)的索引(index)
	var selectvalue=libselect.options[index].value;             //拿到选中项options的value
	if (selectvalue == null || selectvalue == "") {
		alert("请选择网关信息")
	}
	$.ajax({
		type: "POST",
		url: api + '/whitelistjoinnet',
		beforeSend: function(request) {
			request.setRequestHeader("Authorization", "Bearer " + getLocalData());
			request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		},
		data: JSON.stringify({
			'gatewayId': selectvalue,
			'type': 'whiteList'
		}),
		success: function(data) {
			var minute = numbermin * 15
			if (data.success == true) {
				alert('指令发送成功，需等待' + minute + '秒')

			} else {
				alert(data.message)
			}
		},
		error: function(data, status, e) {
			alert("发送指令发送失败")
		}
	});
}
//补写白名单
function joinRetry(){
	//queryJoin();
	var libselect = document.getElementById("gwID");//获取下拉框ID
	var index=libselect.selectedIndex;        //拿到选中项(option)的索引(index)
	var selectvalue=libselect.options[index].value;             //拿到选中项options的value
	if (selectvalue == null || selectvalue == "") {
		alert("请选择网关信息")
	}
	if (arrRetry.length == 0) {
		alert('请选择离网补写灯的信息');
		return;
	}
	// if (arrjoin.length != 0) {
	// 	alert('已是入网状态，请选择离网状态灯的信息');
	// 	return;
	// }
	
	console.log("arrRetry",arrRetry)
	$.ajax({
		type: "POST",
		url: api + '/writewhitelist',
		beforeSend: function(request) {
			request.setRequestHeader("Authorization", "Bearer " + getLocalData());
			request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		},
		data: JSON.stringify({
			'gatewayId': selectvalue,
			'lightIds': arrRetry,
			'type': 'retrywhiteList'
		}),
		success: function(data) {
			//var minute = numbermin * 15
			if (data.success == true) {
				//alert('指令发送成功，需等待' + minute + '秒',)
				alert("指令发送成功，需再次点击白名单入网按钮")
	
			} else {
				alert(data.message)
			}
		},
		error: function(data, status, e) {
			alert("发送指令发送失败")
		}
	});
}


function emptyGWDBData() {
	var libselect = document.getElementById("gwID");//获取下拉框ID
	var index=libselect.selectedIndex;        //拿到选中项(option)的索引(index)
	var selectvalue=libselect.options[index].value;             //拿到选中项options的value
	if (selectvalue == null || selectvalue == "") {
		alert("请选择网关信息")
	}
	$.ajax({
		type: "POST",
		url: api + '/emptydbbygw',
		beforeSend: function(request) {
			request.setRequestHeader("Authorization", "Bearer " + getLocalData());
			request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		},
		data: JSON.stringify({
			'gatewayId': selectvalue
		}),
		success: function(data) {
			if (data.success == true) {
				alert('指令发送成功')
			} else {
				alert(data.message)
			}
		},
		error: function(data, status, e) {
			alert("发送指令发送失败")
		}
	});
}

//基础数据加载
function GetGW() {
	$.ajax({
		type: "GET",
		url: api + '/getallgateways',
		contentType: "application/x-www-form-urlencoded; charset=gbk",
		header: {
			'Authorization': 'Bearer ' + getLocalData(),
		},
		success: function(data) {
			var optio = '';
			for (var i = 0; i < data.length; i++) {
			//	 if (data[i].gatewayName == "办公室测试"||data[i].gatewayName == "入网网关") {
					//if (data[i].gatewayName == "入网网关") {
					optio = optio + "<option value='" + data[i].gatewayId + "'>" + data[i].gatewayName + "</option>";
					$('#gwID').html(optio);
			//	}
			}
		}
	});
}
//获取数据token
function GetToken() {
	$.ajax({
		type: "post", 
		
		url: api + '/login',
		// data: JSON.stringify({
		// 	"password": "123456",
		// 	"roleId": "b206b30f-cdf5-4a42-960d-9c9b29cfcab2",
		// 	"userName": "LontriAdmin"
		// }),
		data: JSON.stringify({
			"password": "kayla",
			"roleId": "b206b30f-cdf5-4a42-960d-9c9b29cfcab2",
			"userName": "kayla"
		}),
		beforeSend: function(request) {
			request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		},
		success: function(data, status) {
			setLocalData(data.token);
		},
		error: function(data, status, e) {}
	});
}

function setLocalData(token) {
	var storage = window.localStorage;
	storage["token"] = token;
}

function getLocalData() {
	var storage = window.localStorage;
	var token = storage["token"];
	return token
}

//var flag=false;
function sleep(time) {
	var startTime = new Date().getTime() + parseInt(time, 10);
	while (new Date().getTime() < startTime) {
	}
}
