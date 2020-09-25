window.onload=function()
{
	GetList();
}

async function GetList()
{	
	try{
		var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

		var xhr = new XHR();

		// (2) запрос на другой домен :)
		xhr.open('GET', '/admin/goodsnoimage', false);

		xhr.onload = function() {
			let data = this.responseText;
		}

		xhr.onerror = function() {
			alert( 'Ошибка ' + this.status );
		}

		xhr.send();
		
		// если запрос прошел нормально
		if (xhr.status === 200) 
		{
			// получаем данные 
			var goods = JSON.parse(xhr.responseText);
			
			goods.forEach(function(good, i, goods) {			
				var row = document.getElementById("goodsTable").insertRow(-1);
				row.insertCell(0).innerHTML = '<a href="/admin/goods">' + good.id + '</a>';
				row.insertCell(1).innerHTML = '<a href="/admin/goods">' + good.name + '</a>';
			});
		}
		else 
		{
			// если произошла ошибка, из errorText получаем текст ошибки
			console.log("Error: ", xhr.status, xhr.statusText);
		}
	}
	catch(err){
		alert(err.message);
	}
};