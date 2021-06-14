prediction1="";
prediction2="";
Webcam.set({
    height:300,
    width:350,
    image_format:"png",
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach("#camera");
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="capture_image" src="'+data_uri+'"/>';
    });
    
}
console.log("ml5 version-",ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/K8XfDPgkA/model.json",model_loaded);
function model_loaded(){
    
    console.log("model is loaded");
}

function speech(){ 
    synth=window.speechSynthesis; 
    speak1="first prediction is"+prediction1; 
    speak2="and the second prediction is"+prediction2; 
    utter=new SpeechSynthesisUtterance(speak1+speak2); 
    synth.speak(utter); 
} 

function check(){
     img=document.getElementById("capture_image"); 
     classifier.classify(img,gotResult); 
    
    } 
    
    function gotResult(error,result){
         if(error)
         { 
             console.error(error); 
            }
             else{
                  console.log(result);
                   document.getElementById("result_name").innerHTML=result[0].label; 
                   document.getElementById("result_name2").innerHTML=result[1].label; 
                   prediction1=result[0].label; 
                   prediction2=result[1].label; 
                   speech(); 
                   
                if(result[0].label=="happy") 
                   { 
                       document.getElementById("result_emoji").innerHTML="&#128522;" 
                    } 
                if(result[0].label=="sad") {
                         document.getElementById("result_emoji").innerHTML="&#128532;" 
                } 
                if(result[0].label=="angry") { 

                        document.getElementById("result_emoji").innerHTML="&#128545;" 
                }
                
                 if(result[1].label=="happy") 
                { 
                        document.getElementById("result_emoji2").innerHTML="&#128522;" 
                } 
                if(result[1].label=="sad") {
                        document.getElementById("result_emoji2").innerHTML="&#128532;" 
                } 
                if(result[1].label=="angry") { 
     
                        document.getElementById("result_emoji2").innerHTML="&#128545;" 
                }
            }
        }