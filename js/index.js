const elMovieList = document.querySelector(".movie__list");
const elResult = document.querySelector(".movie__result-num");
const elForm = document.querySelector(".form__header");
const elSearch = document.querySelector(".input__search")
const elulTitle = document.querySelector(".title-ul");
const elPrevBtn = document.querySelector(".prevBtn")
const elNextBtn = document.querySelector(".nextBtn")
const elButtons = document.querySelector(".buttons")
const elError = document.querySelector(".error__title")
const elSortBtn = document.querySelector(".sort__btn")
const elTemplate = document.querySelector(".template").content;


const locolBook = JSON.parse(window.localStorage.getItem("Booksmark"))

let data
let page = 1
var num = 0
let kniga = elSearch.value
elSearch.value = null


const getBooks = async function (kniga, page) {
  const request = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${kniga}&startIndex=${(page - 1) * 10 + 1}`
  );
  data = await request.json();
  elResult.textContent = data.totalItems
  num = data.totalItems
  if (data.Response = "True") {
    renderMovies(data.items, elMovieList);
  }
  if (data.totalItems === 0) {
    elError.textContent = "Ma'lumot topilmadi"
  }
  elButtons.innerHTML = null
  renderBtn(data, elButtons)
};
getBooks(kniga, page)


elForm.addEventListener("submit", evt => {
  evt.preventDefault()
  SearchValue = elSearch.value
  getBooks(SearchValue, page)

  elSearch.value = null
})


elMovieList.addEventListener('click', evt => {
  if (evt.target.matches(".bookmarks")) {
    const bookId = evt.target.dataset.bookBtnId
    let findBook = data.items.find(item => item.id == bookId)
    if (!Booksmark.includes(findBook)) {
      Booksmark.push(findBook)
      
    }
  }
  window.localStorage.setItem("Booksmark", JSON.stringify(Booksmark))
  elulTitle.innerHTML = null
  renderbooks(Booksmark, elulTitle)
})


elulTitle.addEventListener('click', evt => {
  if (evt.target.matches(".remove")) {
    const removeId = evt.target.dataset.clearId
    const foundmark = Booksmark.findIndex(mark => mark.id === removeId)
    Booksmark.splice(foundmark, 1)
  }
  
  window.localStorage.setItem("Booksmark", JSON.stringify(Booksmark))
  elulTitle.innerHTML = null
  renderbooks(Booksmark, elulTitle)

})

let Booksmark = locolBook || []

const renderbooks = function (arr, where) {
  arr.forEach(item => {
    // CREAT ELEMENTS
    newItem = document.createElement("li")
    newDivHead = document.createElement("div")
    newDivFoot = document.createElement("div")
    newTitle = document.createElement("h3")
    newAuthor = document.createElement("h4")
    newLink = document.createElement("a")
    newClearBtn = document.createElement("button")

    // TEXT CONTENT

    newTitle.textContent = item.volumeInfo?.title
    newAuthor.textContent = item.volumeInfo?.authors?.join(",")
    newLink.textContent = "ㅤ"

    newLink.href = item.volumeInfo?.previewLink
    newClearBtn.textContent = "ㅤ"


    newClearBtn.dataset.clearId = item.id

    // SET ATTRIBUTE
    newItem.setAttribute("class", "items")
    newTitle.setAttribute("class", "bookTodoTitle")
    newAuthor.setAttribute("class", "bookTodoAuthor")
    newDivHead.setAttribute("class", "item__head")
    newDivFoot.setAttribute("class", "item__foot")
    newClearBtn.setAttribute("class", "remove")
    newLink.setAttribute("class", "link")

    // APPEND

    newDivHead.appendChild(newTitle)
    newDivHead.appendChild(newAuthor)
    newDivFoot.appendChild(newLink)
    newDivFoot.appendChild(newClearBtn)
    newItem.appendChild(newDivHead)
    newItem.appendChild(newDivFoot)
    where.appendChild(newItem)

    window.localStorage.setItem("Booksmark", JSON.stringify(Booksmark))
  })
}
renderbooks(Booksmark,elulTitle)

const renderMovies = function (arr, htmlElement) {
  const moviesFragment = document.createDocumentFragment();
  elMovieList.innerHTML = null;
  arr?.forEach((item) => {
    const clonedFilmTemplate = elTemplate.cloneNode(true);

    clonedFilmTemplate.querySelector(".book__img").src = item.volumeInfo.imageLinks?.smallThumbnail || "Ma'lumot yo'q";
    clonedFilmTemplate.querySelector(".book__title").textContent = item.volumeInfo?.title || "Ma'lumot yo'q";
    clonedFilmTemplate.querySelector(".book__author").textContent = item.volumeInfo?.authors || "Ma'lumot yo'q";
    clonedFilmTemplate.querySelector(".book__yaer").textContent = item.volumeInfo?.publishedDate || "Ma'lumot yo'q";
    clonedFilmTemplate.querySelector(".read").href = item.volumeInfo?.previewLink || "Ma'lumot yo'q";
    clonedFilmTemplate.querySelector(".bookmarks").dataset.bookBtnId = item.id;
    clonedFilmTemplate.querySelector(".more_info").dataset.more = item.id

    moviesFragment.appendChild(clonedFilmTemplate);
  });

  htmlElement.appendChild(moviesFragment);
};



// RENDER CREATE PAGENETION BUTTONS

elPrevBtn.addEventListener("click", function () {
  if (page === 1) {
    elPrevBtn.classList.add("dis")
    elPrevBtn.disabled = true
  } else {
    page--;
    getBooks(kniga, page);
  }
});

elNextBtn.addEventListener("click", function () {
  elPrevBtn.classList.remove("dis")
  elPrevBtn.disabled = false
  if (page >= Math.ceil(num / 10)) {
    elNextBtn.disabled = true
    elNextBtn.classList.add("dis")
  } else {
    page++;
    getBooks(kniga, page);
  }
});

elButtons.addEventListener("click", evt => {
  elPrevBtn.classList.remove("dis")
  if (evt.target.dataset.pageBtnId) {
    page = evt.target.dataset.pageBtnId
    getBooks(kniga, page)
  }
})

const renderBtn = function (data, where) {
  for (let i = 1; i <= Math.ceil(data.totalItems / 10); i++) {
    const newBtn = document.createElement("button")
    newBtn.setAttribute("class", "pageBtn")
    if (page == i) {
      newBtn.classList.add("btnPage")
    }
    newBtn.textContent = i
    newBtn.id = i
    newBtn.dataset.pageBtnId = newBtn.id
    where.appendChild(newBtn)

  }

}


// MODAL CODE
const showModal = document.querySelector('.more_info');
const modal = document.querySelector('.book__modal');
const closeModalBtn = document.querySelector('.modal__close');
const overlay = document.querySelector('.overlay');

let modalArray = []


const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

modal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

elMovieList.addEventListener("click", evt => {
  modalArray.splice(0)
  if (evt.target.matches(".more_info")) {
    const bookId = evt.target.dataset.more
    let modalBook = data.items.find(item => item.id == bookId)
    modalArray.push(modalBook)
    openModal()
    renderModal(modalArray, modal)
  }
})


document.addEventListener('keydown', function (evt) {
  if (evt.metaKey && evt.keyCode === 67) {
    closeModal();
  }
});



let renderModal = function (arr, where) {
  where.innerHTML = null;
  arr.forEach((modal) => {
    let html = `
    <div class="modal__top">
    <h2 class="modal__head">${modal.volumeInfo?.title}</h2>
    <button class="modal__close"><img src="./img/closeIcon.svg" width="20" height="20"></button>
    </div>


    <div class="modal__body">
    <img class="modal__img" src="${modal.volumeInfo.imageLinks?.smallThumbnail
      }" width="130" heigth="190" alt="">
    <p class="modal__text">${modal.volumeInfo?.description}</p>
    </div>
    <div class="modal__footer">
    <ul class="modal__list">
        <li class="modal__item">
            Author: <p class="modal__author">${modal.volumeInfo?.authors?.join(", ") || "Ma'lumot yo'q"}</p>
        </li>
        <li class="modal__item">
            Published: <p class="modal__year">${modal.volumeInfo?.publishedDate || "Ma'lumot yo'q"
      }</p>
        </li>
        <li class="modal__item">
            Publishers: <p class="modal__publishers">${modal.volumeInfo.publisher || "Ma'lumot yo'q"
      }</p>
        </li>
        <li class="modal__item">
            Categories: <p class="modal__categories">${modal.volumeInfo?.catigories?.join(",") || "Ma'lumot yo'q"}</p>
        </li>
        <li class="modal__item">
            Page Count: <p class="modal__count">${modal.volumeInfo?.pageCount || "Ma'lumot yo'q"
      }</p>
        </li>
    </ul>
    </div>
    <div class="modal__btn">
    <a class="modal__link" href=${modal.volumeInfo?.previewLink}>Read</a>
    </div>
    `;
    where.insertAdjacentHTML("beforeend", html);
  });
};


const elLogount = document.querySelector(".LogIn__btn")

const token = window.localStorage.getItem("token");

if (!token) {
  window.location.replace("index.html");
}

elLogount.addEventListener("click", function () {
  window.localStorage.removeItem("token");

  window.location.replace("index.html");
});