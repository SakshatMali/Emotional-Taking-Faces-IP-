var rec_button = document.getElementById('record_video');

let recordingTimeMS = 20000;

let preview = document.getElementById("preview");

let recording = document.getElementById("recording");

var startButton = document.getElementById("start");

var stopButton = document.getElementById("stop");

var dot = document.getElementById("blinker");

var stop_pressed = false;

let constraintObj = { 
    audio: false, 
    video: true
};



rec_button.onclick = function() {
    document.getElementById('video_player').style.display = 'none';
    // console.log("wow");
    document.getElementById("record_buttons").style.display = "block";
    document.getElementById('inputVideoBox1').style.height = "58vh";

    if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
        navigator.mediaDevices.getUserMedia = function(constraintObj) {
            let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            if (!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
            }
            return new Promise(function(resolve, reject) {
                getUserMedia.call(navigator, constraintObj, resolve, reject);
            });
        }
    }else{
        navigator.mediaDevices.enumerateDevices()
        .then(devices => {
            devices.forEach(device=>{
                console.log(device.kind.toUpperCase(), device.label);
                //, device.deviceId
            })
        })
        .catch(err=>{
            console.log(err.name, err.message);
        })
    }

    navigator.mediaDevices.getUserMedia(constraintObj)
    .then(function(mediaStreamObj) {
        //connect the media stream to the first video element
        let video = preview;
        if ("srcObject" in video) {
            video.srcObject = mediaStreamObj;
        } else {
            //old version
            video.src = window.URL.createObjectURL(mediaStreamObj);
        }
        
        video.onloadedmetadata = function(ev) {
            //show in the video element what is being captured by the webcam
            video.play();
        };
        
        //add listeners for saving video/audio
        // let start = document.getElementById('btnStart');
        // let stop = document.getElementById('btnStop');
        // let vidSave = document.getElementById('vid2');
        let mediaRecorder = new MediaRecorder(mediaStreamObj);
        let chunks = [];
        
        startButton.addEventListener('click', (ev)=>{
            dot.style.display = 'block'
            mediaRecorder.start();
            console.log(mediaRecorder.state);
            setTimeout( function() { 
                if (stop_pressed==false) {
                    stopButton.click();
                }
            }, recordingTimeMS);
            startButton.disabled = true;
        })
        stopButton.addEventListener('click', (ev)=>{
            dot.style.display = 'none'
            stop_pressed = true;
            mediaRecorder.stop();
            console.log(mediaRecorder.state);
            startButton.style.display = "none";
            stopButton.style.display = "none";
        });
        mediaRecorder.ondataavailable = function(ev) {
            chunks.push(ev.data);
        }
        mediaRecorder.onstop = (ev)=>{
            let blob = new Blob(chunks, { 'type' : 'video/mp4;' });
            chunks = [];
            let videoURL = window.URL.createObjectURL(blob);
            recording.src = videoURL;
            // console.log("nmnn");

            preview.style.display = "none";
        
            recording.style.display = "block";
            document.getElementById('text_success').style.display = "block";

            var data = new FormData();
            data.append('files', blob); // maybe it should be '{target}_cand'
            data.append('name', "mp4");
            // console.log(data.get('files'));

            
            let url = "/emo/file_saver";
            fetch(url,{
                method:"POST",
                // body: {files:files[0]}, // wrong
                body: data,
            })
            .then(function(response){
                return response.json();
            })
            // .then(function(data){ // use different name to avoid confusion
            .then(function(res){
                console.log('success');
                console.log(res);
            });
            
                }
            })
            .catch(function(err) { 
                console.log(err.name, err.message); 
            });

        
}