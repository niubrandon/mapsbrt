$(document).ready(function() {

  const $registerForm = `
  <div class="container">
    <form id="register-form" method="post" action="/api/users/register" class="form">
    <div class="form-outline mb-4">
      <input id="username" name="username" required type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
    </div>
    <div class="form-outline mb-4">
      <input name="email" type="email" required class="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1">
    </div>
    <div class="form-outline mb-4">
      <input name="password" required type="text" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1">
    </div>
    <button class="btn btn-primary" type="submit">Register</button>
  </form>
  </div>
  `;

  //register is clicked
  $(document).on("click", "#register", (event)=> {
    console.log("register button clicked");
    event.preventDefault();
    $("main").empty();
    //replace with the loginForm
    $("main").append($registerForm);

  });

});


//jQuery post for user registration from route /users/register
$(document).on("submit", "#register-form", function(event) {
  event.preventDefault();
  //logoutButton
  const $userName = $("#username").val();
  const $logOutButton = `
      <div id="logout-div">
      <label>Logged in as ${$userName}</label>
      <button id="logout-button" class="btn btn-primary" type="submit">Logout</button>
      </div>
      `;

  //serialize data before post
  const serializeData = $("#register-form").serialize();
  console.log("serialized data from user registration form", serializeData);
  //validate form submitted content

  $.post("/api/users/register", serializeData, (success) => {
    console.log("response from server", success);
    //user registered and logged in then fetch data
    //replace the register form to a loggedInAsUserForm
    if (success.error === "error") {
      console.log("user registration error");
      return;
    }
    header.update(success["user"]);
    $("main").empty();
    index.loadIndex(success["user"]);
  });


});

