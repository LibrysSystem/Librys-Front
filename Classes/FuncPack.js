
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

async function CriarJSONForm() {
    let objJSON = {};
    const todosinputs = [...document.querySelectorAll(".papel:not(.disabled) .input_form")];

    await Promise.all(todosinputs.map(async (el) => {
        if (el.type === "file") {

            if (el.files.length > 0) {

                const fileContents = await readFile(el.files[0]);
                objJSON[el.name] = fileContents;
            } else {
                objJSON[el.name] = null;
            }
        } else {
            objJSON[el.name] = el.value;
        }
    }));

    return objJSON;
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}


function Validar(id, enviar){
    let ok = true

    if(!enviar){
        document.getElementById(id).nextSibling.nextSibling.innerHTML = " "

        if(!document.getElementById(id).checkValidity()){
            document.getElementById(id).nextSibling.nextSibling.innerHTML = `* ${document.getElementById(id).validationMessage}`
        }
    }else if(enviar){
        const todosinputs = [...document.querySelectorAll(".papel:not(.disabled) .input_form")]
        todosinputs.map((el)=>{
            ok = (ok)&&(el.checkValidity())
        
        })

        if(ok){
            async function main() {
                const formJSON = await CriarJSONForm();
                console.log(formJSON);
                console.log(JSON.stringify(formJSON));
            }
            
            main();

            // fetch('endponit', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.parse(formSON)
            // })
            // .then(resp=>resp.json())
            // .then(rest=>{
            //     console.log(rest)
                
            // })
            return "ok"

        }else{
            alert("Preencha todos os campos do formulário corretamente!")
        }
        
    }
}

export{MudarAba, MostrarDados, Validar}

