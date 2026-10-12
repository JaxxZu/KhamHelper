// ==UserScript==
// @name         自動打碼+加入購物車+移除對話窗
// @namespace    http://tampermonkey.net/
// @version      2024-09-04
// @description  try to take over the world!
// @author       You
// @match        https://kham.com.tw/*pplication/UTK02/UTK0205_.aspx?*
// @match        https://kham.com.tw/*pplication/utk13/utk1306_.aspx
// @match        https://kham.com.tw/*pplication/UTK02/UTK0205_.aspx?PERFORMANCE_ID=*
// @match        https://kham.com.tw/*pplication/UTK02/UTK0202_.aspx?*
// @match        https://kham.com.tw/*pplication/UTK02/UTK0201_001.aspx?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=kham.com.tw
// @grant        GM_xmlhttpRequest
// @connect      127.0.0.1
// @connect      xxx.239.xxx.251
// ==/UserScript==

(function() {
    'use strict';

    var captchaBase64;

    // 封裝驗證碼識別邏輯
    function processCaptcha() {
        const captchaImg = document.getElementById('chk_pic');
        if (!captchaImg) {
            console.error('Captcha image element not found on the page.');
            return;
        }

        // 等待圖片加載完成
        if (!captchaImg.complete) {
            captchaImg.onload = () => drawCaptcha(captchaImg);
        } else {
            drawCaptcha(captchaImg);
        }
    }

    function drawCaptcha(img) {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        captchaBase64 = canvas.toDataURL('image/png');
        console.log('Captcha image in base64 format:', captchaBase64);

        var inputField = document.querySelector('input[name="ctl00$ContentPlaceHolder1$CHK"]');
        const pureBase64 = captchaBase64.split(',')[1];

        // 發送到本地 OCR API
        GM_xmlhttpRequest({
            method: "POST",
          url: "http://127.0.0.1:27274/xxxxxx",
       //       url: "http://xxx.239.xxx.251:27274/xxxxx",

            data: JSON.stringify({ image_base64: pureBase64 }),
            headers: { "Content-Type": "application/json" },
            onload: function (response) {
                try {
                    const result = JSON.parse(response.responseText).result;
                    console.log("OCR result:", result);

                    if (inputField) {
                        inputField.value = result;
                        ['input', 'change'].forEach(evtName => {
                            inputField.dispatchEvent(new Event(evtName, { bubbles: true }));
                        });
                      addShoppingCart();
                    }
                } catch (e) {
                    console.error("OCR 解析錯誤:", e, response.responseText);
                }
            },
            onerror: function (err) {
                console.error("OCR 請求失敗:", err);
            }
        });
    }

    // 初始加載時識別一次
    processCaptcha();





 const   refreshBtn =  document.querySelector('img[src="https://imgs2.utiki.com.tw/Data/KHAM_RWD/images/refresh-button.png"]');

if (refreshBtn) {
    // 取得原本 onclick 函數
    const oldOnClick = refreshBtn.onclick;

    // 重新設定 onclick，先執行原本，再執行新增內容
    refreshBtn.onclick = function(event) {
        if (oldOnClick) oldOnClick.call(this, event);  // 執行原本
 processCaptcha();        // 其他操作也可以加在這裡
    };
}

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            const node = mutation.target;
            // 判斷是否是 dialog 且目前顯示
            if (node.classList.contains('ui-dialog') && node.style.display !== 'none') {
                const content = node.querySelector('.ui-dialog-content');
                if (content && content.textContent.includes('購物車')) {
                    console.log('Dialog contains "購物車"，停止監聽');
                    observer.disconnect(); // 停止監聽
                    return;
                }
                //不是購物車，就是代表驗證碼錯誤或者未輸入全部內容
               node.querySelector('.ui-dialog-buttonset button').click();
               processCaptcha();
                console.log('Dialog appeared!');
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



})();