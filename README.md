# 雲端星際銀河探險隊
雲端銀行活動的前端頁面

## 切換環境
> 使用 gulp task 來切換環境，參考 [gulpfile](gulpfile.js)

```shell
# 本機
gulp buildEnvToDev

# 測試與正式
gulp buildDevToEnv
```

## 部署
> 用 gulp 指定環境並打包，將程式碼 push 到 github 中，並加入 tag，Travis CI 會透過 event server 部署至測試或正式環境中。

```shell
# 打包至測試環境
gulp packageTest

# 打包至正式環境
gulp packageProd
```

## 架構
使用 [jQuery v3](https://sweetalert2.github.io) + [RequireJs](http://requirejs.org/)，以 AMD 方式將 JavaScript 模組化，可參考主要程式進入點 [galaxy-space main.js](src/js/galaxy-space/main.js)。

## 好用的第三方元件
[BootStrap v4](https://getbootstrap.com) 響應式網頁的 UI 框架，用於呈現雲端銀行的交易頁面。    
[BootStrap Table](http://bootstrap-table.wenzhixin.net.cn) 使用 BootStrap 製作的 Table 元件，可彈性製作 Table 內容與制定樣式，並可在 table 內實現 CRUD 功能。目前用於呈現雲端銀行的交易 table 中。    
[SweetAlert2](https://sweetalert2.github.io) 可訂製的 popup 彈跳視窗。    
[w3](http://webdevable.com/w3schools/w3js/default.html) w3 school 製作的元件，輕量且有許多互動效果的功能，用於呈現禮物的幻燈片效。    
[countUp](https://inorganik.github.io/countUp.js/) 呈現數字遞增或遞減的動畫效果。
