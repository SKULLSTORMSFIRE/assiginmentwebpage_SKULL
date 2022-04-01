window.onload = () => {

    document.getElementById("wobblescreen").addEventListener("click", () => {
        // if I use this i can have a aninmated transistion to all pages, just need a button called 'wobblescreen'

        let i = 0;
        const whiteexpand = setInterval(function () {
            let incrimenttext = 'height: ' + i.toString() + '%; width: ' + i.toString() + '%';
            console.log(incrimenttext);
            document.getElementById("void").style = incrimenttext;
            i++;
            if (i > 105) {
                clearInterval(whiteexpand);
                i = 0;
                const blackexpand = setInterval(function () {
                    let incrimenttext = 'height: ' + i.toString() + '%; width: ' + i.toString() + '%';
                    console.log(incrimenttext);
                    document.getElementById("voidtwo").style = incrimenttext;
                    i++;
                    if (i > 105) {
                        clearInterval(blackexpand);

                        //var spamstring = "1000% I USED TO GIVE A FUCK ";
                        //document.getElementById('void').innerHTML.appendTo = "1000% I USED TO GIVE A FUCK ";

                        i = 0;
                        const fuck = setInterval(function () {
                            document.getElementById('voidtwo').innerHTML += '1000% I USED TO GIVE A FUCK ';
                            //also two divs called 'void' and 'voidwo' 
                            i = i + 1;
                            if (i === 150) {
                                clearInterval(fuck);
                                //set spam here
                            }
                        }, 1000);
                    }
                }, 20);
            }
        }, 20);
    }); /*here ^^^ get box to expand*/

    /* 
     document.getElementById("mybutton").addEventListener("click", () =>{
         document.getElementById("var").innerHTML = "Welcome to my website";
     });
 
     var today = new Date();
     var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
     var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
     var dateTime = date+' '+time;
     
     document.getElementById("var2").innerHTML = dateTime;*/
}