function uploader(event) {
    console.log(event.target);
    event.target.style.width = "100%";
    // console.log(event.target.id);

    let ide = event.target.id;
    let ty = ide.split('_')[0];
    let files = event.target.files;
    let fileName = files[0].name;

    document.getElementById(ty+"_player").style = "none";

    let ext = fileName.split('.')[1];
    
    // your code start here
    var data = new FormData();
    data.append('files', files[0]); // maybe it should be '{target}_cand'
    data.append('name', fileName);
    // console.log(data.get('files'));

    
    let url = "/emo/file_uploader";
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
    })
    .then(function() {

        let html = document.getElementById(ty+ "_src");

        html.src = "/emo/static/Wav2Lip/inputs/input." + ext;
        html.type = ty + "/" + ext;


        document.getElementById(ty+"_player").load();
        document.getElementById(ty+"_player").style = "block";
        
        

        if (ty=='video') {
            document.getElementById('inputVideoBox1').style.height = "50vh";
            document.getElementById("record_buttons").style.display = "none";
        }

        else if (ty=='audio') {
            document.getElementById('inputVideoBox2').style.height = "30vh";
            document.getElementById("record_buttons_audio").style.display = "none";
        }
    });
}

document.getElementById("video_file").addEventListener("change" , uploader);

document.getElementById("audio_file").addEventListener("change" , uploader);

var fbun = document.getElementById('final_button');

let a = false;
document.getElementById('start').addEventListener('click' , (ev)=>{
    // console.log("hehe");
    a = true;
});

let b = false;
document.getElementById('start_audio').addEventListener('click' , (ev)=>{
    // console.log("egeg");
    b = true;
});

fbun.onclick = function() {
    // console.log("heh");
    var x = document.getElementById("video_file").value;
    var y = document.getElementById("audio_file").value;
    var z = document.getElementById("drop-menu").value;
    // console.log(x);

    var check_a = false;
    var check_b = false;

    if (a==true || x!='') {
        check_a = true;
    }

    if (b==true || y!='') {
        check_b = true;
    }
    

    if (check_a==false || check_b==false || z=='') {
        alert("Fill Required Fields");
    }
    else {

        var vid_ex = "";

        if (x=='') {
            vid_ex = 'mp4';
        }else {
            vid_ex = x.split('.')[1];
        }

        aud_ex = "";

        if (y=='') {
            aud_ex = 'mp3';
        }
        else {
            aud_ex = y.split('.')[1];
        }

        console.log(vid_ex,aud_ex,z);

        document.getElementById("main-page").style.display='none';
        document.getElementById("loading").style.display='block';
        // window.location.href = "processing";

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Access-Control-Allow-Origin" , "*");
        myHeaders.append("Access-Control-Allow-Credentials" , true);
        

        var raw = JSON.stringify({
            "vid": vid_ex,
            "aud": aud_ex,
            "emo": z
        });

        var data = new FormData();
        data.append("vid", vid_ex);
        data.append("aud", aud_ex);
        data.append("emo", z);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            // body: data,
            body: raw,
            // redirect: 'follow',
            // mode: 'no-cors'
        };

        
        fetch("/emo/generate_result" , requestOptions)
        .then(res => {
            if (res.ok) {
                // console.log(res , typeof(res));
                
                // res.text().then(abc => {
                //     console.log(abc);
                // })
                // console.log(res.json() , typeof(res.json()));
                return res.json();
                // return res.text();
            }else {
                alert("Wrong Doing");
            }
            
            // return res.json();
        })
        .then(resJ =>{
            console.log(resJ);
            // console.log(resJ.json());
            if (resJ=='error') {
                console.log('error');
                var new_url = 'errorPage';
                window.location.href = new_url;
            }
            else {
                console.log('success')
                var new_url = 'syncInput?emotion=' + encodeURIComponent(resJ);
                window.location.href = new_url;
            }
            
            
        })
        .then(function() {
            // window.location.href = "syncInput";

        })

    }

    
}