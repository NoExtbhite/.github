// ==UserScript==
// @name        Auto-Click NotCoin (yingxing version)
// @icon        https://cdn.joincommunity.xyz/clicker/moneta-small.png
// @namespace   Violentmonkey Scripts
// @match       https://clicker.joincommunity.xyz/clicker*
// @homepageURL https://github.com/SashaTail/notcoin_automation/
// @supportURL  https://github.com/SashaTail/notcoin_automation/issues
// @grant       none
// @version     1.0
// @author      Extbhite
// @description Скрипт для автоматического процесса кликов в NotCoin. Инструкция как запустить NotCoin через ПК в домашней странице(если в консоле выскакивает ошибка связанное с кликами, то это связанно с сессией).
// ==/UserScript==

// Original: https://github.com/SashaTail/notcoin_automation
// Forked version: https://github.com/yingxing-dev/notcoin_automation

powerLimitForAutotap = 100
clickPeriod_ms = 150

// do not touch
lastClickAt = 0
recharging = true
skipClick = false
_boost = false

async function click() {
    if (window.location.href !== "https://clicker.joincommunity.xyz/clicker" && !window.location.href.includes('https://clicker.joincommunity.xyz/clicker#')) {
        return
    }

    let cc = document.querySelectorAll('div[class^="_notcoin"]');
    let scoreElement = document.querySelector('div[class^="_scoreCurrent"]');
    let score = parseInt(scoreElement.textContent);

    try {
        let imrocket = document.querySelectorAll('img[class^="_root"]');
        imrocket[0][Object.keys(imrocket[0])[1]].onClick();
    } catch (error) {}

    if (Date.now() - lastClickAt >= clickPeriod_ms) {
        lastClickAt = Date.now();

        score = parseInt(scoreElement.textContent);

        if (!_boost) {
            if (skipClick) {
                return;
            }

            if (recharging) {
                if (score >= powerLimitForAutotap) {
                    recharging = false;
                }
                return;
            }
        }

        if (score > 0 || _boost) {
            try {
                await new Promise((resolve) => {
                    cc[0][Object.keys(cc[0])[1]].onTouchStart('');
                    setTimeout(resolve, 100);
                });
            } catch (error) {}
        } else {
            recharging = true;
            _boost = false;
        }
    }
}

setInterval(click, clickPeriod_ms);
