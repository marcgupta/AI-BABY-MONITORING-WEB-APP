img = "";
status = "";
objects = [];
song = "";

function preload() {

    song = loadSound("myalarm.mp3");

}
function setup() {
canvas = createCanvas(500,380);
canvas.center();
video = createCapture(VIDEO);
video.size(500,380);
video.hide();

}


function start(){

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";

}

function draw(){
image(video,0,0,500,380);


if(status != ""){
    objectDetector.detect(video, gotResult);
for (i = 0; i < objects.length; i++){

document.getElementById("status").innerHTML = "Status : Object Detected";

fill(0,0,0);
percent = floor(objects[i].confidence * 100);
text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
noFill()
stroke(0,0,0);
rect(objects[i].x, objects[i].y, objects[i].width , objects[i].height);

if(objects[i].label == "person")
          {
            document.getElementById("number").innerHTML = "Baby Found";
            song.stop();
          }
          else
          {
            document.getElementById("number").innerHTML = "Baby Not Found"; 
            song.play();
          }
         }

}

}




function modelLoaded() {

console.log("Model Loaded!");
status = true;
objectDetector.detect(video, gotResult);

}

function gotResult(error, results){

if(error) {
    console.error();
}
console.log(results);
objects = results;
}