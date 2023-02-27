const { contextBridge, ipcRenderer } = require('electron')
const fs = require('fs')

var editorOpenPath = null;

const editorCommands = {
  // TODO add commands
}

contextBridge.exposeInMainWorld('editorCommands', editorCommands)