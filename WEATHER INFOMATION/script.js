var key="f6efb4d1aa9ee600c5e3784f8e55e592";

function weatherinfo(lat,lon){//날씨 정보 받아오기

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var myObj = JSON.parse(this.response);
                
                //날씨정보 저장, 출력
                var userlo = document.createElement("span");
                var p1=document.createElement("p");
                var p2=document.createElement("p");
                var wimg=document.createElement("img");

                userlo.innerText="위도 : "+lat.toFixed(7)+"\n경도 : "+lon.toFixed(7);
                p1.innerText="현재날씨 : "+myObj.weather[0].main+"("+myObj.weather[0].description+")";
                p2.innerText="현재온도 : "+(myObj.main.temp-273.15).toFixed(0);
                wimg.src = ("http://openweathermap.org/img/w/"+myObj.weather[0].icon+".png");

                document.querySelector("#geolo").appendChild(userlo);
                document.querySelector("#wbox").appendChild(wimg);
                document.querySelector("#wbox").appendChild(p1);
                document.querySelector("#wbox").appendChild(p2);
                
            }
        };
        xmlhttp.open("GET", "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&APPID="+key, true);
        xmlhttp.send();

}

function onGeolocationSuccess(position) { 

    var latitude  = position.coords.latitude;//위도
    var longitude = position.coords.longitude;//경도
  
    weatherinfo(latitude,longitude);
} 
function onGeolocationFail(error) { 
    
    document.querySelector("body").innerText = "Error Code: " + error.code + ", Error Description: " + error.message;
} 

if (navigator.geolocation) { 

    var positionOptions = { 
        enableHighAccuracy	: true, 
        maximumAge	: 0, 
        timeout	: 3000 
    }; 
        
    navigator.geolocation.getCurrentPosition(onGeolocationSuccess, onGeolocationFail, positionOptions); 
}
