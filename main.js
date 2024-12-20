/**
 * Um pequeno script responsavel por adquirir alguns dados de uma API e mostrar em uma página web
 * Utiliza ao máximo de funções anonimas
 * Um evento de click é adiciona em um botão para buscar o id do usuário pelo nome desejado
 * Para determinadar quais são os post de um determinado usuário é utilizado um filter, enquanto que um map adquire o titulo no seguinte formato: <li>Titulo</li>
 * Um reduce é verificado para determinar se todos os afazeres deste usuário todos realizados
 * 
 * Funções anonimas facilitam a leitura de codigo e mudam a abordagem que seria feita
 * A programação funcional também permite isolar a lógica do código
 */

const inputNome = document.getElementById("inputNome");
const filterBtn = document.getElementById("inputFilter");
const contentDiv = document.getElementById("content");
 
filterBtn.addEventListener("click", async () =>  {
    const user = await fetch("https://jsonplaceholder.typicode.com/users")
    .then(value => value.json())
    .then(value => value.find(value => value.name.toLowerCase() === inputNome.value.toLowerCase()));

    if(user) {
        const userId = user.id;
        let dataList = "<ul>";
        contentDiv.innerHTML += "<h2>Titulo dos Posts</h2>"
        const postTitles = await fetch("https://jsonplaceholder.typicode.com/posts").then(value => value.json())
        .then(values => values.filter(value => value.userId === userId))
        .then(values => values.map(value => "<li>"+value.title+"</li>"));

        postTitles.forEach(elem => {
            dataList += elem;
        });

        dataList += "</ul>";
        contentDiv.innerHTML += dataList;

        madeAllTodos = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
        .then(value => value.json())
        .then(values => values.reduce((prev, cur) => {return prev && cur.completed}, true));
        
        contentDiv.innerHTML += `<p>Fez tudo que precisava fazer? ${madeAllTodos ? "Sim" : "Não"}</p>`

    }
})