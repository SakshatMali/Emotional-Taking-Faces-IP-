var rec_button_audio = document.getElementById('record_audio');

// let recordingTimeMS = 20000;

let preview_audio = document.getElementById("preview_audio");

let recording_audio = document.getElementById("recording_audio");

var startButton_audio = document.getElementById("start_audio");

var stopButton_audio = document.getElementById("stop_audio");

var dot_audio = document.getElementById("blinker_audio");

var stop_pressed_audio = false;

let constraintObj_audio = { 
    audio: true, 
    video: false
};



rec_button_audio.onclick = function() {
    document.getElementById('audio_player').style.display = 'none';
    // console.log("wow");
    document.getElementById("record_buttons_audio").style.display = "block";
    document.getElementById('inputVideoBox2').style.height = "40vh";

    if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
        navigator.mediaDevices.getUserMedia = function(constraintObj_audio) {
            let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            if (!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
            }
            return new Promise(function(resolve, reject) {
                getUserMedia.call(navigator, constraintObj_audio, resolve, reject);
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

    navigator.mediaDevices.getUserMedia(constraintObj_audio)
    .then(function(mediaStreamObj) {
        //connect the media stream to the first video element
        
        let mediaRecorder = new MediaRecorder(mediaStreamObj);
        let chunks = [];
        
        startButton_audio.addEventListener('click', (ev)=>{
            dot_audio.style.display = 'block'
            mediaRecorder.start();
            console.log(mediaRecorder.state);
            setTimeout( function() { 
                if (stop_pressed_audio==false) {
                    stopButton_audio.click();
                }
            }, recordingTimeMS);
            startButton_audio.disabled = true;
        })
        stopButton_audio.addEventListener('click', (ev)=>{
            dot_audio.style.display = 'none'
            stop_pressed_audio = true;
            mediaRecorder.stop();
            console.log(mediaRecorder.state);
            startButton_audio.style.display = "none";
            stopButton_audio.style.display = "none";
        });
        mediaRecorder.ondataavailable = function(ev) {
            chunks.push(ev.data);
        }
        mediaRecorder.onstop = (ev)=>{
            let blob = new Blob(chunks, { 'type' : 'audio/mp3;' });
            chunks = [];
            let videoURL = window.URL.createObjectURL(blob);
            recording_audio.src = videoURL;
            // console.log("nmnn");

            preview_audio.style.display = "none";
        
            recording_audio.style.display = "block";
            document.getElementById('text_success_audio').style.display = "block";

            var data = new FormData();
            data.append('files', blob); // maybe it should be '{target}_cand'
            data.append('name', "mp3");
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