define(function(){
	return () => {
		let param=location.search;//获取地址栏参数
		if(!param){//判断有没有地址栏参数
			return;
	}
	param=param.slice(1);//去掉问号
return JSON.parse('{"'+param.replace(/=/g,'":"').replace(/&/g,'","')+'"}')	
	}
	})
	