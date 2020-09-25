var discountTable;

window.onload=function()
{
	discountTable = document.getElementById("discountTable");
	GetList();
}

function Delete(e){
	var row = e.parentElement.parentElement;
	discountTable.deleteRow(row.rowIndex)
}

function Edit(e){
	var row = e.parentElement.parentElement;
	alert(row.cells[3].textContent);
}

async function GetList()
{	
	try{
		var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

		var xhr = new XHR();

		// (2) запрос на другой домен :)
		xhr.open('GET', 'https://localhost:44374/marketing/promoactions', false);

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
			var discounts = JSON.parse(xhr.responseText);
			
			discounts.forEach(function(discount, i, discounts) {			
				var row = discountTable.insertRow(-1);
				row.insertCell(0).innerHTML = discount.id;
				row.insertCell(1).innerHTML = discount.banner;
				row.insertCell(2).innerHTML = discount.modify;
				row.insertCell(3).innerHTML = discount.title;
				row.insertCell(4).innerHTML = discount.date_start + ' - ' + discount.date_end;
				row.insertCell(5).innerHTML = discount.city
				row.insertCell(6).innerHTML = discount.state;
				row.insertCell(7).innerHTML = '<input type="button" onclick="Edit(this)" value="edit">';
				row.insertCell(8).innerHTML = '<input type="button" onclick="Delete(this)" value="del">';
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