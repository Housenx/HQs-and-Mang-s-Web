// Quadrinhos iniciais ----------------------------------------------------------------------------------------------------

const quadrinhos = [
  { id: 1, titulo: "Batman: Ano Um", autor: "Miller, Frank", ano: "1987", categoria: "Action, Comedy, Mystery"},
  { id: 2, titulo: "One Piece", autor: "Oda, Eiichiro", ano: "1997", categoria: "Action, Adventure, Fantasy"},
  { id: 3, titulo: "Jujutsu Kaisen", autor: "Akutami, Gege", ano: "2018", categoria: "Action, Supernatural"},
  { id: 4, titulo: "Solo Leveling", autor: "Chugong; Jang, Sung-rak; Disciples", ano: "2018", categoria:"Action, Adventure, Fantasy"},
]

// iniciação (resetar: a lista para a original, LoadHqs: iniciação dos quadrinhos, Remove: para remover os quadrinhos da chave)

const reset = (x) => {
  localStorage.setItem('HQs', JSON.stringify(x))
  const books = localStorage.getItem('HQs')
  return books ? JSON.parse(books) : []
}

const SaveHQs = (l) => {
  localStorage.setItem('HQs', JSON.stringify(l))
  const books = localStorage.getItem('HQs')
  return books ? JSON.parse(books) : []
}

const reset1 = reset(quadrinhos)

const loadHQs = () => {
  const books = localStorage.getItem('HQs')
  return books ? JSON.parse(books) : []
}

// CRUD (Create, Read, Update, Delete) ------------------------------------------------------------------------------------

const printar = (l) => {
    const cabecalho = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Autor</th>
                <th>Ano</th>
                <th>Categoria</th>
            </tr>
        </thead>
    `
    const linhas = l.map(hq => `
        <tr>
            <td>${hq.id}</td>
            <td>${hq.titulo}</td>
            <td>${hq.autor}</td>
            <td>${hq.ano}</td>
            <td>${hq.categoria}</td>
        </tr>
    `).join('')
    return `<table class="hq-table">${cabecalho}<tbody>${linhas}</tbody></table>`;
}

const update = (l,id,l2) => l.map(x => x.id == id ? {...x,...l2} : x )

const deletar = (l,id) => l.filter(x => x.id !== id)

const listarauthor = (str, autor, atual = "") => {
  if (autor.length === 0) {
    return str === atual;
  }

  const [x, ...xs] = autor;

  if (x === ";") {
    if (str === atual) return true;
    return listarauthor(str, xs, "");
  }

  if (x === " " && atual === "") {
    return listarauthor(str, xs, atual);
  }

  return listarauthor(str, xs, atual + x);
};

const add = (l,l2) => [...l,...l2]

const categorias = (str, categoria, atual = "") => {
  if (categoria.length === 0) {
    return str === atual 
  }

  const [x, ...xs] = categoria

  if (x === " ") {
    return categorias(str, xs, atual)
  }

  if (x === ",") {
    if (str === atual) {
      return true
    }
  
    return categorias(str, xs, "")
  }

  return categorias(str, xs, atual + x)

}

// Outras Funções (usadas para comparação de codigos usados no crud e vise versa) -------------------------------------

const comparar = (id,l) => {
  const [x,...xs] = l 
  if (x == undefined) { return 0 }
  
  if (id === x.id) { return 1 + comparar(id,xs) }

  return comparar(id, xs)
}

// Exportação dos codigos para o Ui --------------------------------------------------------------------------------------

export const hqsLib = {
  loadHQs, printar,
  update, deletar, add,
  SaveHQs, reset, comparar,
  reset1, categorias, listarauthor
}
