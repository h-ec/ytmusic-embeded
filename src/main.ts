import { app, BrowserWindow, BrowserWindowConstructorOptions, ipcMain, session } from 'electron';
import { ElectronBlocker } from '@cliqz/adblocker-electron';
import fetch from 'cross-fetch';

import path from 'path';

const run = async ( ) => {
    app.whenReady().then(( ) => {
        const mainWindowOptions: BrowserWindowConstructorOptions = {
            minWidth: 900,
            minHeight: 450,
            width: 1024,
            height: 600,

            title: 'Youtube Music',
            show: false,
            frame: false,

            webPreferences: {
                nodeIntegration: true,
                contextIsolation: true,
                webSecurity: true,
                webviewTag: true,

                devTools:         app.isPackaged ? false : true,
                zoomFactor: 1.0,
                v8CacheOptions: 'bypassHeatCheckAndEagerCompile',

                preload: path.join(__dirname, '/preload.js'),
            }
        };

        let mainWindow: BrowserWindow = new BrowserWindow(mainWindowOptions);

        mainWindow.loadFile(path.join(__dirname, '/web/index.html'));

        ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
            blocker.enableBlockingInSession(session.defaultSession);
        });

        mainWindow.on('ready-to-show', mainWindow.show);

        ipcMain.on('process/close',    () => app.quit());
        ipcMain.on('process/maximize', () => mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize());
        ipcMain.on('process/minimize', () => mainWindow.minimize());
        ipcMain.on('process/reload',   () => mainWindow.reload());

        app.on('quit', ( ) => {
            app.quit();
            process.exit(0);
        });
    });
};

run();