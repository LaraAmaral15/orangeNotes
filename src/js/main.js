const texto = document.getElementById('toDoInput')
const btnInsert = document.querySelector('.inserir button')
const btnDeleteAll = document.querySelector('.to-do-header button')
const ul = document.getElementById('listaToDo')

// ABRIR E FECHAR MENU

function abreMenu() {
  document.body.classList.add('menu-expandido')
}

function fechaMenu() {
  document.body.classList.remove('menu-expandido')
}

// CARDS

new Glider(document.querySelector('.glider'), {
  slidesToScroll: 1,
  slidesToShow: 4,
  draggable: true,
  dots: '.dots',
  arrows: {
    prev: '.glider-prev',
    next: '.glider-next'
  },

    responsive: [
    {
      // screens greater than >= 775px
      breakpoint: 1200,
      settings: {
        // Set to `auto` and provide item width to adjust to viewport
        slidesToShow: 4,
        slidesToScroll: 2,
      }
    },{
      // screens greater than >= 1024px
      breakpoint: 900,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      }
    },{
      // screens greater than >= 1024px
      breakpoint: 640,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      }
    },{
      // screens greater than >= 1024px
      breakpoint: 310,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    },{
      // screens greater than >= 1024px
      breakpoint: 0,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    }
  ]
});

// TO DO

var itensDB = []

btnDeleteAll.onclick = () => {
  itensDB = []
  updateDB()
}

texto.addEventListener('keypress', e => {
  if (e.key == 'Enter' && texto.value != '') {
    setItemDB()
  }
})

btnInsert.onclick = () => {
  if (texto.value != '') {
    setItemDB()
  }
}

function setItemDB() {
  if (itensDB.length >= 20) {
    alert('Limite máximo de 20 itens atingido!')
    return
  }

  itensDB.push({ 'item': texto.value, 'status': '' })
  updateDB()
}

function updateDB() {
  localStorage.setItem('todolist', JSON.stringify(itensDB))
  loadItens()
}

function loadItens() {
  ul.innerHTML = "";
  itensDB = JSON.parse(localStorage.getItem('todolist')) ?? []
  itensDB.forEach((item, i) => {
    insertItemTela(item.item, item.status, i)
  })
}

function insertItemTela(text, status, i) {
  const li = document.createElement('li')
  
  li.innerHTML = `
    <div class="listaToDo">
      <input type="checkbox" ${status} data-i=${i} onchange="done(this, ${i});" />
      <span data-si=${i}>${text}</span>
      <button onclick="removeItem(${i})" data-i=${i}><i class='bx bx-trash'></i></button>
    </div>
    `
  ul.appendChild(li)

  if (status) {
    document.querySelector(`[data-si="${i}"]`).classList.add('linhaRiscada')
  } else {
    document.querySelector(`[data-si="${i}"]`).classList.remove('linhaRiscada')
  }

  texto.value = ''
}

function done(chk, i) {

  if (chk.checked) {
    itensDB[i].status = 'checked' 
  } else {
    itensDB[i].status = '' 
  }

  updateDB()
}

function removeItem(i) {
  itensDB.splice(i, 1)
  updateDB()
}

loadItens()
