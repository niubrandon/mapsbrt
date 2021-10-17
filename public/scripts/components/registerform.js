$(document).ready(function() {

  const $registerForm = `<form id="register-form" method="post" action="/api/users/register">
  <input name="username" type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
  <input name="email" type="text" class="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1">
  <input name="password" type="text" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1">
  <button class="btn btn-primary" type="submit">Register</button>
  `;

  //register is clicked
  $("#register").click((event)=> {
    console.log("register button clicked");
    event.preventDefault;
    $("#login").hide();
    $("#register").hide();
    //replace with the loginForm
    $("nav").append($registerForm);

    //jQuery post for user registration from route /users/register
    $("#register-form").submit(function(event) {
     // console.log("registration button clicked for submition",event);
      event.preventDefault();
      //serialize data before post
      const serializeData = $("#register-form").serialize();
      console.log("serialized data from user registration form", serializeData);
      //validate form submitted content

      $.post("/api/users/register", serializeData, (success) => {
        console.log("response from server", success);
        //user registered and logged in then fetch data
      });


    });


  });



});
