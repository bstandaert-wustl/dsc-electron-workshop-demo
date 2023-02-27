/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

document.getElementById('open-file').addEventListener('click', async function(e) {
    const path = await editorCommands.showOpenDialog()
    var img = document.createElement('img')
    img.addEventListener('load', function() {
        ctx.drawImage(img, 0, 0, 600, 500)
    })
    img.src = path;
})

document.getElementById('save-file').addEventListener('click', function(e) {
    canvas.toBlob(function(blob) {
        blob.arrayBuffer().then(function(buffer) {
            editorCommands.saveOpenFile(buffer)
        })
    }, 'image/png')
})