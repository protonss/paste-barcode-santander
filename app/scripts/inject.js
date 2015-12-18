function setBarCodeInputs(barCodeArray) {

  try {

    var currentDocument = window.frames[1].window.frames[1].document.getElementById("iframePrinc").contentWindow.document;

    var barCodeSantander = currentDocument.getElementsByClassName("lista")[0];
    var txtNomeCedenteX = currentDocument.getElementById("txtNomeCedenteX");

    if (barCodeSantander) {

      if (barCodeArray.length == 1 && barCodeArray[0].length == 47) {
        barCodeArray = createBarCodeArray(barCodeArray[0]);
      }

      var cells = barCodeSantander.rows[1].cells;

      var cellLength = cells.length - 1;

      for (x = 1; x < cellLength; x++) {

        var cell = cells[x].childNodes[1];
        var id = cell.getAttribute("id");

        var onblurFunc = cell.getAttribute("onblur") || "";
        onblurFunc = onblurFunc.replace(/document.f1/g, "currentDocument.forms[0]");

        var onkeyupFunc = cell.getAttribute("onkeyup") || "";
        onkeyupFunc = onkeyupFunc.replace(/this/g, "currentDocument.forms[0]." + id)
          .replace(/document.f1/g, "currentDocument.forms[0]");

        cell.value = barCodeArray[x - 1];

        switch (x) {
          case 8:
            lastFocus(cell.value, currentDocument);
            break;
          case 7:
            eval(onkeyupFunc);
            break;
          default:
            eval(onblurFunc);
            eval(onkeyupFunc);
        }

      }

    }

  }
  catch (e) {
    alert("Você não está no site ou na página correta para transferir o código do boleto!");
  }
}

function createBarCodeArray(barCode) {

  var barCodeArray = [];

  //34191750257375257293080101010009766470000148069
  //03399 64652 32300 000000 03046 501023 1 66430000497593
  barCodeArray.push(barCode.substring(0, 5));
  barCodeArray.push(barCode.substring(5, 10));
  barCodeArray.push(barCode.substring(10, 15));
  barCodeArray.push(barCode.substring(15, 21));
  barCodeArray.push(barCode.substring(21, 26));
  barCodeArray.push(barCode.substring(26, 32));
  barCodeArray.push(barCode.substring(32, 33));
  barCodeArray.push(barCode.substring(33, barCode.length));

  return barCodeArray;

}

(function() {

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.actionType == "updateBarCode") {
      setBarCodeInputs(JSON.parse(request.barCodeArray));
    }
  });

})();
