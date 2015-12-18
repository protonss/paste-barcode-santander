function convertCodeBarToArray(barCode) {

  if (barCode) {

    var barCodeArray = barCode.split(/[\s.]+/)

    return barCodeArray;

  }

}

function getCurrentTab(callback) {

  var query = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(query, callback);

}

function pasteBarCodeSite() {

  var txtBarCode = document.getElementById('txtBarCode');

  if (txtBarCode && txtBarCode.value) {
    var barCodeArray = JSON.stringify(convertCodeBarToArray(txtBarCode.value));
    var dataSend = {
      actionType: "updateBarCode",
      barCodeArray: barCodeArray
    };

    getCurrentTab(function(tabs) {

      chrome.tabs.sendMessage(tabs[0].id, dataSend, function() {});

    })

  }

}

window.addEventListener('load', function() {
  document.getElementById('btnPaste').focus();
  document.getElementById('btnPaste').onclick = pasteBarCodeSite;
  document.getElementById('txtBarCode').value = "Cole aqui seu código de barras";
  document.getElementById('txtBarCode').onfocus = function(event) {
    event.srcElement.value = "";
  };
});
