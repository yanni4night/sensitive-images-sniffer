/**
 * Copyright (C) 2016 yanni4night.com
 * DOMParser.js
 *
 * changelog
 * 2016-03-21[12:28:22]:revised
 *
 * @author yanni4night@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */

const parseDOM = (domStr) => {
    var doc;
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = 'about:blank';
    document.body.appendChild(iframe);
    doc = iframe.contentWindow.document;
    doc.body.innerHTML = domStr;
    return doc;
};