window.onload = () => {
    document.getElementById("emailbutton").addEventListener("click", (e) => {
        document.getElementById("errortxt").innerHTML ="";

        let name = document.getElementById("name").value;
        if (validate_name(name) === false) {
            console.log("NAME MUST HAVE CAPITLISED LETTERS FOR STARTS OF WORDS AND EACH NAME MUST BE BETWEEN 3 AND 32 CHARACTERS LONG")
            document.getElementById("errortxt").innerHTML = "NAME MUST HAVE CAPITLISED LETTERS FOR STARTS OF WORDS AND EACH NAME MUST BE BETWEEN 3 AND 32 CHARACTERS LONG";
        }

        let email = document.getElementById("email").value;
        if (validate_email(email) === false) {
            console.log("MUST BE IN VAILD EMAIL FORMAT")
            document.getElementById("errortxt").innerHTML = "MUST BE IN VAILD EMAIL FORMAT";
        }

        e.preventDefault();

        const url = "http://mudfoot.doc.stu.mmu.ac.uk/node/api/mailinglist";
        const data = {
            "name": name,
            "email": email
        };

        console.log(data);
        if (validate_email(email) === true && validate_name(name) === true) {
            fetch(url, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then((response) => {
                    if (response.status === 200) {/* might meed to be 201*/
                        return response.json();
                    } else if (response.status === 400) {
                        throw "Bad data sent to the server";
                    } else {
                        throw "Something went wrong";
                    }
                })
                .then((resJson) => {
                    alert(resJson["name"] + " has been added");
                })
                .catch((error) => {
                    alert(error);
                })
        }
    });
};

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

const validate_email = (email) => {
    let isvalid = true;
    let re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email === null || email === "" || typeof email !== "string") {
        isvalid = false;
    }
    if (re.test(email) === false) {
        isvalid = false;
    }
    return isvalid;
}