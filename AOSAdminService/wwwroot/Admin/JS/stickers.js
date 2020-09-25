var deleteLinkB, stickerTable, addEditDialog, addLinkDialog, delLinkDialog, addStickerB, addEditForm, delLinkForm, addLinkForm, old_id, edit_row;

window.onload=function()
{
	stickerTable = document.getElementById("stickerTable");
	addEditDialog = document.getElementById("addEditDialog");
	addEditForm = document.getElementById("addEditForm");
	addLinkDialog = document.getElementById("addLinkDialog");
	addLinkForm = document.getElementById("addLinkForm");
	delLinkDialog = document.getElementById("delLinkDialog");
	delLinkForm = document.getElementById("delLinkForm");
	addStickerB = document.getElementById("addStickerB");
	deleteLinkB = document.getElementById("deleteLinkB");
	saveB = addEditForm.elements["saveB"];
	delLinkB = delLinkForm.elements["delLinkB"];
	radio = document.getElementById("addRB");
	//saveLinkB = addLinkDialog.elements["saveLinkB"];
	GetList();

	delLinkB.onclick = function () {
		var data = 'goods_id=' + delLinkForm.elements["goodsCodesTB"].value.replace("\n", ",");
		var result = sendRequest('GET', '/admin/deletegoodsticker?', data);
		if (result.status === 200) {
			alert("Связи по товарам удалены!");
		}
		delLinkDialog.close();
	};

	saveB.onclick = function () {
		var data = 'id=' + addEditForm.elements["idTB"].value + '&name=' + addEditForm.elements["nameTB"].value + '&bg=' + addEditForm.elements["bgColorTB"].value.replace('#', '') + '&font=' + addEditForm.elements["fontColorTB"].value.replace('#', '');
		if (addEditForm.elements["typeTB"].value === "add")
			var result = sendRequest('GET', '/admin/addsticker?', data);
		else
			var result = sendRequest('GET', '/admin/editsticker?', data + '&old_id=' + old_id);
		if (result.status === 200) {
			if (addEditForm.elements["typeTB"].value === "add") {
				var row = stickerTable.insertRow(-1);
				row.insertCell(0).innerHTML = addEditForm.elements["idTB"].value;
				row.insertCell(1).innerHTML = addEditForm.elements["nameTB"].value;
				row.insertCell(2).innerHTML = addEditForm.elements["bgColorTB"].value;
				row.insertCell(3).innerHTML = addEditForm.elements["fontColorTB"].value;
				row.insertCell(4).innerHTML = '<input type="button" onclick="Edit(this)" value="edit">';
				row.insertCell(5).innerHTML = '<input type="button" onclick="Delete(this)" value="del">';
				row.insertCell(6).innerHTML = '<input type="button" onclick="Add(this)" value="add">';
				alert("Стикер добавлен!");
			}
			else {
				edit_row.cells[0].innerHTML = addEditForm.elements["idTB"].value;
				edit_row.cells[1].innerHTML = addEditForm.elements["nameTB"].value;
				edit_row.cells[2].innerHTML = addEditForm.elements["bgColorTB"].value;
				edit_row.cells[3].innerHTML = addEditForm.elements["fontColorTB"].value;
				alert("Стикер обновлён!");
			}
		}
		addEditDialog.close();
	};

	saveLinkB.onclick = function () {
		var data = 'goods_id=' + addLinkForm.elements["goodsCodesTB"].value.replace("\n",",") + '&sticker_id=' + addLinkForm.elements["idTB"].value;
		if (radio.checked)
			var result = sendRequest('GET', '/admin/addgoodsticker?', data);
		else
			var result = sendRequest('GET', '/admin/replacegoodsticker?', data);
		if (result.status === 200) {
			if (radio.checked) {
				alert("Стикер добавлен к товарам!");
			}
			else {
				alert("Стикер заменён у товаров!");
			}
		}
		addLinkDialog.close();
	};
	
	addStickerB.onclick = function() 
	{		
		addEditDialog.showModal();
		addEditForm.elements["typeTB"].value = 'add';
	};

	deleteLinkB.onclick = function () {
		delLinkDialog.showModal();
	};
}

function Delete(e){
	var row = e.parentElement.parentElement;
	var result = sendRequest('GET', '/admin/deletesticker?id=', row.cells[0].textContent);
	if (result.status === 200) 
	{
		stickerTable.deleteRow(row.rowIndex);
		alert("Стикер удалён!");
	}
}

function Edit(e){
	var row = e.parentElement.parentElement;

	edit_row = row;
	old_id = row.cells[0].textContent;
	addEditForm.elements["idTB"].value = row.cells[0].textContent;
	addEditForm.elements["nameTB"].value = row.cells[1].textContent;
	addEditForm.elements["bgColorTB"].value = row.cells[2].textContent;
	addEditForm.elements["fontColorTB"].value = row.cells[3].textContent;
	addEditForm.elements["typeTB"].value = 'edit';
	addEditDialog.showModal();
}

function Add(e){
	var row = e.parentElement.parentElement;

	edit_row = row;
	old_id = row.cells[0].textContent;
	addLinkForm.elements["idTB"].value = row.cells[0].textContent;
	addLinkForm.elements["nameTB"].value = row.cells[1].textContent;
	addLinkForm.elements["bgColorTB"].value = row.cells[2].textContent;
	addLinkForm.elements["fontColorTB"].value = row.cells[3].textContent;
	addLinkDialog.showModal();
}

async function GetList()
{	
	try{
		var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

		var xhr = new XHR();

		// (2) запрос на другой домен :)
		xhr.open('GET', '/admin/stickers', false);

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
			var stickers = JSON.parse(xhr.responseText);
			
			stickers.forEach(function(sticker, i, stickers) {			
				var row = stickerTable.insertRow(-1);
				row.insertCell(0).innerHTML = sticker.id;
				row.insertCell(1).innerHTML = sticker.name;
				row.insertCell(2).innerHTML = sticker.background_color;
				row.insertCell(3).innerHTML = sticker.font_color;
				row.insertCell(4).innerHTML = '<input type="button" onclick="Edit(this)" value="edit">';
				row.insertCell(5).innerHTML = '<input type="button" onclick="Delete(this)" value="del">';
				row.insertCell(6).innerHTML = '<input type="button" onclick="Add(this)" value="add">';
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

function addRow()
{

};
