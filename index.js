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
      throw new Error('Paso algo');
    }

   return await resp.json();

  } catch (error) {
    console.log(  error );
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

      <div class="card-bottom__repos">Repos: ${ profile.public_repos }</div>
      <div class="card-bottom__gists">Gists: ${ profile.public_gists }</div>
      <div class="card-bottom__followers">Followers: ${ profile.followers }</div>

    </div>`;



  
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = '';
  cardContainer.appendChild(card);

}
