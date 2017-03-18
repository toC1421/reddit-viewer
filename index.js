'use strict'

//index.js(main process)
//package.jsonで指定したメインのスクリプトをメインプロセスと呼ぶ。
//メインプロセスでは状態管理をしつつ、様々な画面を呼び出す。
// - GUI (renderer process)
// - GUI (renderer process)
// - GUI (renderer process)
//それぞれの画面ごとに処理を実行するというイメージ

const electron = require('electron');
const shell = require('electron').shell;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

app.on('ready',function(){
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      nodeIntegration: false
    }
  });
  mainWindow.webContents.on('new-window', function(e, url) {
    e.preventDefault();
    shell.openExternal(url);
});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed',function(){
    mainWindow = null;
  });
});
