window.onload = () => {
    /*get year from user
    const year = "2021"*/

    /* const url = "http://mudfoot.doc.stu.mmu.ac.uk/node/api/halloffame"; years 1986-2021*/

    var year = document.getElementById("year");
    var url = "http://mudfoot.doc.stu.mmu.ac.uk/node/api/halloffame?year=2021";
    document.getElementById("index").innerHTML = 0;
    getjsonfile(url);

    document.getElementById("yearchange").addEventListener("click", (e) => {
        var year = document.getElementById("year");
        var url = "http://mudfoot.doc.stu.mmu.ac.uk/node/api/halloffame?year=" + year.value;
        document.getElementById("index").innerHTML = 0;
        getjsonfile(url);
    });
    document.getElementById("nextband").addEventListener("click", (e) => {
        var year = document.getElementById("year");
        var url = "http://mudfoot.doc.stu.mmu.ac.uk/node/api/halloffame?year=" + year.value;
        getjsonfile(url);
    });
}


const validate_name = (name) => {
    let isvalid = true;
    let re = /^[A-Z][a-z\-]{2,32} [A-Z][a-z\-]{2,32}$/
    if (name === null || name === "" || typeof name !== "string") {
        isvalid = false;
    }
    if (re.test(name) === false) {
        isvalid = false;
    }
    return isvalid;
}
const getjsonfile = (url) => {
    fetch(url, {
        method: "get",
    })

        .then((response) => {
            if (response.status === 200) {/* might meed to be 201*/
                return response.json();
            } else {
                throw "Bad data sent to the server";
            }
        })
        .then((resJson) => {
            /*var jsonfile = resJson; 
            console.log(jsonfile);
            return resJson;

            /*let jo = new JSONOBJECT(response.json()); jo.get("year")*/

            document.getElementById("topyear").innerHTML = resJson["year"];

            /*console.log(resJson["data"].length);*/

            var index = document.getElementById("index").innerHTML; /*make a hidden number to track the band no and then read it in make it a number and incrment it if bigger than the list loop it*/
            /*console.log(index);*/
            if (resJson["data"].length - 2 < index) {
                index = 0;
            }
            else {
                index++;
            }
            document.getElementById("index").innerHTML = index;

            document.getElementById("band").innerHTML = resJson["data"][index.toString()]["band"]["name"];
            var link = document.getElementById("band");
            link.setAttribute("href", resJson["data"][index.toString()]["band"]["url"]);

            if (resJson["data"][index.toString()]["image"]["source"] != undefined) {
                var link = document.getElementById("bandphoto");
                link.setAttribute("src", resJson["data"][index.toString()]["image"]["source"]);
                var link = document.getElementById("bandphoto");
                link.setAttribute("style", "visibility: visible;");
            }
            else {
                var link = document.getElementById("bandphoto");
                link.setAttribute("style", "visibility: hidden;");
            }
            if (resJson["data"][index.toString()]["image"]["title"] != undefined) {
                document.getElementById("photodesciption").innerHTML = resJson["data"][index.toString()]["image"]["title"];
            }
            else{
                document.getElementById("photodesciption").innerHTML = "No Photo Avalible"
            }
            /*(console.log(resJson["data"][index.toString()]["inducted_members"])*/

            /*get the length of the list and if 0 make the element dissaper
            need a few elements(10ish) that may be invisible to make into the members*/
            for (let i = 0; i < 10; i++) {
                var link = document.getElementById("member" + i.toString());
                link.setAttribute("style", "visibility: hidden;");
            }
            if (resJson["data"][index.toString()]["inducted_members"].length != null) {
                for (let i = 0; i < resJson["data"][index.toString()]["inducted_members"].length; i++) {
                    if (i === 0) {
                        document.getElementById("member" + i.toString()).innerHTML = ("Members: " + resJson["data"][index.toString()]["inducted_members"][i.toString()]["name"] + ", ")
                    } else {
                        document.getElementById("member" + i.toString()).innerHTML = (resJson["data"][index.toString()]["inducted_members"][i.toString()]["name"] + ", ")
                    }
                    var link = document.getElementById("member" + i.toString());
                    link.setAttribute("href", resJson["data"][index.toString()]["inducted_members"][i.toString()]["url"]);
                    var link = document.getElementById("member" + i.toString());
                    link.setAttribute("style", "visibility: visible;");
                }
            }

            /*the awardee of the award (if they exist)*/
            if (resJson["data"][index.toString()]["inducted_by"]["name"] != undefined) {
                document.getElementById("awardee").innerHTML = ("Awardee: " + resJson["data"][index.toString()]["inducted_by"]["name"])
                console.log(resJson["data"][index.toString()]["inducted_by"]["name"]);
                var link = document.getElementById("awardee");
                link.setAttribute("href", resJson["data"][index.toString()]["inducted_members"]["url"]);
                var link = document.getElementById("awardee");
                link.setAttribute("style", "visibility: visible;");
            }
            else {
                var link = document.getElementById("awardee");
                link.setAttribute("style", "visibility: hidden;");
            }
            /*document.getElementById("members").innerHTML = resJson["data"][index.toString()]["inducted_members"].length;


            get all the elements and change them here and ur probaly done*/

            /*return resJson;
            console.log(resJson["data"]["0"]);
            console.log(resJson["data"]["0"]["band"]);
            console.log(resJson["data"]["0"]["band"]["name"]);
            let name = resJson["data"]["0"]["band"]["name"];
            console.log(name);
            /* look at the json file in chrome and the blue parts are the things u need to quote around
            if you do get it down to the correct bit complely u can treat it as a txt var (i think) /*
            let namearaay = resJson["data"]["0"]["band"];
            console.log(namearaay["name"]);
            /* right u can do this (^^^) and its just js having weird arrays that i dont understand,
            anyway just need to fight css and formatting again in more ways that i dont understand until it looks right,
            this is probably just a note to myself but this was figured out bc i dreamed of it and was then woken up at 4 by flat mates -_-
            wow uni is so unstress inducing*/

        })
        .catch((error) => {
            alert(error);
        })
}
