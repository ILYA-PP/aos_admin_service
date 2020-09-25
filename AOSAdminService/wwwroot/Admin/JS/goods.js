var uri, searchB, good_id, saveB, imageEl;

window.onload=function()
{
	good_id = document.getElementById("good_id");
	searchB = document.getElementById("searchB");
	saveB = document.getElementById("saveB"); 
	imageEl = document.getElementById("imageEl");
	
	searchB.onclick = function() 
	{		
		getData(good_id.value);	
	};

	function getData(id) {
		var result = sendRequest('GET', '/admin/goods?id=', id);

		if (result.status === 200) {
			var good = JSON.parse(result.responseText);
			document.getElementById("idTB").value = good.id;
			document.getElementById("nameTB").value = good.name;
			document.getElementById("vidalTB").value = '';
			document.getElementById("markGroupTB").value = good.markGroup;
			document.getElementById("descriptionTB").value = good.description;
		}
	};

	saveB.onclick = function () {
		var data = 'id=' + document.getElementById("idTB").value + '&desc=' + document.getElementById("descriptionTB").value;
		var result = sendRequest('GET', '/admin/editgood?', data);

		var files = imageEl.files;
		files.forEach(function (file, i, files) {
			file.Move("");
		});

		if (result.status === 200) {
			alert('Данные сохранены!');
		}
	};
	
} 

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
