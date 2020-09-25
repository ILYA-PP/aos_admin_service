var tokenKey, signInB;

window.onload=function()
{
	tokenKey = "accessToken";
	signInB = document.getElementById("signInB");
	// отпавка запроса к контроллеру AccountController для получения токена
	signInB.onclick = function() 
	{		
		getToken();	
	};
	
	async function getToken()
	{
		// получаем данные формы и фомируем объект для отправки
		const formData = new FormData();
		formData.append("grant_type", "password");
		formData.append("login", document.getElementById("loginTB").value);
		formData.append("password", document.getElementById("passwordTB").value);
		// отправляет запрос и получаем ответ
		const response = await fetch("http://localhost:62587/auth/confirm", {
			mode: "no-cors",
			method: "POST",
			headers: {"Accept": "application/json"},
			body: formData
		});
		// получаем данные 
		const data = await response.json();
	};
}