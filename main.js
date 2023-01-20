scoreLeftWrist = 0
scoreRightWrist = 0

leftwristX = 0
rightwristX = 0

leftwristY = 0
rightwristY = 0

song = 0

function preload() 
{
    song = loadSound("music.mp3")
}

function setup()
{
   canvas = createCanvas(700, 600)
   canvas.position(600, 300)

   video = createCapture(VIDEO)
   video.hide()

    posenet = ml5.poseNet(video, modelLoaded)
    posenet.on('pose', gotPoses)
}

 function gotPoses(results)
 {
    if(results.length > 0)
    {
        console.log(results)

        scoreLeftWrist = results[0].pose.keypoints[9].score 
        scoreRightWrist = results[0].pose.keypoints[10].score
        
        leftwristX = results[0].pose.leftWrist.x 
        rightwristX = results[0].pose.rightWrist.x 

        leftwristY = results[0].pose.leftWrist.y 
        rightwristY = results[0].pose.rightWrist.y
        
        // console.log("value of left wrist x is "+leftwristX)
        // console.log("value of right wrist x is "+rightwristX)
        // console.log("value of left wrist y is "+leftwristY)
        // console.log("value of right wrist y is "+rightwristY)
    }
 }

function modelLoaded() 
{
    console.log("Model has Loaded")
}

function draw() 
{
    image(video, 0, 0, 700, 600)


    if(scoreLeftWrist > 0.2)
    {
        fill("red")
        circle(leftwristX, leftwristY, 20)

        updleftwristY = Number(leftwristY)
        ndleftwristY = floor(updleftwristY)
        updVol = ndleftwristY/600
        song.setVolume(updVol)
        document.getElementById("vol").innerHTML = "Volume is "+updVol.toFixed(2 )
    }

    if(scoreRightWrist > 0.2)
    {
        fill("blue")
        circle(rightwristX, rightwristY, 20)

        if((rightwristY > 0) && (rightwristY <= 100) )
        {
            song.rate(0.5)
            document.getElementById("speed").innerHTML = "Speed: 0.5x "
        }
        else if((rightwristY > 100) && (rightwristY <=250) )
        {
            song.rate(1)
            document.getElementById("speed").innerHTML = "Speed: 1x"
        }
        else if((rightwristY > 250) && (rightwristY <= 400))
        {
            song.rate(1.5)
            document.getElementById("speed").innerHTML = "Speed: 1.5x"
        }
        else if((rightwristY > 400) && (rightwristY <= 500))
        {
            song.rate(2)
            document.getElementById("speed").innerHTML = "Speed: 2x"
        }
        else if(rightwristY > 500)
        {
            song.rate(2.5)
            document.getElementById("speed").innerHTML = "Speed: 2.5x"
        }
    }

    
   


}

function songp() 
{
    song.play()
    song.setVolume(1)
    song.rate(1)
}