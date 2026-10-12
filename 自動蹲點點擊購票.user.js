// ==UserScript==
// @name         自動蹲點點擊購票
// @namespace    http://tampermonkey.net/
// @version      2025-09-21
// @description  try to take over the world!
// @author       You
// @match        https://kham.com.tw/*pplication/UTK02/UTK0201_.aspx?PRODUCT_ID=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=kham.com.tw
// @grant        none
// ==/UserScript==


(function() {
    'use strict';


  const url = "https://kham.com.tw/Application/UTK02/UTK0201_.aspx?T=";

    const data = new URLSearchParams({
        "action": "GOBUY",
       "PRODUCT_ID": "P11FLK1Y" //王心凌
       //  "PRODUCT_ID": "P111A5YA" //羅志祥
    });

    const headers = {
        "x-requested-with": "XMLHttpRequest",
        "content-type": "application/x-www-form-urlencoded"
    };





    // start loop 檢查是否已開放售票
let intervalId;
const el = document.querySelector('p.highlightBlue');

intervalId = setInterval(() => {

        const now = new Date();


        if ((now.getHours() ==11&&now.getSeconds()==59 && now.getMinutes() == 59&& now.getMilliseconds()>950) || now.getHours() ==12) {


    fetch(url, {
        method: "POST",
        headers: headers,
        body: data
    })
    .then(response => response.text())
    .then(text => {
       if (text.includes("alert1")) {
        //             if (text.includes("415")) {
    if(el)el.innerText =now.toISOString()+text;

        //    console.log(now.toISOString(),text);
        } else {

           top.location.href = 'https://kham.com.tw/application/UTK02/UTK0201_00.aspx?PRODUCT_ID=P11FLK1Y';
           clearInterval(intervalId);
      console.log("已跳轉 response:", text);

        }
    })
    .catch(err => console.error(err));}




    else if(el)el.innerText ="本地時間in UTC："+ now.toISOString()+"  时间没到 ";

    }, 22); // 6000 毫秒 = 1 s


        // end loop 檢查是否已開放售票











})();
