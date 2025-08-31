import { hqsLib } from "./hqsLib.js"
let books = hqsLib.loadHQs()
const botaoIniciar = document.getElementById("botaoIniciar")
const botaoListar = document.getElementById("botaoListar")
const botaoAdd = document.getElementById("botaoAdd")
const botaoUpd = document.getElementById("botaoUpd")
const botaoRemove = document.getElementById("botaoRemove")
const botaoListaPorAutor = document.getElementById("botaoListaPorAutor")
const outPut = document.getElementById("saida")
const botaoListaPorCategoria = document.getElementById("botaoListaPorCategoria")
const botaoPesquisaHQ = document.getElementById("botaoPesquisaHQ")

const iniciar = () => {
    outPut.className = '';
    const lista = hqsLib.reset1
    books = lista
    outPut.textContent = "Quadrinhos carregados com sucesso! Total: " + lista.length
}

botaoIniciar.addEventListener("click", iniciar)

const listarHQs = () => {
    outPut.className = '';
    outPut.innerHTML = hqsLib.printar(books)
}

botaoListar.addEventListener("click", listarHQs)

const saidaAdicionaHQ = () => {
    outPut.className = '';
    outPut.innerHTML = `
        <label for="idIN">ID:</label>
        <input type="number" id="idIN"></input>

        <label for="tituloIN">Título:</label>
        <input type="text" id="tituloIN"></input>

        <label for="autorIN">Autor:</label>
        <input type="text" id="autorIN"></input>

        <label for="anoIN">Ano:</label>
        <input type="number" id="anoIN"></input>

        <label for="categoriaIN">Categoria:</label>
        <input type="text" id="categoriaIN"></input>

        <button id="adicionarButtonC">Adicionar</button>

        `
    const adicionaFunc = () => {
        const id_ = Number(document.getElementById("idIN").value)
        if (hqsLib.comparar(id_, books) !== 0) {return outPut.innerHTML = "Já existe esse ID!"}
        const l = [{ 
             id: id_,
             titulo: document.getElementById("tituloIN").value,
             autor: document.getElementById("autorIN").value, 
             ano: Number(document.getElementById("anoIN").value), 
             categoria: document.getElementById("categoriaIN").value
            }]
        const novaLista = hqsLib.add(books, l)
        books = hqsLib.SaveHQs(novaLista)
    outPut.innerHTML = "HQ ADICIONADA!"
    }
    document.getElementById("adicionarButtonC").addEventListener("click", adicionaFunc)
}

botaoAdd.addEventListener("click", saidaAdicionaHQ)

const saidaAtualizaHQ = () => {
    outPut.className = '';
    outPut.innerHTML = `
        <label for="idIN">ID:</label>
        <input type="number" id="idIN"></input>

        <label for="tituloIN">Novo título:</label>
        <input type="text" id="tituloIN"></input>

        <label for="autorIN">Novo autor:</label>
        <input type="text" id="autorIN"></input>

        <label for="anoIN">Novo ano:</label>
        <input type="number" id="anoIN"></input>

        <label for="categoriaIN">Nova categoria:</label>
        <input type="text" id="categoriaIN"></input>

        <button id="atualizarButtonC">Atualizar</button>
        `
    const atualizaFunc = () => {
        const id_ = Number(document.getElementById("idIN").value)
        if (hqsLib.comparar(id_, books) === 0) {return outPut.innerHTML = "Não existe esse ID!"}
        const l = { 
             id: id_,
             titulo: document.getElementById("tituloIN").value,
             autor: document.getElementById("autorIN").value, 
             ano: Number(document.getElementById("anoIN").value), 
             categoria: document.getElementById("categoriaIN").value
            }
        const listaAtualizada = hqsLib.update(books, id_, l)
        books = hqsLib.SaveHQs(listaAtualizada)
        outPut.innerHTML = "LISTA ATUALIZADA!"
    }
    document.getElementById("atualizarButtonC").addEventListener("click", atualizaFunc)
}

botaoUpd.addEventListener("click", saidaAtualizaHQ)

const saidaRemoveHQ = () => {
    outPut.className = '';
    outPut.innerHTML = `
    ID: <input type="number" id="idIN"></input>
    <button id="removeButtonC">Remover</button>`
    const removeFunc = () => {
        const id_ = Number(document.getElementById("idIN").value)
        if (hqsLib.comparar(id_, books) === 0) {return outPut.innerHTML = "Não existe esse ID!"}
        const listaRemovida = hqsLib.deletar(books, id_)
        books = hqsLib.SaveHQs(listaRemovida)
        outPut.innerHTML = "HQ REMOVIDA!"
    }
    document.getElementById("removeButtonC").addEventListener("click", removeFunc)
}

botaoRemove.addEventListener("click", saidaRemoveHQ)

const listaPorAutor = () => {
    outPut.className = '';
    outPut.innerHTML = `
    Autor: <input type="text" id="autorINPUT"></input>
    <button id="pesquisaButtonC">Pesquisar</button>`
    const listaFunc = () => {
        const autor_ = document.getElementById("autorINPUT").value
        const listaPesquisada = books.filter(hq => hqsLib.listarauthor(autor_, hq.autor))
        outPut.innerHTML = hqsLib.printar(listaPesquisada)
    }
    document.getElementById("pesquisaButtonC").addEventListener("click", listaFunc)
}

botaoListaPorAutor.addEventListener("click", listaPorAutor)

const listaPorCategoria = () => {
    outPut.className = '';
    outPut.innerHTML = `
    Categoria: <input type="text" id="categoriaINPUT"></input>
    <button id="pesquisaButtonC">Pesquisar</button>`
    const listaFunc = () => {
        const categoria_ = document.getElementById("categoriaINPUT").value
        const listaPesquisada = books.filter(hq => hqsLib.categorias(categoria_, hq.categoria))
        outPut.innerHTML = hqsLib.printar(listaPesquisada)
    }
    document.getElementById("pesquisaButtonC").addEventListener("click", listaFunc)
}

botaoListaPorCategoria.addEventListener("click", listaPorCategoria)

const pesquisaHQoutPut = () => {
    outPut.className = '';
    outPut.innerHTML = `
    <label for="pesquisaIN">Nome da obra:</label>
    <input type="text" id="pesquisaIN"></input>
    <button id="pesquisarWebButton">Pesquisar</button>
    `
    const pesquisaHQ = () => {
        const nomePesquisar = document.getElementById("pesquisaIN").value
        fetch(`https://api.jikan.moe/v4/manga?q=${nomePesquisar}`)
        .then(res => res.json())
        .then(dados => {
            const hq = dados.data[0]
            const imagem = hq.images.jpg.image_url
            const nome = hq.title
            const year = hq.published.from.slice(0, 4)
            const genero = hq.genres.map(x => x.name).join(", ")
            const autor = hq.authors.map(x => x.name).join("; ")
            outPut.className = 'modo-resultado'
            outPut.innerHTML = `
            <img src="${imagem}"></img>
            <h2>${nome}<br>Ano: ${year}<br>Categoria: ${genero}<br>Autor: ${autor}</h2>
            <button id="addListM">Adicionar</button>
            `
            const id_ = books.length + 1  
            console.log(hq)
            const newHQ = [{id: id_, titulo: nome, autor: autor, ano: year, categoria: genero}]
            const newList = hqsLib.add(books, newHQ)
            document.getElementById("addListM").addEventListener("click", () => {
                books = hqsLib.SaveHQs(newList)
            })
        })
        .catch(err => {
            outPut.innerHTML = "Quadrinho não encontrado"
        }
        )}
    document.getElementById("pesquisarWebButton").addEventListener("click", pesquisaHQ)
}

botaoPesquisaHQ.addEventListener("click", pesquisaHQoutPut)
