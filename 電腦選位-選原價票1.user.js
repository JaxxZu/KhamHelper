// ==UserScript==
// @name         電腦選位-選原價票1
// @namespace    http://tampermonkey.net/
// @version      2025-09-21
// @description  try to take over the world!
// @author       You
// @match        https://kham.com.tw/*pplication/UTK02/UTK0202_.aspx?*
// @match        https://kham.com.tw/*pplication/UTK02/UTK0201_001.aspx?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=kham.com.tw
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

// 設定目標價格字串（注意包含千分位逗號）
const targetPriceStr = "4,980";

// 找到所有 <tr>
const rows = document.querySelectorAll('tbody tr');

for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

    // 取價格 span
    const priceSpan = row.querySelector('span#PRICE_STR');
    if (!priceSpan) continue;

    // 字符串比對
    if (priceSpan.textContent.trim() === targetPriceStr) {
        // 找到對應的 + 按鈕
        const plusBtn = row.querySelector('button.plus');
        if (plusBtn) {
            plusBtn.click(); // 模擬點擊
            console.log('已點擊原價票 + 號');
        }
        break; // 找到就跳出
    }
}
})();