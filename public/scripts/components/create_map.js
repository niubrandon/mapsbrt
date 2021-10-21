$(document).ready(function() {

  /*
  create a map form integration when click create a map tab fro nav
  !!!need to replace the hardcoded creatorId
  */
  $(document).on("click", "#create-a-map", (event) => {
    event.preventDefault();
    $("main").empty();
    //create a form
    const creatorId = $("#logged-userId").attr("value");
    console.log("the create-a-map tab has been clicked");
    const $createMapForm = `<form id="create-map-form" method="post" action="/api/maps/${creatorId}/addmap">
    <div class="form-outline mb-4">
      <input name="title" type="text" class="form-control" placeholder="Title" aria-label="Title" aria-describedby="basic-addon1" required>
    </div>
    <div class="form-outline mb-4">
      <input name="description" type="text" required class="form-control" placeholder="Description" aria-label="Description" aria-describedby="basic-addon1">
    </div>
    <div class="form-outline mb-4">
      <input name="lng" required type="number" class="form-control" placeholder="longitude" min="-180" max="180" aria-label="lng" aria-describedby="basic-addon1" id="lng_value">
      <small id="createmapln-Help" class="form-text text-muted">Range is in between -180 and 180</small>
    </div>
    <div class="form-outline mb-4">
      <input name="lat" required type="number" class="form-control" placeholder="latitude" min="-90" max="90" aria-label="lat" aria-describedby="basic-addon1" id="lat_value">
      <small id="createmaplat-Help" class="form-text text-muted">Range is in between -90 and 90</small>
    </div>
    <div class="form-outline mb-4">
      <input name="zoom" required type="number" class="form-control" placeholder="zoom" aria-label="zoom" min="1" max="25"  aria-describedby="basic-addon1">
      <small id="createmapzoom-Help" class="form-text text-muted">Range is in between 1 and 25</small>
    </div>
    <button id="create-map-button" class="btn btn-primary" type="submit">Submit</button>
    </form>`;
    //detach components if necessary
    $("main").append($createMapForm);
    //on submit event for post

  });
});


$(document).on("submit", "#create-map-form", (event) => {
  const creatorId = $("#logged-userId").attr("value");
  console.log("submit for creating a new map");
  event.preventDefault();
  const serializedData = $("#create-map-form").serialize();
  console.log("serialized data from submit a new map", serializedData);

  $.post(`/api/maps/${creatorId}/addmap`, serializedData, (success) => {
    console.log("ajax post for create a map works", success);
    $("main").empty();
    index.loadIndex(true);
  });
});
