$(document).ready(function() {

  const $loginForm = `<form id="login-form" method="post" action="/api/users/login">
  <input id="username-login" name="username" type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
  <input name="password" type="text" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1">
  <button class="btn btn-primary" type="submit">Login</button>
  `;

  //register is clicked
  $("#login").click((event)=> {
    console.log("login button clicked");
    event.preventDefault;
    $("#login").hide();
    $("#register").hide();
    //replace with the loginForm
    $("nav").append($loginForm);

    //jQuery post for user login and authentication from route /users/login
    $("#login-form").submit(function(event) {
     // console.log("registration button clicked for submition",event);
      event.preventDefault();
      //logoutButton
      const $userName = $("#username-login").val();
      const $logOutButton = `
      <div id="logout-div">
      <label>Logged in as ${$userName}<label>
      <button id="logout-button" class="btn btn-primary" type="submit">Logout</button>
      </div>
      `;

      //serialize data before post
      const serializeData = $("#login-form").serialize();
      console.log("serialized data from user login form", serializeData);
      //validate form submitted content

      $.post("/api/users/login", serializeData, (success) => {
        console.log("response from server", success);
        //user registered and logged in then fetch data
        //replace the register form to a loggedInAsUserForm
        $("#login-form").hide();
        $("nav").append($logOutButton);
      });


    });


  });

});
