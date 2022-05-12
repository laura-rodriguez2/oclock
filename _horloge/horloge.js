$(document).ready(function() {
// Création d'une variable pour afficher les mois, et une pour les jours (en français)
var monthNames = [ "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre" ]; 
var dayNames= ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"]

// Création d'un nouvel objet Date 
var newDate = new Date();
// On extrait la date actuelle
newDate.setDate(newDate.getDate());
// On affiche la date dans l'html (avant l'horloge)
$('#Date').html(dayNames[newDate.getDay()] + " " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());

setInterval( function() {
	// On recréer un nouvel objet Date ou on extrait les secondes
	var seconds = new Date().getSeconds();
	$("#sec").html(( seconds < 10 ? "0" : "" ) + seconds);
	},1000);
	
setInterval( function() {
	// Pareil qu'au dessus mais pour les minutes
	var minutes = new Date().getMinutes();
	$("#min").html(( minutes < 10 ? "0" : "" ) + minutes);
    },1000);
	
setInterval( function() {
	// Pareil qu'au dessus mais pour les heures
	var hours = new Date().getHours();
	$("#hours").html(( hours < 10 ? "0" : "" ) + hours);
    }, 1000);
	
}); 