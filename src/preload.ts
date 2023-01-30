import { contextBridge, ipcRenderer} from "electron";

const API = {
    app: {
        close:    () => ipcRenderer.send("process/close"),
        maximize: () => ipcRenderer.send("process/maximize"),
        minimize: () => ipcRenderer.send("process/minimize"),
        reload:   () => ipcRenderer.send("process/reload"),
    },
};

contextBridge.exposeInMainWorld("process", API);