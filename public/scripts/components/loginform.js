$(document).ready(function() {

  const $loginForm = `
  <div class="container d-flex justify-content-center">
  <form class="form" id="login-form" method="post" action="/api/users/login">
    <div class="form-outline mb-4">
      <input id="username-login" name="username" required type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
    </div>
    <div class="form-outline mb-4">
      <input name="password" type="text" required class="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1">
    </div>
    <div class="form-group text-center">
      <button class="btn btn-primary btn-block" type="submit">Login</button>
    </div>
    </form>
    </div>
  `;

  //register is clicked
  $(document).on("click","#login", (event)=> {
    // console.log("login button clicked");
    event.preventDefault();
    $("main").empty();
    //replace with the loginForm
    $("main").append($loginForm);

    //jQuery post for user login and authentication from route /users/login
    $(document).on("submit","#login-form", function(event) {
      event.preventDefault();

      //serialize data before post
      const serializeData = $("#login-form").serialize();
      // console.log("serialized data from user login form", serializeData);
      //validate form submitted content

      $.post("/api/users/login", serializeData, (success) => {
        if (success.error === "error") {
          console.log("wrong credential");
          return;
        }console.log(success["user"]);
        header.update(success["user"]);
        $("main").empty();
        index.loadIndex(success["user"]);
      });

    });

  });


});
