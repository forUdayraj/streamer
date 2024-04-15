const userVideo = document.getElementById("user-video");

const startButton = document.getElementById("start-btn");

const state = {media : null};
const socket = io();

startButton.addEventListener("click", () => {
    const mediaRecorder = new MediaRecorder(state.media, {
        // mimeType: 'video/webm; codecs=vp9', // Assuming WebM VP9, but depends on browser support
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 250000,
        framerate: 25
    });

    mediaRecorder.ondataavailable = (e) => {
        console.log('binary data is available:', e.data);
        socket.emit('binarystream', e.data);
    };

    mediaRecorder.start(25);
});

window.addEventListener("load", async (e) => {
  try {
    const media = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    state.media = media;
    userVideo.srcObject = media;
  } catch (err) {
    console.log(err);
  }
});
