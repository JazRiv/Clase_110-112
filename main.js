var modelo = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/IgWhCIw_v/model.json", yaquede);

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});
Webcam.attach("#camara");

function tomar_foto(){
Webcam.snap(function(datauri){
document.getElementById("resultado").innerHTML = '<img id="foto" src="' + datauri +'">';
});
}

function yaquede(){
    console.log("Ya quede listo");
}

function resultado_boton(){
    var foto = document.getElementById("foto");
    modelo.classify(foto, resultado_foto);
}

function resultado_foto(error, resultado){
if (!error){
    console.log(resultado);
    var emocion_1 = resultado[0].label;
    var emocion_2 = resultado[1].label;
    document.getElementById("emocion_1").innerText = emocion_1;
    document.getElementById("emocion_2").innerHTML = emocion_2;
    switch(emocion_1){
        case "Feliz": 
        document.getElementById("emoji_1").innerHTML = "😁";
        break;
        case "Triste":
        document.getElementById("emoji_1").innerHTML = "😢";
        break;
        case "Enojo":
        document.getElementById("emoji_1").innerHTML = "😡";
        break;
        default:break;
    }
    if (emocion_2 == "Feliz"){
        document.getElementById("emoji_2").innerHTML = "😁";
    }else if (emocion_2 == "Triste"){
        document.getElementById("emoji_2").innerHTML = "😢";
    }else if (emocion_2 == "Enojo"){
        document.getElementById("emoji_2").innerHTML = "😡";
    }
    hablar("Predicion 1 " + emocion_1 +" Predicion 2 " + emocion_2);
}
}

function hablar(mensaje){
    var leer_en_voz_alta = window.speechSynthesis;
    var lectura = new SpeechSynthesisUtterance(mensaje);
    lectura.lang = "es-MX";
    leer_en_voz_alta.speak(lectura);
}