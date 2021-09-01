const weatherLocInput = document.querySelector("#current .weatherNav__location input"),
    weatherLocP = document.querySelector("#current .weatherNav__location p"),
    weatherLocI = document.querySelector("#current .weatherNav__location i");

weatherLocI.addEventListener("click", function(){
    weatherLocP.style.display = 'none';
    weatherLocInput.style.display = 'block';
});  

