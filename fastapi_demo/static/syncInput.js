function capitalizeFirstLetter(str) {

    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

    return capitalized;
}

function getEmotion(str) {

    var emot = str.toUpperCase();
    emot = emot.slice(0,3);

    return emot;
}

window.onload = function () {
    var url = document.location.href;
    // console.log(url);

    var emotion = url.split('=')[1];

    var emot = getEmotion(emotion);

    emotion = capitalizeFirstLetter(emotion);

    document.getElementById('showEmotion').innerHTML = "Emotion - " + emotion;

    let html = document.getElementById("video_src");

    // html.src = "/static/Wav2Lip/results/result_voice.mp4";
    html.src = "/emo/static/Emotional-Talking-Faces/results/" + emot + ".mp4";
    html.type = "video/mp4";

    document.getElementById("video_player").load();
    document.getElementById("video_player").style = "block";
}