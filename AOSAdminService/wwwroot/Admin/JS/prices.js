var addPriceB, filterB, resetB, code, nameG, priceTable, addEditForm, addEditDialog, delPriceB;

window.onload = function ()
{
	priceTable = document.getElementById("priceTable");
	addEditDialog = document.getElementById("addEditDialog");
	addPriceB = document.getElementById("addPriceB");
	delPriceB = document.getElementById("delPriceB");
	addEditForm = document.getElementById("addEditForm");
	saveB = addEditForm.elements["saveB"];
	filterB = document.getElementById("filterB");
	resetB = document.getElementById("resetB"); 
	code = document.getElementById("code");
	nameG = document.getElementById("nameG");

	GetList();

	filterB.onclick = function ()
	{
		var data = 'good_id=' + code.value + '&name=' + nameG.value;
		var result = sendRequest('GET', '/admin/pricesfilter?', data);

		if (result.status === 200) {
			clearTable();
			var prices = JSON.parse(result.responseText);

			prices.forEach(function (price, i, prices) {
				var row = document.getElementById("priceTable").insertRow(-1);
				row.insertCell(0).innerHTML = price.id;
				row.insertCell(1).innerHTML = price.good_id;
				row.insertCell(2).innerHTML = price.name;
				row.insertCell(3).innerHTML = price.value;
				row.insertCell(4).innerHTML = price.old_value;
				row.insertCell(5).innerHTML = '<input type="button" onclick="Delete(this)" value="del">';
			});
		}
	};

	resetB.onclick = function ()
	{
		clearTable();
		GetList();
	};

	addPriceB.onclick = function ()
	{
		addEditDialog.showModal();
		addEditForm.elements["typeTB"].value = 'add';
	};

	delPriceB.onclick = function ()
	{
		addEditDialog.showModal();
		addEditForm.elements["typeTB"].value = 'del';
	};

	function clearTable() {
		var tableRows = priceTable.getElementsByTagName('tr');
		var rowCount = tableRows.length;

		for (var x = rowCount - 1; x > 0; x--) {
			priceTable.deleteRow(x);
		}
	};
}

function Delete(e)
{
	var row = e.parentElement.parentElement;

	var result = sendRequest('GET', '/admin/deleteprice?id=', row.cells[0].textContent);
	if (result.status === 200) {
		priceTable.deleteRow(row.rowIndex);
		alert("Данные о цене удалены!");
	}
}

async function GetList()
{
	var result = sendRequest('GET', '/admin/prices', '');

	if (result.status === 200) 
	{
		var prices = JSON.parse(result.responseText);
		
		prices.forEach(function(price, i, prices) {			
			var row = document.getElementById("priceTable").insertRow(-1);
			row.insertCell(0).innerHTML = price.id;
			row.insertCell(1).innerHTML = price.good_id;
			row.insertCell(2).innerHTML = price.name;
			row.insertCell(3).innerHTML = price.value;
			row.insertCell(4).innerHTML = price.old_value;
			row.insertCell(5).innerHTML = '<input type="button" onclick="Delete(this)" value="del">';
		});
	}
};

function sendRequest(method, path, data)
{
	try {
		var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
		var xhr = new XHR();
		xhr.open(method, path + data, false);
		xhr.send();


		if (xhr.status === 200) {
			return xhr;
		}
		else {
			alert("Error: ", xhr.status + " " + xhr.statusText);
		}
	}
	catch (err) {
		alert(err.message);
	}
};
