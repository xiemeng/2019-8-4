/*
*	@desc 网络请求封装
* 	@params {object} - 发送请求用的参数
*	@retrun {Promise} 请求的promise任务
*
*/ 
export const request = params =>{
	const requestParams = {
		...params,
		method:(params.method && params.method.toUpperCase()) || "GET"
	};
	return fetch(
		requestParams.url,
		requestParams
	).then(res=>res.json())
}