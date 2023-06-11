Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:100
});

camera=document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot (){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+ data_uri + '"/>';
    });
}

console.log("ml5version: ", ml5.version);
classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/ONBpZhaUy/model.json',modelLoad);
function modelLoad(){
    console.log("modelo cargado");
}

function check(){
    img=document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if (error){
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("result_object_name").innerHTML=results[0].label;
        seña=results[0].label;
        toSpeak="";
        if (seña=="genial"){
            toSpeak="Esto se ve genial";
            document.getElementById("result_object_icon").innerHTML="&#128076;";
        }
        else if (seña=="bien"){
            toSpeak="todo bien";
            document.getElementById("result_object_icon").innerHTML="&#128077;";
        }
        else if (seña=="victoria"){
            toSpeak="esa fue una victoria";
            document.getElementById("result_object_icon").innerHTML="&#9996;";
        }
        speak();
    }
}
function speak(){
    synth=window.speechSynthesis;
    speak_data=toSpeak;
    utterthis=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterthis);
}