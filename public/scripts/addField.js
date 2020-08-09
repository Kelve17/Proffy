//Procurar o botao
document.querySelector("#add-time").addEventListener('click', cloneField)
//quando clicar no botao

//executar accap
function cloneField(){
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true)
    const fields = newFieldContainer.querySelectorAll('input')
    fields.forEach(element => {
        element.value = ""
    });
    document.querySelector("#schedule-items").appendChild(newFieldContainer)
}
//duplicar campos

//apresentar