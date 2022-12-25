// var bu = document.getElementById("butt");
// // var na = document.getElementById("name");

// bu.onclick =  function() {
//     console.log("My Name Dhruv");

//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");

//     // var raw = JSON.stringify({
//     //     "code": dataUrl
//     // });

//     var requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         // body: raw,
//         // redirect: 'follow'
//     };

//     fetch("/find" , requestOptions)
//     .then(res => {
//         if (res.ok) {
//             // console.log(res);
//             return res.json();
//         }
//         else{
//             alert("Wrong Doing");
//         }
//     })
//     .then(jRes => {
//         console.log(jRes);
//         document.getElementById("name").innerHTML = "Dhruv";
//     })
// }

// var vfile = document.getElementById('video_file');

// vfile.onclick = function() {
//     document.getElementById("load").style.display = 'none';
// }

var fbun = document.getElementById('final_button');

fbun.onclick = function() {
    // console.log("heh");
    var x = document.getElementById("emotions").value;
    console.log(x);

    if (x=='') {
        alert("Select Emotion");
    }
    else {
        // document.getElementById("final_result").style.display = 'block';
        // document.getElementById("load").style.display = 'none';
        document.getElementById("load").style.display = 'block';

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // var raw = JSON.stringify({
        //     "code": dataUrl
        // });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            // body: raw,
            // redirect: 'follow'
        };

        
        fetch("/generate_result" , requestOptions)
        .then(res => {
            if (res.ok) {
                return res.json();
            }else {
                alert("Wrong Doing");
            }
        })
        .then(resJ =>{
            document.getElementById("final_result").load();
            document.getElementById("final_result").style.display = 'block';
            // document.getElementById("load").style.display = 'none';
            document.getElementById("load").style.display = 'none';
        });
    }
    
}

// var vbun = document.getElementById('video_submit');

// vbun.onclick = function() {

    

//     console.log("hehe");
    
//     let html = document.getElementById("video_src");

//     html.src = "/static/Wav2Lip/inputs/input.mp4";

//     // html.load();
//     document.getElementById("input_video").load();
//     document.getElementById("input_video").style.display = 'block';
// }

var vbun = document.getElementById('video_file');

vbun.onchange = function() {

    // location.reload();

    document.getElementById("input_video").style.display = 'none';
    
    this.form.submit();
    // var xt = this.form.submit();
    // console.log("hehe_video" , typeof(xt));

    var ext = "";

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // var raw = JSON.stringify({
    //     "code": dataUrl
    // });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        // body: raw,
        // redirect: 'follow'
    };

    
    fetch("/extension" , requestOptions)
    .then(res => {
        if (res.ok) {
            return res.json();
        }else {
            alert("Wrong Doing");
        }
    })
    .then(resJ =>{
        
        ext = resJ.video_ex;
        console.log(ext);

        console.log("hehe1" , ext);
    
        let html = document.getElementById("video_src");

        html.src = "/static/Wav2Lip/inputs/input." + ext;
        html.type = "video/" + ext;

        // html.load();
        document.getElementById("input_video").load();
        document.getElementById("input_video").style.display = 'block';
    });

    // console.log("hehe1" , ext);
    
    // let html = document.getElementById("video_src");

    // html.src = "/static/Wav2Lip/inputs/input." + ext;

    // // html.load();
    // document.getElementById("input_video").load();
    // document.getElementById("input_video").style.display = 'block';
}

var abun = document.getElementById('audio_file');

abun.onchange = function() {

    document.getElementById("input_audio").style.display = 'none';

    this.form.submit();
    // var xt = this.form.submit();
    // console.log("hehe_video" , xt);

    var ext = abun.name.value;
    console.log(ext);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // var raw = JSON.stringify({
    //     "code": dataUrl
    // });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        // body: raw,
        // redirect: 'follow'
    };

    
    // fetch("/extension" , requestOptions)
    // .then(res => {
    //     if (res.ok) {
    //         return res.json();
    //     }else {
    //         alert("Wrong Doing");
    //     }
    // })
    // .then(resJ =>{
        
    //     ext = resJ.audio_ex;
    //     console.log(ext);

    //     let html = document.getElementById("audio_src");

    //     html.src = "/static/Wav2Lip/inputs/input." + ext;
    //     html.type = "audio/" + ext;

    //     // html.load();
    //     document.getElementById("input_audio").load();
    //     document.getElementById("input_audio").style.display = 'block';
    // });

    
    // let html = document.getElementById("audio_src");

    // html.src = "/static/Wav2Lip/inputs/input." + ext;
    // html.type = "audio/" + ext;

    // html.load();
    // document.getElementById("input_audio").load();
    // document.getElementById("input_audio").style.display = 'block';
}

var bu = document.getElementById("butt");

bu.onclick = function() {


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // var raw = JSON.stringify({
    //     "code": dataUrl
    // });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        // body: raw,
        // redirect: 'follow'
    };

    
    fetch("/extension" , requestOptions)
    .then(res => {
        if (res.ok) {
            return res.json();
        }else {
            alert("Wrong Doing");
        }
    })
    .then(resJ =>{
        console.log(resJ);
    });
}


// var fx = document.getElementById("myfile");
// fx.onchange = function() {

    // this.form.submit();

    // document.forms['form_tester'].addEventListener('submit', (event) => {

    //     event.preventDefault();
    //     console.log(event.target);
    // });

// }

function prevent_us(event) {
    // console.log(event.target);
    // console.log(event.target.name.value);

    // console.log(document.getElementById("myfile").files[0].name);


    let files = event.target.files;
    let fileName = files[0].name;
    
    // your code start here
    var data = new FormData();
    data.append('files', files[0]); // maybe it should be '{target}_cand'
    data.append('name', fileName);
    // console.log(data.get('files'));

    // let url = "http://localhost:5001/v1/cand"
    let url = "/upload_tester";
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

document.getElementById("myfile").addEventListener('change' , prevent_us);