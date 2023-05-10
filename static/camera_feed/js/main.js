// Get Endpoint address
var loc = window.location;
var endpoint = "ws://" + loc.host + loc.pathname;

// Create a websocket connection
var socket;
var intervalId;

// Extract the html components
var input_video = document.getElementById("input_video");
var received_video = document.getElementById("received_video");
var start_button = document.getElementById("start-button");
var stop_button = document.getElementById("stop-button");
var webCam = document.getElementById("Webcam");
var liveStream = document.getElementById("liveStream");

// Convert Video to Base64 JPEG
const getFrame = () => {
  const canvas = document.createElement("canvas");
  canvas.width = input_video.videoWidth;
  canvas.height = input_video.videoHeight;
  canvas.getContext("2d").drawImage(input_video, 0, 0);
  const data = canvas.toDataURL("image/jpeg");
  return data;
};

// Open a WebSocket connection
function openWebSocket() {
  socket = new WebSocket(endpoint);

  // Event handler for WebSocket connection opened
  socket.onopen = () => {
    console.log("WebSocket connection opened.");

    intervalId = setInterval(() => {
      // Check to avoid error due to onclose latency
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(getFrame());
      }
      // Set FPS to 15
    }, 1000 / 15); // calculates milliseconds
  };

  // Event handler for WebSocket connection closed
  socket.onclose = () => {
    console.log("WebSocket connection closed.");
    clearInterval(intervalId); // Clear the interval when the socket is closed
  };

  // Event handler for WebSocket errors
  socket.onerror = () => {
    console.error("WebSocket error occurred.");
  };

  // Event handler for WebSocket message
  socket.onmessage = (event) => {
    // Update received video with the received frames from the backend
    received_video.src = event.data;
  };
}

// Assign event listeners
start_button.addEventListener("click", () => {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((mediastream) => {
      // Add and remove hidden class
      start_button.classList.add("hidden");
      stop_button.classList.remove("hidden");
      webCam.classList.remove("hidden");
      liveStream.classList.remove("hidden");

      // Set source to input stream
      input_video.srcObject = mediastream;

      openWebSocket();
    })
    .catch((err) => {
      console.log(err.name, err.message);
    });
});

stop_button.addEventListener("click", () => {
  // Add and remove hidden class
  start_button.classList.remove("hidden");
  stop_button.classList.add("hidden");
  webCam.classList.add("hidden");
  liveStream.classList.add("hidden");

  // Stop the video stream
  const stream = input_video.srcObject;
  const tracks = stream.getTracks();
  tracks.forEach((track) => track.stop());

  // Remove the source from the video element
  input_video.srcObject = null;
  received_video.src = "";

  socket.close();
});
