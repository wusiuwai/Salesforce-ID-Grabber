// Set up context menu at install time.
(function() {
	var salesforceId;
	chrome.runtime.onInstalled.addListener(function() {
	  var context = "selection";
	  var title = "Copy Salesforce ID";
	  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
	                                         "id": "context" + context});  
	});

	// add click event
	chrome.contextMenus.onClicked.addListener(onClickHandler);

	document.addEventListener('copy', function (e) {
		// only copy to clipboard when the id is captured and the length is 15
		if (salesforceId && salesforceId.length == 15) {
		    e.preventDefault();
		    if (e.clipboardData) {
		        e.clipboardData.setData('text/plain', salesforceId);
		    } else if (window.clipboardData) {
		        window.clipboardData.setData('Text', salesforceId);
		    }
		}
	});
	
	// The onClicked callback function.
	function onClickHandler(info, tab) {
	  var linkUrl = info.linkUrl;
	  if (linkUrl && linkUrl.length > 0) {
	  	  	if (linkUrl.lastIndexOf('/') > -1) {
	  	  		if (linkUrl.lastIndexOf('?') > -1) {
					salesforceId = linkUrl.substring(linkUrl.lastIndexOf('/') + 1, linkUrl.lastIndexOf('?'));
				} else {
					salesforceId = linkUrl.substring(linkUrl.lastIndexOf('/') + 1);
				}
				document.execCommand('copy');
			}
		}
	};
})();