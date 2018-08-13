(async function load() {

  async function getData(url, options) {  
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  }

  function videoTemplate(img, title) {
    return (
      `<div class="primaryPlaylistItem">
        <div class="primaryPlaylistItem-image">
          <img src='${img}' alt='${title}' title='${title}'>
        </div>
        <h4 class="primaryPlaylistItem-title">
          ${title}
        </h4>
      </div>`
    );
  }

  function createTemplate(HTMLString) {
    // Se crea un documento html vacío
    const html = document.implementation.createHTMLDocument();
    // se agrega la plantilla al innerHTML del documento html 
    // esto hace que la plantilla en texto se convierta a elementos DOM
    html.body.innerHTML = HTMLString;
    return html.body.children[0];
  }
 
  const actions = await getData('https://yts.am/api/v2/list_movies.json?genre=action&limit=6', { method: 'GET', mode: 'cors', });
  const drama = await getData('https://yts.am/api/v2/list_movies.json?genre=drama&limit=6', { method: 'GET', mode: 'cors', });
  const animations = await getData('https://yts.am/api/v2/list_movies.json?genre=animation&limit=6', { method: 'GET', mode: 'cors', })

  function renderMovies(list, $container) {
    $container.children[0].remove();
    list.forEach((item) => {
      // Se trae la plantilla y se guarda en una variable.
      const HTMLString = videoTemplate(item.medium_cover_image, item.title);
      const movieElement = createTemplate(HTMLString);
      // Se agrega el primer hijo (que es donde se encuentra la plantilla) al contenedor donde se quiere agregar la plantilla
      $container.append(movieElement);
    });
  }

  const $actionContainer = document.querySelector('#action');
  renderMovies(actions.data.movies, $actionContainer);
  const $dramaContainer = document.querySelector('#drama');
  renderMovies(drama.data.movies, $dramaContainer);
  const $animationContainer = document.querySelector('#animation');
  renderMovies(animations.data.movies, $animationContainer);
  const $featuringContainer = document.querySelector('#featuring');

  const $form = document.querySelector('#form');
  const $home = document.querySelector('#home');

  const $modal = document.getElementById('modal');
  const $overlay = document.getElementById('overlay');
  const $hideModal = document.getElementById('hide-modal');

  const $modalImg = $modal.querySelector('img');
  const $modalTitle = $modal.querySelector('h1');
  const $modalDescription = $modal.querySelector('p');
})() 
