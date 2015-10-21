var cheerio = require("cheerio");
var request = require("request");
var express = require("express");
var app = express();

app.get('/yahoo',function(req,res){

	//var sehir_kodu="ceyhan-2343888";
	var url = 'https://weather.yahoo.com/turkey/';


	request(url,function(error,response,html){
		
		var title,sehir;
		var baslik;

		if(!error){
			var $ = cheerio.load(html);
			
			$('.weather-regions').filter(function(){
				var data = $(this);
				sehir = data.children().children().text();
				var degisecek = "Province";

				function splitString(stringToSplit, separator) {
					  var arrayOfStrings = stringToSplit.split(separator);
					  var sehirler = arrayOfStrings.join("\n");
					  for (var i = 0; i < sehirler.length; i++) {
					  	var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
					  	for (var a = 0; a < alphabet.length; a++) {
					  		 		if (alphabet[a] == sehirler[i]) {
					  		 			sehirler[i].innerHTML = "\n";
					  		 		}
					  		 	};	 	
					  };
					  res.send(sehirler);		

				}

				splitString(sehir,degisecek);
			});
			

		}else 
			console.log('hata');			
	});

});

app.listen('1313');
console.log('calisiyor');
