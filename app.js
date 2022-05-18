// Messages
const statut = document.createElement("h1")
const scoreboard=document.createElement("h3")


const emplacementH3=document.querySelector("#scoreboard")
const emplacementH1=document.querySelector("#message")

// On met en place les écouteurs d'évènements
        //Bouton Demarer jeux
document.querySelector("#start").addEventListener("click", start)
        //Bouton des cases Rouge
document.querySelectorAll(".rouge").forEach(cellule => cellule.addEventListener("click",gestionClicCaseRouge))
        //Bouton des autres cases
document.querySelectorAll(".case").forEach(cell => cell.addEventListener("click", gestionClicCase))
        //Bouton de Direction
document.getElementById('Nord').addEventListener("click",deplacementNord)
document.getElementById('Sud').addEventListener("click",deplacementSud)
document.getElementById('Est').addEventListener("click",deplacementEst)
document.getElementById('Ouest').addEventListener("click",deplacementOuest)
document.getElementById('Nord-Est').addEventListener("click",deplacementNordEst)
document.getElementById('Nord-Ouest').addEventListener("click",deplacementNordOuest)
document.getElementById('Sud-Est').addEventListener("click",deplacementSudEst)
document.getElementById('Sud-Ouest').addEventListener("click",deplacementSudOuest)
        //Recupère une liste des input
const listInput=document.querySelectorAll('input')

//Generation de la grille
function start(){
    
    const nombreAleatoire=nombreMax =>
    Math.trunc(Math.random() * nombreMax +1)
    const importerGrille = async() => {
        //recuperer fichier json et creer un objet a partir du fichier json
        const grilles= await fetch('grille.json')
        .then(reponse => {
            if(reponse.ok===true){
               return reponse.json()
            }
            else{
                return Promise.reject('Fichier pas trouvé')
            }
        })
    
        // Choisir aleatoirement si on veut mettre  d'autre grille dans le fichier json
        const numeroGrille=nombreAleatoire(grilles.length)
        const golf=grilles[numeroGrille-1]
        const grille=golf.grille
        
        //Parcourir les lignes et les colonnes du tableau
        for(let ligne=0; ligne<8;ligne+=1){
            for(let col=0; col<20;col+=1){
                const valeur=grille[ligne][col]
                if(valeur!=null){
                    const identifiant='case'+ligne+'-'+col
                    const input=document.getElementById(identifiant)
                    //ajouter valeur au champ
                    input.value=valeur
    
                }
    
            }
        }
    
    }
    
    importerGrille();
  
    
    //Script qui colore les rouges et le T
    document.getElementById('case2-0').style.background='red'
    document.getElementById('case2-1').style.background='red'
    document.getElementById('case2-2').style.background='red'
    
    document.getElementById('case3-0').style.background='red'
    document.getElementById('case3-1').style.background='red'
    document.getElementById('case3-2').style.background='red'
    
    document.getElementById('case4-0').style.background='red'
    document.getElementById('case4-1').style.background='red'
    document.getElementById('case4-2').style.background='red'
    
    document.getElementById('case3-17').style.background='blue'
    
    //Affichage message
    statut.innerHTML="Veuillez cliquer sur l'une des cases en rouge"
    emplacementH1.appendChild(statut)
    scoreboard.innerHTML="Nombre de coups: 0"
    emplacementH3.appendChild(scoreboard)
  
    }
    
    
    
//Gestion clic sur les case rouge(permet de choisir une position de depart)
 let tmp=0

 function gestionClicCaseRouge(){
     var rouge=this.id;
     var nbDep=this.value

     //condition pour que l'utilisateur selectionne une fois
     if(tmp<1){
         document.getElementById(rouge).style.background=""
         document.getElementById(rouge).className="Joueur"
         statut.innerHTML="Vous pouvez deplacer de "+nbDep+" case, Veuillez choisir votre direction"
         emplacementH1.appendChild(statut)
         tmp+=1
     }
     afficheBoutonDirection()
     AffichageDrapeau() 
 }
 
//Gestion des clic sur les autre case
function gestionClicCase(){
   var nbDep=this.value;
   alert("Sur cette position, vous pouvez deplacer de "+nbDep+" case")
}

//Affiche les bouton de direction possible
function afficheBoutonDirection(){
    document.getElementById("Nord-Ouest").innerHTML='<input type="button" value="↖"/>';
    document.getElementById("Nord").innerHTML='<input type="button" value="↑"/>';
    document.getElementById("Nord-Est").innerHTML='<input type="button" value="↗"/>';
    document.getElementById("Ouest").innerHTML='<input type="button" value="←"/>';
    document.getElementById("Centre").style.visibility="hidden"
    document.getElementById("Est").innerHTML='<input type="button" value="→"/>';
    document.getElementById("Sud-Ouest").innerHTML='<input type="button" value="↙"/>';
    document.getElementById("Sud").innerHTML='<input type="button" value="↓"/>';
    document.getElementById("Sud-Est").innerHTML='<input type="button" value="↘"/>';
}

//Fonction des 8 direction
    
function deplacementNord(){
var listeInput = document.querySelectorAll("input");
var count = listeInput.length-9;
const l=20
//Instruction qui deplace le joueur vers le nord
for(var i = 0; i < count; i++){
    if(listInput[i].className=="Joueur"){
        var a=Math.trunc(i/l)
        var d=listInput[i].value
            if(d<=a){
                listeInput[i-(l*d)].style.background="orange"
                listeInput[i-(l*d)].className="Joueur"
                listeInput[i-(l*d)].name="coups"
                statut.innerHTML="Vous pouvez deplacer de "+listeInput[i].value+" case, Veuillez choisir votre direction"
                listInput[i].className=""
                listInput[i].style.background=""
                for(var i = 0; i < count; i++){
                    let par=0
                    if(listInput[i].className=="Joueur"){
                            var posArrivE=listInput[i].value
                            let coup=0
                            //Pour incrementer le nb coups
                            for(var i = 0; i < count; i++){
                                if(listInput[i].name=="coups"){
                                    coup=coup+1
                                }
                            scoreboard.innerHTML="Nombre de coups:"+coup
                            //Tester si le joueur atteint le Trou
                            if(posArrivE=="T"){
                                statut.innerHTML="Perdu ! Le par est dépassé..."
                                const par=6
                                let coups=0
                                //Verifie si le joueur a gagné
                                for(var i = 0; i < count; i++){
                                    if(listInput[i].name=="coups"){
                                        coups=coups+1
                                    }
                                }
                                if(coups<par){
                                   statut.innerHTML="Felicitation, vous avez gagnez"
                                }
                            }
                            else {
                                statut.innerHTML="Vous pouvez deplacer de "+posArrivE+" case, veuillez choisir votre direction" 
                            }  
                        }
                    }
                }

                }
            else{
                statut.innerHTML="Deplacement impossible, veuillez choisir autre direction"
            }
                
        }
    }

}

function deplacementSud(){
var listeInput = document.querySelectorAll("input");
var count = listeInput.length-9;
const l=20
//Instruction qui deplace le joueur vers le nord
for(var i = 0; i < count; i++){
    if(listInput[i].className=="Joueur"){
        var a=Math.trunc(i/l)
        var d=listInput[i].value
            if((i+(l*d))<160){
                listeInput[i+(l*d)].style.background="orange"
                listeInput[i+(l*d)].className="Joueur"
                listeInput[i+(l*d)].name="coups"
                statut.innerHTML="Vous pouvez deplacer de "+listeInput[i].value+" case, Veuillez choisir votre direction"
                listInput[i].className=""
                listInput[i].style.background=""
                for(var i = 0; i < count; i++){
                    let par=0
                    if(listInput[i].className=="Joueur"){
                            var posArrivE=listInput[i].value
                            let coup=0
                            //Pour incrementer le nb coups
                            for(var i = 0; i < count; i++){
                                if(listInput[i].name=="coups"){
                                    coup=coup+1
                                }
                            scoreboard.innerHTML="Nombre de coups:"+coup
                            //Tester si le joueur atteint le Trou
                            if(posArrivE=="T"){
                                statut.innerHTML="Perdu ! Le par est dépassé..."
                                const par=6
                                let coups=0
                                //Verifie si le joueur a gagné
                                for(var i = 0; i < count; i++){
                                    if(listInput[i].name=="coups"){
                                        coups=coups+1
                                    }
                                }
                                if(coups<par){
                                   statut.innerHTML="Felicitation, vous avez gagnez"
                                }
                            }
                            else {
                                statut.innerHTML="Vous pouvez deplacer de "+posArrivE+" case, veuillez choisir votre direction" 
                                
                            }  
                        }
                    }
                }

                }
            
            else{
                statut.innerHTML="Deplacement impossible, veuillez choisir autre direction"
            }
                
        }
    }
    
                    
}

function deplacementOuest(){
var listeInput = document.querySelectorAll("input");
var count = listeInput.length-9;
const l=20
//Instruction qui deplace le joueur vers le nord
for(var i = 0; i < count; i++){
    if(listInput[i].className=="Joueur"){
        var a=Math.trunc(i/l)
        var d=listInput[i].value
            if((i-d)>=(l*a)){
                listeInput[i-d].style.background="orange"
                listeInput[i-d].className="Joueur"
                listeInput[i-d].name="coups"
                statut.innerHTML="Vous pouvez deplacer de "+listeInput[i].value+" case, Veuillez choisir votre direction"
                listInput[i].className=""
                listInput[i].style.background=""
                for(var i = 0; i < count; i++){
                    let par=0
                    if(listInput[i].className=="Joueur"){
                            var posArrivE=listInput[i].value
                            let coup=0
                            //Pour incrementer le nb coups
                            for(var i = 0; i < count; i++){
                                if(listInput[i].name=="coups"){
                                    coup=coup+1
                                }
                            scoreboard.innerHTML="Nombre de coups:"+coup
                            //Tester si le joueur atteint le Trou
                            if(posArrivE=="T"){
                                statut.innerHTML="Perdu ! Le par est dépassé..."
                                const par=6
                                let coups=0
                                //Verifie si le joueur a gagné
                                for(var i = 0; i < count; i++){
                                    if(listInput[i].name=="coups"){
                                        coups=coups+1
                                    }
                                }
                                if(coups<par){
                                   statut.innerHTML="Felicitation, vous avez gagnez"
                                }
                            }
                            else {
                                statut.innerHTML="Vous pouvez deplacer de "+posArrivE+" case, veuillez choisir votre direction" 
                            }  
                        }
                    }
                }

                }
            else{
                statut.innerHTML="Deplacement impossible, veuillez choisir autre direction"
            }
                
        }
    }

}

function deplacementEst(){
    var listeInput = document.querySelectorAll("input");
    var count = listeInput.length-9;
    const l=20
    //Instruction qui deplace le joueur vers le nord
    for(var i = 0; i < count; i++){
        if(listInput[i].className=="Joueur"){
            var a=Math.trunc(i/l)
            var d=listInput[i].value
                if((i+(1*d))<=(a*l+19)){
                    listeInput[(i+(1*d))].style.background="orange"
                    listeInput[(i+(1*d))].className="Joueur"
                    listeInput[(i+(1*d))].name="coups"
                    statut.innerHTML="Vous pouvez deplacer de "+listeInput[i].value+" case, Veuillez choisir votre direction"
                    listInput[i].className=""
                    listInput[i].style.background=""
                    for(var i = 0; i < count; i++){
                        let par=0
                        if(listInput[i].className=="Joueur"){
                                var posArrivE=listInput[i].value
                                let coup=0
                                //Pour incrementer le nb coups
                                for(var i = 0; i < count; i++){
                                    if(listInput[i].name=="coups"){
                                        coup=coup+1
                                    }
                                scoreboard.innerHTML="Nombre de coups:"+coup
                                //Tester si le joueur atteint le Trou
                                if(posArrivE=="T"){
                                    statut.innerHTML="Perdu ! Le par est dépassé..."
                                    const par=6
                                    let coups=0
                                    //Verifie si le joueur a gagné
                                    for(var i = 0; i < count; i++){
                                        if(listInput[i].name=="coups"){
                                            coups=coups+1
                                        }
                                    }
                                    if(coups<par){
                                       statut.innerHTML="Felicitation, vous avez gagnez"
                                    }
                                }
                                else {
                                    statut.innerHTML="Vous pouvez deplacer de "+posArrivE+" case, veuillez choisir votre direction" 
                                }  
                            }
                        }
                    }
    
                    }
                else{
                    statut.innerHTML="Deplacement impossible, veuillez choisir autre direction"
                }
                    
            }
        }

}

function deplacementNordEst(){
    var listeInput = document.querySelectorAll("input");
    var count = listeInput.length-9;
    const l=20
    //Instruction qui deplace le joueur vers le nord
    for(var i = 0; i < count; i++){
        if(listInput[i].className=="Joueur"){
            var a=Math.trunc(i/l)
            var d=listInput[i].value
           
                if((i-(d*19))>=0){
                    listeInput[(i-(d*19))].style.background="orange"
                    listeInput[(i-(d*19))].className="Joueur"
                    listeInput[(i-(d*19))].name="coups"
                    statut.innerHTML="Vous pouvez deplacer de "+listeInput[i].value+" case, Veuillez choisir votre direction"
                    listInput[i].className=""
                    listInput[i].style.background=""
                    for(var i = 0; i < count; i++){
                        let par=0
                        if(listInput[i].className=="Joueur"){
                                var posArrivE=listInput[i].value
                                let coup=0
                                //Pour incrementer le nb coups
                                for(var i = 0; i < count; i++){
                                    if(listInput[i].name=="coups"){
                                        coup=coup+1
                                    }
                                scoreboard.innerHTML="Nombre de coups:"+coup
                                //Tester si le joueur atteint le Trou
                                if(posArrivE=="T"){
                                    statut.innerHTML="Perdu ! Le par est dépassé..."
                                    const par=6
                                    let coups=0
                                    //Verifie si le joueur a gagné
                                    for(var i = 0; i < count; i++){
                                        if(listInput[i].name=="coups"){
                                            coups=coups+1
                                        }
                                    }
                                    if(coups<par){
                                       statut.innerHTML="Felicitation, vous avez gagnez"
                                    }
                                }
                                else {
                                    statut.innerHTML="Vous pouvez deplacer de "+posArrivE+" case, veuillez choisir votre direction" 
                                }  
                            }
                        }
                    }
    
                    }
                else{
                    statut.innerHTML="Deplacement impossible, veuillez choisir autre direction"
                }
                    
            }
        }

}

function deplacementNordOuest(){
    var listeInput = document.querySelectorAll("input");
    var count = listeInput.length-9;
    const l=20
    //Instruction qui deplace le joueur vers le nord
    for(var i = 0; i < count; i++){
        if(listInput[i].className=="Joueur"){
            var a=Math.trunc(i/l)
            var d=listInput[i].value
           
                if((i-(d*21))>=0){
                    listeInput[(i-(d*21))].style.background="orange"
                    listeInput[(i-(d*21))].className="Joueur"
                    listeInput[(i-(d*21))].name="coups"
                    statut.innerHTML="Vous pouvez deplacer de "+listeInput[i].value+" case, Veuillez choisir votre direction"
                    listInput[i].className=""
                    listInput[i].style.background=""
                    for(var i = 0; i < count; i++){
                        let par=0
                        if(listInput[i].className=="Joueur"){
                                var posArrivE=listInput[i].value
                                let coup=0
                                //Pour incrementer le nb coups
                                for(var i = 0; i < count; i++){
                                    if(listInput[i].name=="coups"){
                                        coup=coup+1
                                    }
                                scoreboard.innerHTML="Nombre de coups:"+coup
                                //Tester si le joueur atteint le Trou
                                if(posArrivE=="T"){
                                    statut.innerHTML="Perdu ! Le par est dépassé..."
                                    const par=6
                                    let coups=0
                                    //Verifie si le joueur a gagné
                                    for(var i = 0; i < count; i++){
                                        if(listInput[i].name=="coups"){
                                            coups=coups+1
                                        }
                                    }
                                    if(coups<par){
                                       statut.innerHTML="Felicitation, vous avez gagnez"
                                    }
                                }
                                else {
                                    statut.innerHTML="Vous pouvez deplacer de "+posArrivE+" case, veuillez choisir votre direction" 
                                }  
                            }
                        }
                    }
    
                    }
                else{
                    statut.innerHTML="Deplacement impossible, veuillez choisir autre direction"
                }
                    
            }
        }
}

function deplacementSudEst(){
    var listeInput = document.querySelectorAll("input");
    var count = listeInput.length-9;
    const l=20
    //Instruction qui deplace le joueur vers le nord
    for(var i = 0; i < count; i++){
        if(listInput[i].className=="Joueur"){
            var a=Math.trunc(i/l)
            var d=listInput[i].value
           
                if(((i-21)*d)-l<160){
                    listeInput[((i-21)*d)-l].style.background="orange"
                    listeInput[((i-21)*d)-l].className="Joueur"
                    listeInput[((i-21)*d)-l].name="coups"
                    statut.innerHTML="Vous pouvez deplacer de "+listeInput[i].value+" case, Veuillez choisir votre direction"
                    listInput[i].className=""
                    listInput[i].style.background=""
                    for(var i = 0; i < count; i++){
                        let par=0
                        if(listInput[i].className=="Joueur"){
                                var posArrivE=listInput[i].value
                                let coup=0
                                //Pour incrementer le nb coups
                                for(var i = 0; i < count; i++){
                                    if(listInput[i].name=="coups"){
                                        coup=coup+1
                                    }
                                scoreboard.innerHTML="Nombre de coups:"+coup
                                //Tester si le joueur atteint le Trou
                                if(posArrivE=="T"){
                                    statut.innerHTML="Perdu ! Le par est dépassé..."
                                    const par=6
                                    let coups=0
                                    //Verifie si le joueur a gagné
                                    for(var i = 0; i < count; i++){
                                        if(listInput[i].name=="coups"){
                                            coups=coups+1
                                        }
                                    }
                                    if(coups<par){
                                       statut.innerHTML="Felicitation, vous avez gagnez"
                                    }
                                }
                                else {
                                    statut.innerHTML="Vous pouvez deplacer de "+posArrivE+" case, veuillez choisir votre direction" 
                                }  
                            }
                        }
                    }
    
                    }
                else{
                    statut.innerHTML="Deplacement impossible, veuillez choisir autre direction"
                }
                    
            }
        }
}

function deplacementSudOuest(){
    var listeInput = document.querySelectorAll("input");
    var count = listeInput.length;
    const l=20
    //Instruction qui deplace le joueur vers le nord
    for(var i = 0; i < count; i++){
        console.log(i)
        if(listInput[i].className=="Joueur"){
            var a=Math.trunc(i/l)
            var d=listInput[i].value
           
                if(((i+(d*19)))<count){
                    listeInput[(i+(d*19))].style.background="orange"
                    listeInput[((i+(d*19)))].className="Joueur"
                    listeInput[((i+(d*19)))].name="coups"
                    statut.innerHTML="Vous pouvez deplacer de "+listeInput[i].value+" case, Veuillez choisir votre direction"
                    listInput[i].className=""
                    listInput[i].style.background=""
                    for(var i = 0; i < count; i++){
                        let par=0
                        if(listInput[i].className=="Joueur"){
                                var posArrivE=listInput[i].value
                                let coup=0
                                //Pour incrementer le nb coups
                                for(var i = 0; i < count; i++){
                                    if(listInput[i].name=="coups"){
                                        coup=coup+1
                                    }
                                scoreboard.innerHTML="Nombre de coups:"+coup
                                //Tester si le joueur atteint le Trou
                                if(posArrivE=="T"){
                                    statut.innerHTML="Perdu ! Le par est dépassé..."
                                    const par=6
                                    let coups=0
                                    //Verifie si le joueur a gagné
                                    for(var i = 0; i < count; i++){
                                        if(listInput[i].name=="coups"){
                                            coups=coups+1
                                        }
                                    }
                                    if(coups<par){
                                       statut.innerHTML="Felicitation, vous avez gagnez"
                                    }
                                }
                                else {
                                    statut.innerHTML="Vous pouvez deplacer de "+posArrivE+" case, veuillez choisir votre direction" 
                                }  
                            }
                        }
                    }
    
                    }
                else{
                    statut.innerHTML="Deplacement impossible, veuillez choisir autre direction"
                }
                    
            }
        }
}


function AffichageDrapeau() {
   var img=document.createElement('img')
   img.src='media/golf-309716_1280.png'
   document.getElementById('drapeau').appendChild(img)
} 
