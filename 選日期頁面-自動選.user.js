// ==UserScript==
// @name         選日期頁面-自動選场次
// @namespace    http://tampermonkey.net/
// @version      2024-09-04
// @description  try to take over the world!
// @author       You
// @match        https://kham.com.tw/application/UTK02/UTK0201_00.aspx?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=kham.com.tw
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    // 找到所有表格行
    const rows = document.querySelectorAll('.eventTABLE tbody tr');

    for (let row of rows) {
        const dateCell = row.querySelector('td:nth-child(1)');
        const locationCell = row.querySelector('td:nth-child(2)');

        if (!dateCell || !locationCell) continue;

        const dateText = dateCell.textContent.trim();
        const locText = locationCell.textContent.trim();

        // 條件：星期5 && 不是輪椅
        if (dateText.includes('五') && !locText.includes('輪')&& !locText.includes('障')) {
            const btn = row.querySelector('button.red');
            if (btn) {
                btn.click();
                console.log('已點擊：', dateText);
            }
            break; // 只點第一個符合的
        }
    }












  })();