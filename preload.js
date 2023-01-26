const { contextBridge, ipcRenderer } = require('electron')
const fs = require('fs')

var editorOpenPath = null;

contextBridge.exposeInMainWorld(
  'editorCommands',
  {
    showOpenDialog: async function() {
      const result = await ipcRenderer.invoke('open-file')
      editorOpenPath = result[0] || null
      return editorOpenPath
    },
    readOpenFile: function(cb) {
      fs.readFile(editorOpenPath, 'utf-8', function(err, data) {
        cb(data)
      })
    },
    saveOpenFile: function(content) {
      fs.writeFile(editorOpenPath, content, function(err, data) {
       if (err) {
        console.warn(err)
       }
      })
    }
  }
)