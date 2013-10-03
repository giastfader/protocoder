/*
* Camera with trigger
* changing the values on the addCameraView method 
* will change the size and position of the view
*/ 

var camera;

//add camera 
camera = ui.addCameraView(1, 50, 50, 200, 200);

//take a picture and save it 
ui.addButton("Take pic", 0, 300, 500, 100, function() { 
    camera.takePicture("picture.png", function() {
        console.log("picture taken");
    });
});