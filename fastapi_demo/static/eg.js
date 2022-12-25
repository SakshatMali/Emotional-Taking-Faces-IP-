function capitalizeFirstLetter(str) {

    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

    return capitalized;
}

function getEmotion(str) {

    var emot = str.toUpperCase();
    emot = emot.slice(0,3);

    return emot;
}

var eg_bun = document.getElementById('final_button_eg');

eg_bun.onclick = function() {
    // console.log("heh");
    var z = document.getElementById("drop-menu").value;
    // console.log(z , getEmotion(z))

    if (z=='') {
        alert("Fill Emotion Field");
    }
    else {
        var new_url = 'syncInput_eg?emotion=' + encodeURIComponent(z);
        window.location.href = new_url;
    }
}