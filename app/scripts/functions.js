function Tamanho(Who, nTamanho, WhoNext) {
  if (Who.value.length == nTamanho) {
    if (WhoNext.value.length == 0) {
      WhoNext.focus();
    }
  }
  return;
}

function lastFocus(pValue, currentDocument) {

  dtbarra = pValue.substr(0, 4);
  vlbarra = ZeroLess(SubStr(pValue, 4, 13));

  if (vlbarra != '' && vlbarra > 0) {
    if (currentDocument.getElementById('txtValor')) {
      currentDocument.getElementById('txtValor').value = vlbarra;
      if (currentDocument.getElementById('txtValor').value != '') {
        CheckMoney(currentDocument.getElementById('txtValor'), 'Valor')
      }
    }
  }
  if (dtbarra != '' && dtbarra > 0) {
    if (currentDocument.getElementById('iframeVencimento')) {
      currentDocument.getElementById('iframeVencimento').src = '/Includes/FatorVencimento.asp?dtbarra=' + dtbarra
    }
    else {
      alert("não encontrou iframe");
    }
  }
}

function CheckMoney(Who, WhoName, NoZeroCheck, NotShowAlert) {

  var
    vWhoN = '',
    Ok = false;

  vWhoN = ZeroLess(JustNumber(Who.value));
  if ((vWhoN.length > 0 && parseInt(vWhoN) > 0) || !NoZeroCheck) {
    if (vWhoN.length >= 2) {
      Who.value = ToMoney(vWhoN);
      Ok = true;
    }
    else {
      if (!NotShowAlert) {
        Who.value = vWhoN;
        alert('Por favor, preencha o campo ' + WhoName + ' com no mínimo 3 caracteres.\nEx.: 001');
      }
      else {
        Who.value = ToMoney(vWhoN)
      }
    }
  }
  return Ok;
}

function ZeroLess(What) {
  var
    i = 0,
    WhatClean = '',
    pvJa = false;

  if (What.length > 3) {
    for (i = 0; i <= (What.length - 1); i++) {
      if ((What.charAt(i) != '0') || (pvJa)) {
        pvJa = true;
        WhatClean += What.charAt(i);
      }
    }
  }
  else {
    WhatClean = What;
  }

  return WhatClean;
}

function JustNumber(What) {
  var
    WhatClean = '';

  for (var i = 0;
    (i <= (What.length - 1)); i++) {
    for (var j = 0;
      ((j <= 9) && (true)); j++) {
      if (What.charAt(i) == '' + j) {
        WhatClean += What.charAt(i);
        break;
      }
    }
  }
  return WhatClean;
}

function ToMoney(What) {
  var
    i = 0,
    j = 0,
    vMod = 0,
    vWhatMoney = '';

  if (What.length > 5) {
    vMod = (What.length - 2) % 3;
    if (vMod == 0) j = 0;
    if (vMod == 1) j = 2;
    if (vMod == 2) j = 1;
    for (i = 0;
      (i <= (What.length - 3)); i++) {
      if (j == 3) {
        vWhatMoney += '.';
        j = 0;
      }
      vWhatMoney += What.charAt(i);
      j++;
    }
    vWhatMoney = vWhatMoney + ',' + SubStr(What, (What.length - 2), (What.length - 1));
  }
  else {
    if (What.length == 5)
      vWhatMoney = SubStr(What, 0, 2) + ',' + SubStr(What, 3, 4);
    if (What.length == 4)
      vWhatMoney = SubStr(What, 0, 1) + ',' + SubStr(What, 2, 3);
    if (What.length == 3)
      vWhatMoney = What.charAt(0) + ',' + SubStr(What, 1, 2);
    if (What.length == 2)
      vWhatMoney = '0,' + What;
    if (What.length == 1)
      vWhatMoney = '0,0' + What;
  }

  return vWhatMoney;
}

function SubStr(vpText, vpFrom, vpUntil) {
  var
    vpResult = '',
    i = 0;

  for (var i = vpFrom;
    (i <= vpUntil); i++) {
    vpResult += vpText.charAt(i);
  }
  return vpResult;
}
