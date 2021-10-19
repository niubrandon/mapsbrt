$(document).ready(function() {


  /*
  create a map form integration when click create a map tab fro nav
  */
  $(document).on("click", "#create-a-map", (event) => {
    event.preventDefault();
    //create a form
    const creatorId = "admin";
    console.log("the create-a-map tab has been clicked");
    const $createMapForm = `<form id="create-map-form" method="post" action="/api/maps/${creatorId}/addmap">
    <input name="title" required type="text" class="form-control" placeholder="Title" aria-label="Title" aria-describedby="basic-addon1">
    <input name="description" type="text" required class="form-control" placeholder="Description" aria-label="Description" aria-describedby="basic-addon1">
    <input name="lng" required type="number" class="form-control" placeholder="longitude" aria-label="lng" aria-describedby="basic-addon1">
    <input name="lat" required type="number" class="form-control" placeholder="latitude" aria-label="lat" aria-describedby="basic-addon1">
    <input name="zoom" required type="number" class="form-control" placeholder="zoom" aria-label="zoom" min="1" max="25"  aria-describedby="basic-addon1">
    <button id="create-map-button" class="btn btn-primary" type="submit">Submit</button>`;
    //detach components if necessary
    $("main").append($createMapForm);
    //on submit event for post

    $(document).on("click", "#create-map-button", (event) => {
      console.log("submit for creating a new map");
      event.preventDefault();

      const serializedData = $("#create-map-form").serialize();
      console.log("serialized data from submit a new map", serializedData);

      $.post(`/api/maps/${creatorId}/addmap`, serializedData, (success) => {
        console.log("ajax post for create a map works", success);
      });
    });
  });
});
