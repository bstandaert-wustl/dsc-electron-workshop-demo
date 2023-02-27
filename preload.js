const { contextBridge, ipcRenderer } = require('electron')
const fs = require('fs')

var editorOpenPath = null;

const editorCommands = {
  showOpenDialog: async function() {
    const result = await ipcRenderer.invoke('open-file')
    editorOpenPath = result[0] || null
    return editorOpenPath
  },
  showCreationDialog: async function() {
    const result = await ipcRenderer.invoke('create-file')
    editorOpenPath = result || null
    return editorOpenPath
  },
  readOpenFile: function(cb) {
    fs.readFile(editorOpenPath, function(err, data) {
      cb(data)
    })
  },
  saveOpenFile: async function(content) {
    if (!editorOpenPath) {
      await editorCommands.showCreationDialog()
    }
    if (!editorOpenPath) {
      //user closed the dialog
      return
    }
    fs.writeFile(editorOpenPath, Buffer.from(content), function(err, data) {
     if (err) {
      console.warn(err)
     }
    })
  }
}

contextBridge.exposeInMainWorld('editorCommands', editorCommands)