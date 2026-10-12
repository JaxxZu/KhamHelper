// ==UserScript==
// @name         自動填賬號密碼
// @namespace    http://tampermonkey.net/
// @version      2025-09-21
// @description  try to take over the world!
// @author       You
// @match        https://kham.com.tw/*pplication/utk13/utk1306_.aspx
// @match        https://kham.com.tw/*pplication/UTK02/UTK0205_.aspx?*
// @match        https://kham.com.tw/*pplication/UTK02/UTK0202_.aspx?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=kham.com.tw
// @grant        none
// ==/UserScript==

(function() {
    'use strict';


const ac ="";
const pw="";


const A=document.getElementById("LOGIN_PWD");
    if(A){
A.value=pw;
        document.getElementById("LOGIN_ID").value=ac;
}


const B=document.getElementById("PASSWORD");
    if(B){
B.value=pw;
        document.getElementById("ACCOUNT").value=ac;
}





})();