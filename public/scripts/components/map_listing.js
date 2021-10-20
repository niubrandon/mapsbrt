$(() => {
  window.mapListing = {};

  function ListMap(maps, user, profile) {
    // console.log(isFav);
    return `
    <div class="col">
      <div class="card h-100">
        <div class="image_container">
        <img
          src="https://assets.website-files.com/5e832e12eb7ca02ee9064d42/5f915422ccb28e626ad16e20_Group%20939.jpg"
          class="card-img-top"
          alt="..."
          />
          ${user ?
          `${maps.fav ?
           `<i class="fas fa-heart fa-2x fav_button"  title="Remove  Fav" value="0" data-mapId="${maps.id}"></i>` : `<i class="far fa-heart fa-2x fav_button"  title="Add to Fav" value="1" data-mapId="${maps.id}"></i>`}` : ``}
        </div>
        <div class="card-body">
          <h5 class="card-title">${maps.title}</h5>
          <p class="card-text">
            ${maps.description}
          </p>
        </div>
        ${user ? `<button class="btn btn-primary" value = "${maps.id}" >Details</button>` :
        `<button class="btn btn-primary disabled" value = "${maps.id}" disabled >Details</button>` }
        ${profile ? `<button class="btn btn-danger delete-button" value = "${maps.id}" >Delete</button>` : ``}
      </div>
    </div>`
  }
  window.mapListing.ListMap = ListMap;
});
