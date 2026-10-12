// ==UserScript==
// @name         移除公告
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

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            const node = mutation.target;
            // 判斷是否是 dialog 且目前顯示
            if (node.classList.contains('ui-dialog') && node.style.display !== 'none') {
                console.log('Dialog appeared!');
                const okButton = node.querySelector('.ui-dialog-buttonset button');
                if (okButton) okButton.click();
            }
        }
    });
});

// 監控 body 下所有子孫節點的 style 屬性變化
observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style']
});


    window.alert1 = function() {
        // 不做任何事
        return;
    };
})();