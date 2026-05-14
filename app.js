/*je dois me localiser :
navigator.geolocation.getCurrentPosition ((coord) => {
    console.log(coord)
    let latitude = coord.coords.latitude
    let longitude = coord.coords.longitude
})
*/
let latitude = 45.42756
let longitude = 4.4165





let url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m&current=temperature_2m,weather_code`

	fetch(url)
	.then(rep=>{
			return rep.json()
	})
	.then(data=>{
			// a ce niveau on devrait avoir dans la console les infos de météo pour Saint Etienne ! on teste ?
			console.log(data)
            afficheTempsDuJour(data.current.weather_code, data.current.temperature_2m)

            //changer l'arriere plan
            bodyImage(data.current.weather_code)

            //affiche le temps des jours suivant 
            afficheAutreJ(data.daily)

          
	})

// role : affiche de temp et temperature du j
// dans la div avec la class current 
// parametre : temp et temperature 
// return : rien

function afficheTempsDuJour(code,temperature){
    document.querySelector(".current").innerHTML =`
                <div class="picto-weather picto-${transformerCodeEnMot(code)}"></div>
                <p class="tmax">${temperature}°C</p>
    `
}

//  role : transfomer le code en api en un mot 
// paramatre : le code 
// return : le mot 

function transformerCodeEnMot(code){

	if(code == 0){
		// clear sky
		return "sun"
	}else if(code >=1 && code < 45 ){
		// partialy cloudy
		return "suncloud"
	}else if(code >=45 && code < 61){
		// foggy & cloudy
		return "cloud"
	}else if((code >=61 && code < 71) ||(code >=80 && code < 85) ){
		// Rainy
		return "rain"
	}else if((code >=71 && code < 77) || (code>= 85 && code<95 )){
		// snow
		return "snow"
	}else if(code>95){
		// thunder
		return "thunder"
	}else{
		return "coucou"
	}
}

// role : de donner au body la classe css pour afficher l'arrier plan 
// parametre : code 
// return : rien 

function bodyImage (code){
    let nomDeClasse = "bg-weather-" + transformerCodeEnMot(code)
    document.querySelector("body").classList.add (nomDeClasse)
}



// role : construire petites cartes pour les temp des j suivant dans la class carousel-daily-container
// parametre : meteo du jour , un object
// return : non car elle affiche 

function afficheAutreJ(meteoDesJour){
    let template = ""
    for (let i=1; i<7;i++){

        //j'utilise i pour me balader dans les tableaux
        template +=`<div class="dayly-weather">
                    <h4>${meteoDesJour.time[i]}</h4>
                    <div class="minipicto minipicto-${transformerCodeEnMot(meteoDesJour.weather_code[i])}"></div>
                    <h3 class="tmax">${meteoDesJour.temperature_2m_max[i]}°C</h3>
                    <h3 class="tmin">${meteoDesJour.temperature_2m_min[i]}°C</h3>  
                </div>`

    }

    document.querySelector(".carousel-daily-container").innerHTML = template
}