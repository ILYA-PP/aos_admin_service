var addCouponB, id, code, groupNumber, filterB, resetB, couponsTable, addEditForm, addEditDialog, edit_row, old_id;

window.onload = function ()
{
	couponsTable = document.getElementById("couponsTable");
	addEditDialog = document.getElementById("addEditDialog");
	addCouponB = document.getElementById("addCouponB");
	addEditForm = document.getElementById("addEditForm");
	saveB = addEditForm.elements["saveB"];
	filterB = document.getElementById("filterB");
	resetB = document.getElementById("resetB");
	id = document.getElementById("id");
	code = document.getElementById("code");
	groupNumber = document.getElementById("groupNumber");

	GetList();

	saveB.onclick = function () {
		var data = 'code=' + addEditForm.elements["codeTB"].value + '&dateStart=' + addEditForm.elements["dateStartTB"].value + '&dateEnd=' + addEditForm.elements["dateEndTB"].value.replace('#', '') + '&discountPercent=' + addEditForm.elements["discountPercentTB"].value + '&orderSum=' + addEditForm.elements["orderSumTB"].value + '&count=' + addEditForm.elements["countTB"].value + '&maxDiscountSum=' + addEditForm.elements["maxDiscountSumTB"].value + '&isFirst=' + addEditForm.elements["isFirstTB"].value + '&grounNumber=' + addEditForm.elements["grounNumberTB"].value + '&isAll=' + addEditForm.elements["isAllTB"].value;
		if (addEditForm.elements["typeTB"].value === "add")
			var result = sendRequest('GET', '/admin/addpromocode?', data);
		else
			var result = sendRequest('GET', '/admin/editpromocode?', data + '&old_id=' + old_id);
		if (result.status === 200) {
			if (addEditForm.elements["typeTB"].value === "add") {
				var row = couponsTable.insertRow(-1);
				row.insertCell(0).innerHTML = '';
				row.insertCell(1).innerHTML = addEditForm.elements["codeTB"].value;
				row.insertCell(2).innerHTML = addEditForm.elements["dateStartTB"].value;
				row.insertCell(3).innerHTML = addEditForm.elements["dateEndTB"].value;
				row.insertCell(4).innerHTML = addEditForm.elements["discountPercentTB"].value;
				row.insertCell(5).innerHTML = addEditForm.elements["orderSumTB"].value;
				row.insertCell(6).innerHTML = addEditForm.elements["countTB"].value;
				row.insertCell(7).innerHTML = addEditForm.elements["maxDiscountSumTB"].value;
				row.insertCell(8).innerHTML = addEditForm.elements["isFirstTB"].value;
				row.insertCell(9).innerHTML = addEditForm.elements["grounNumberTB"].value;
				row.insertCell(10).innerHTML = addEditForm.elements["isAllTB"].value;
				row.insertCell(11).innerHTML = '<input type="button" onclick="Edit(this)" value="edit">';
				row.insertCell(12).innerHTML = '<input type="button" onclick="Delete(this)" value="del">';
				alert("Купон добавлен!");
			}
			else {
				edit_row.cells[1].innerHTML = addEditForm.elements["codeTB"].value;
				edit_row.cells[2].innerHTML = addEditForm.elements["dateStartTB"].value;
				edit_row.cells[3].innerHTML = addEditForm.elements["dateEndTB"].value;
				edit_row.cells[4].innerHTML = addEditForm.elements["discountPercentTB"].value;
				edit_row.cells[5].innerHTML = addEditForm.elements["orderSumTB"].value;
				edit_row.cells[6].innerHTML = addEditForm.elements["countTB"].value;
				edit_row.cells[7].innerHTML = addEditForm.elements["maxDiscountSumTB"].value;
				edit_row.cells[8].innerHTML = addEditForm.elements["isFirstTB"].value;
				edit_row.cells[9].innerHTML = addEditForm.elements["grounNumberTB"].value;
				edit_row.cells[10].innerHTML = addEditForm.elements["isAllTB"].value;
				alert("Купон обновлён!");
			}
		}
		addEditDialog.close();
	};

	addCouponB.onclick = function () {
		addEditDialog.showModal();
		addEditForm.elements["typeTB"].value = 'add';
	};

	filterB.onclick = function () {
		var data = 'id=' + id.value + '&code=' + code.value + '&groupNumber=' + groupNumber.value;
		var result = sendRequest('GET', '/admin/promocodefilter?', data);

		if (result.status === 200) {
			clearTable();
			var coupons = JSON.parse(result.responseText);

			coupons.forEach(function (coupon, i, coupons) {
				var row = document.getElementById("couponsTable").insertRow(-1);
				row.insertCell(0).innerHTML = coupon.id;
				row.insertCell(1).innerHTML = coupon.value;
				row.insertCell(2).innerHTML = coupon.date_start;
				row.insertCell(3).innerHTML = coupon.date_end;
				row.insertCell(4).innerHTML = coupon.discount_percent;
				row.insertCell(5).innerHTML = coupon.order_sum;
				row.insertCell(6).innerHTML = coupon.person_count;
				row.insertCell(7).innerHTML = coupon.discount_max;
				row.insertCell(8).innerHTML = coupon.is_order_first;
				row.insertCell(9).innerHTML = coupon.group_id;
				row.insertCell(10).innerHTML = coupon.is_all_goods;
				row.insertCell(11).innerHTML = '<input type="button" onclick="Edit(this)" value="edit">';
				row.insertCell(12).innerHTML = '<input type="button" onclick="Delete(this)" value="del">';
			});
		}
	};

	resetB.onclick = function () {
		clearTable();
		GetList();
	};

	function clearTable() {
		var tableRows = couponsTable.getElementsByTagName('tr');
		var rowCount = tableRows.length;

		for (var x = rowCount - 1; x > 0; x--) {
			couponsTable.deleteRow(x);
		}
	};
}

function Delete(e) {
	var row = e.parentElement.parentElement;
	var result = sendRequest('GET', '/admin/deletepromocode?id=', row.cells[0].textContent);
	if (result.status === 200) {
		couponsTable.deleteRow(row.rowIndex);
		alert("Купон удалён!");
	}
}

function Edit(e) {
	var row = e.parentElement.parentElement;

	edit_row = row;
	old_id = row.cells[0].textContent;

	addEditForm.elements["codeTB"].value = row.cells[1].textContent;
	addEditForm.elements["dateStartTB"].value = row.cells[2].textContent;
	addEditForm.elements["dateEndTB"].value = row.cells[3].textContent;
	addEditForm.elements["discountPercentTB"].value = row.cells[4].textContent;
	addEditForm.elements["orderSumTB"].value = row.cells[5].textContent;
	addEditForm.elements["countTB"].value = row.cells[6].textContent;
	addEditForm.elements["maxDiscountSumTB"].value = row.cells[7].textContent;
	addEditForm.elements["isFirstTB"].value = row.cells[8].textContent;
	addEditForm.elements["grounNumberTB"].value = row.cells[9].textContent;
	addEditForm.elements["isAllTB"].value = row.cells[10].textContent;

	addEditForm.elements["typeTB"].value = 'edit';
	addEditDialog.showModal();
}

async function GetList()
{
	var result = sendRequest('GET', '/admin/promocodes', '');
	// если запрос прошел нормально
	if (result.status === 200) 
	{
		// получаем данные 
		var coupons = JSON.parse(result.responseText);
			
		coupons.forEach(function(coupon, i, coupons) {			
			var row = document.getElementById("couponsTable").insertRow(-1);
			row.insertCell(0).innerHTML = coupon.id;
			row.insertCell(1).innerHTML = coupon.value;
			row.insertCell(2).innerHTML = coupon.date_start;
			row.insertCell(3).innerHTML = coupon.date_end;
			row.insertCell(4).innerHTML = coupon.discount_percent;
			row.insertCell(5).innerHTML = coupon.order_sum;
			row.insertCell(6).innerHTML = coupon.person_count;
			row.insertCell(7).innerHTML = coupon.discount_max;
			row.insertCell(8).innerHTML = coupon.is_order_first;
			row.insertCell(9).innerHTML = coupon.group_id;
			row.insertCell(10).innerHTML = coupon.is_all_goods;
			row.insertCell(11).innerHTML = '<input type="button" onclick="Edit(this)" value="edit">';
			row.insertCell(12).innerHTML = '<input type="button" onclick="Delete(this)" value="del">';
		});
	}
};

function sendRequest(method, path, data) {
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
