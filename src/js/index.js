const texto = document.getElementById('toDoInput')
const btnInsert = document.querySelector('.inserir button')
const btnDeleteAll = document.querySelector('.to-do-header button')
const ul = document.getElementById('listaToDo')

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
      breakpoint: 1200,
      settings: {
        // Set to `auto` and provide item width to adjust to viewport
        slidesToShow: 4,
        slidesToScroll: 2,
      }
    },{
      breakpoint: 900,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      }
    },{
      breakpoint: 640,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      }
    },{

      breakpoint: 450,
      settings: {
        slidesToShow: 1.5,
        slidesToScroll: 1,
      }
    },{
      breakpoint: 310,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    },{
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