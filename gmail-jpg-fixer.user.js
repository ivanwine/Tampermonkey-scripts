// ==UserScript==
// @name         Gmail JPG_ Fixer
// @namespace    http://tampermonkey.net/
// @version      6.0
// @description  Opens .jpg_ Gmail attachments as images in a new tab
// @match        https://mail.google.com/*
// @grant        GM_xmlhttpRequest
// @connect      mail-attachment.googleusercontent.com
// @run-at       document-end
// ==/UserScript==
(function () {
  'use strict';
  function fixLinks() {
    document.querySelectorAll('a.aQy[href*="disp=safe"]').forEach(link => {
      if (link.dataset.jpgFixed) return;
      link.dataset.jpgFixed = '1';
      link.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        GM_xmlhttpRequest({
          method: 'GET',
          url: link.href,
          responseType: 'blob',
          onload: function (response) {
            const blob = new Blob([response.response], { type: 'image/jpeg' });
            const blobUrl = URL.createObjectURL(blob);
            window.open(blobUrl, '_blank');
          }
        });
      });
    });
  }
  const observer = new MutationObserver(fixLinks);
  observer.observe(document.body, { childList: true, subtree: true });
  fixLinks();
})();
