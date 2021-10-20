$(() => {
  window.mapListing = {};

  function ListMap(maps, isFav, user) {
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
          `${isFav ?
           `<i class="fas fa-heart fa-2x fav_button"  title="Remove  Fav" value="0"></i>` : `<i class="far fa-heart fa-2x fav_button"  title="Add to Fav" value="1"></i>`}` : ``}
        </div>
        <div class="card-body">
          <h5 class="card-title">${maps.title}</h5>
          <p class="card-text">
            ${maps.description}
          </p>
        </div>
        ${user ? `<button class="btn btn-primary" value = "${maps.id}" >Details</button>` :
        `<button class="btn btn-primary" value = "${maps.id}" disabled >Details</button>` }
      </div>
    </div>`
  }
  window.mapListing.ListMap = ListMap;
});
