document.getElementById("btn_get_dom").addEventListener("click", () => {
	function get_dom() {
		return document.documentElement.outerHTML;
	}


	chrome.tabs.query({active: true, currentWindow: true}, ([tab]) => {
		full_dom = chrome.scripting.executeScript({
			target: {tabId: tab.id},
			func: get_dom 
		}).then((full_dom) => {
				let key = "RIE_" + tab.url;
				let value = full_dom[0].result;
				let obj = {};
				obj[key] = value;
				chrome.storage.local.set(obj);
			}
		);
	});
});


document.getElementById("btn_set_dom").addEventListener("click", () => {
	function set_dom(new_dom) {
		var new_HTML = document.open("text/html", "replace");
		new_HTML.write(new_dom);
		new_HTML.close();
	}

	chrome.tabs.query({active: true, currentWindow: true}, ([tab]) => {
		let key = "RIE_" + tab.url;

		chrome.storage.local.get(key).then((result) => {
			console.log(result);
			chrome.scripting.executeScript({
				target: {tabId: tab.id},
				func: set_dom(result[key])
			});
		});
	});
});
