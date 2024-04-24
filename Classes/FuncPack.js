function MudarAba(qualaba){
    switch (qualaba) {
        case "l":
            document.getElementById("h1_main").innerHTML = "LIVROS"

            break;

        case "c":
            document.getElementById("h1_main").innerHTML = "CLIENTES"

            break;

        case "f":
            document.getElementById("h1_main").innerHTML = "FUNCIONÁRIOS"

            break;
    
        default:
            break;
    }
}

function MostrarDados(){

}

export{MudarAba, MostrarDados}
