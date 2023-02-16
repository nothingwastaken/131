img = "";
var status = ""
objects = [];


function preload(){
    img = loadImage("dog_cat.jpg");
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: detecting objects";
}

function modelLoaded(){
    console.log("model is loaded");
    status = true;
    objectDetector.detect(video, gotResult);
}

function draw(){
    image(video, 0, 0, 380, 380);

    if (status != ""){
        r = random(225);
        g = random(225);
        b = random(225);
        objectDetector.detect(video, gotResult);

        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Object status detected";
            document.getElementById("noo").innerHTML = "number of objects detected are: " + objects.length;

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].length, objects[i].width);

        }
    }
}

function gotResult(error, results){
    if (error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}