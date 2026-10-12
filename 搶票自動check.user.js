// ==UserScript==
// @name         搶票自動check
// @namespace    http://tampermonkey.net/
// @version      2024-07-27
// @description  try to take over the world!
// @author       You
// @match        https://kham.com.tw/*pplication/UTK02/UTK0206_.aspx
// @icon         https://www.google.com/s2/favicons?sz=64&domain=kham.com.tw
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
if($('#agreen'))$('#agreen').trigger('click');
if($('#agreen2'))$('#agreen2').trigger('click');

if(document.querySelector('input[name="ctl00$ContentPlaceHolder1$GET_METHOD_LIST$ctl01$GET_METHOD_RDO"]')){document.querySelector('input[name="ctl00$ContentPlaceHolder1$GET_METHOD_LIST$ctl01$GET_METHOD_RDO"]').click();}

})();