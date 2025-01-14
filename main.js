status = "";
objects = [];
input_text = "";
function setup()
{
    canvas = createCanvas(480 ,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}
function draw()
{
    image(video , 0 , 0 , 480 , 380 );
    if(status != "")
    {
        objectDetector.detect(video , gotResult);
        for(i = 0 ; i < objects.length ; i++)
        {
            document.getElementById("status").innerHTML = "status : objects detected";
            console.log(objects.length);
            
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i]. y + 15 );
            noFill();
            stroke("#FF0000");
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
            if(objects[i].label == input_text)
                {
                    video.stop();
                    objectDetector.detect(gotResult);
                    document.getElementById("number_of_objects").innerHTML = input_text + "Found";
                    var synth = window.speechSynthesis;
                    var utterThis = new SpeechSynthesisUtterance(input_text + "found");
                    synth.speak(utterThis);
                }
                else
                {
                    document.getElementById("number_of_objects").innerHTML = input_text + "NotFound";
                }
        }
    }
}
function gotResult(error , result)
{
    if(error)
        {
            console.log(error);
        }
        console.log(result);
        objects = result;
}
function start()
{
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
    input_text = document.getElementById("input").value;
}
function modelLoaded()
{
    console.log("modelLoaded");
    status = true;
}