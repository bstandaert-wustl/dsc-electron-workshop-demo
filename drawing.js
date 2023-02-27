/*
Implements a basic drawing canvas
Adapted from https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events/Using_Pointer_Events
*/

const canvas = document.getElementById('drawing-editor')
const ctx = canvas.getContext('2d')

const ongoingTouches = [];

function colorForTouch() {
    // TODO support multiple colors
    return 'red'
}

function ongoingTouchIndexById(idToFind) {
    for (let i = 0; i < ongoingTouches.length; i++) {
      const id = ongoingTouches[i].identifier;
  
      if (id === idToFind) {
        return i;
      }
    }
    return -1;    // not found
  }
  
  function copyTouch(touch) {
    return { identifier: touch.pointerId, pageX: touch.clientX, pageY: touch.clientY };
  }
  

function handleStart(evt) {  
    ongoingTouches.push(copyTouch(evt));
    const color = colorForTouch(evt);
    ctx.beginPath();
  }

  function handleMove(evt) {
    const color = colorForTouch(evt);
    const idx = ongoingTouchIndexById(evt.pointerId);
  
    if (idx >= 0) {
      ctx.beginPath();
      ctx.moveTo(ongoingTouches[idx].pageX - canvas.offsetLeft, ongoingTouches[idx].pageY - canvas.offsetTop);
      ctx.lineTo(evt.clientX - canvas.offsetLeft, evt.clientY - canvas.offsetTop);
      ctx.lineWidth = 4;
      ctx.strokeStyle = color;
      ctx.stroke();
  
      ongoingTouches.splice(idx, 1, copyTouch(evt));  // swap in the new touch record
    } else {
      // console.log(`can't figure out which touch to continue: idx = ${idx}`);
    }
  }


  function handleEnd(evt) {
    const color = colorForTouch(evt);
    const idx = ongoingTouchIndexById(evt.pointerId);
  
    if (idx >= 0) {
      ctx.lineWidth = 4;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(ongoingTouches[idx].pageX - canvas.offsetLeft, ongoingTouches[idx].pageY - canvas.offsetTop);
      ctx.lineTo(evt.clientX - canvas.offsetLeft, evt.clientY - canvas.offsetTop);
      ongoingTouches.splice(idx, 1);  // remove it; we're done
    } else {
      // console.log("can't figure out which touch to end");
    }
  }
    
canvas.addEventListener('pointerdown', handleStart)
canvas.addEventListener('pointerup', handleEnd)
canvas.addEventListener('pointermove', handleMove)