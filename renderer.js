/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

document.getElementById('open-file').addEventListener('click', async function(e) {
    await editorCommands.showOpenDialog()
    editorCommands.readOpenFile(function(data) {
        console.log(data)
        document.getElementById('editor').value = data;
    })
})

document.getElementById('save-file').addEventListener('click', function(e) {
    editorCommands.saveOpenFile(document.getElementById('editor').value)
})