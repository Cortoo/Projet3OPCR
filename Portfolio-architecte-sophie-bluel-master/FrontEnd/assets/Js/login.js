let emailInput = document.querySelector("#email");
let passwordInput = document.querySelector("#password");
let form = document.querySelector("form");

//Envoi des données du formulaire
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const user = {
        email: emailInput.value,
        password: passwordInput.value,
    };
    
    
        fetch(`${url}users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(user),
    })
        // Affichage des messages d'erreurs
        .then((response) => {
            if (!response.ok) {
                let ExistingErrorContainer =
                    document.querySelector(".error_container");
                if (ExistingErrorContainer) {
                    form.removeChild(ExistingErrorContainer);
                }

        // Création du conteneur des erreurs
                const errorContainer = document.createElement("div");
                errorContainer.classList.add("error_container");
                const connexionInput = form.querySelector(
                    'input[type="submit"]'
                );
                form.insertBefore(errorContainer, connexionInput);


                //to do 1 seul erreur : Erreur dans l’identifiant ou le mot de passe   else : 
                if (response.status === 404 || response.status === 401) {
                    errorContainer.innerText =
                        "Erreur dans l’identifiant ou le mot de passe";
                }
                else {
                    errorContainer.innerText =
                        "Erreur interne";
                }
               
            } else {
                return response.json();
            }
        })

        //Stockage des userId et token puis go homepage
        .then((data) => {
            sessionStorage.setItem("token", data.token);
            document.location.href = "index.html";
        })
        .catch((error) => {
            console.log(error);
        });

     
});

