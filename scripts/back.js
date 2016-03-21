/**
  * Copyright (C) 2016 tieba.baidu.com
  * back.js
  *
  * changelog
  * 2016-03-20[14:33:30]:revised
  *
  * @author yanni4night@gmail.com
  * @version 1.0.0
  * @since 1.0.0
  */

chrome.browserAction.onClicked.addListener(function () {
    chrome.tabs.create({
        url: 'sniff.html'
    });
});

