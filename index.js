const form = document.getElementById('form'),
      inputSearch = document.getElementById('search'),
      urlBase = 'https://api.github.com/users';


form.addEventListener('submit', getQuery );


async function getQuery (e) {

  e.preventDefault();


  if ( inputSearch.value.length >= 3 )  {
    
  const profile = await getProfile( inputSearch.value );
  renderProfile( profile );

  }else {
    alert('Minimo 3 palabras');
  }
  inputSearch.value = '';
}





const getProfile = async( query )  => {
  try {
    
    const resp = await fetch(`${ urlBase }/${ query }`)


    if ( !resp.ok ) {
      throw new Error(`No existe un githib con el termino: ${ query }`);
    }

   return await resp.json();

  } catch (error) {
    alert(  error );
  }
}


const renderProfile = ( profile ) => {

  const card = document.createElement('div');
  card.setAttribute('class', 'card');

  card.innerHTML  = `

    <div class="card-top">

      <figure class="card-top__figure">
        <img src="${ profile.avatar_url }"  width="135px">
      </figure>

      <h4 class="card-top__name">${ profile.twitter_username }</h4>
      <p  class="card-top__bio">${ profile.bio }</p>

    </div>


    <div class="card-bottom">

      <span class="card-bottom__repos"><b>Repos:</b> ${ profile.public_repos }</span>
      <span class="card-bottom__gists"><b>Gists:</b> ${ profile.public_gists }</span>
      <span class="card-bottom__followers"><b>Followers:</b> ${ profile.followers }</span>

    </div>`;



  
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = '';
  cardContainer.appendChild(card);

}
