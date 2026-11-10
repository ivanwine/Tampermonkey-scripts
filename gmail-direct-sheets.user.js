// ==UserScript==
// @name         Gmail: Open Spreadsheets Directly in Sheets
// @namespace    https://intermodal1.com/
// @version      1.0
// @description  Bypasses preview overlay and directly opens spreadsheets in Google Sheets
// @match        https://mail.google.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    const observer = new MutationObserver(() => {
        const openInSheetsBtn = document.querySelector('div[aria-label="Open with Google Sheets"], div[data-tooltip="Open with Google Sheets"]');
        if (openInSheetsBtn) {
            openInSheetsBtn.click();
            const closeBtn = document.querySelector('div[aria-label="Close"], div[data-tooltip="Close"]');
            if (closeBtn) closeBtn.click();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
