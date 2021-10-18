
$(document).ready(function() {
  /*
          logout need to be fixed for repeated lognin/logout
        */
  // console.log("header file runs");
  const $loginRegisterForm = `
          <button id="register" class="btn btn-primary" type="submit">Register</button>
          <button id="login" class="btn btn-primary" type="submit">Login</button>`;

  $(document).on("click", "#logout-button", (event) => {
    console.log("logoutbutton clicked");
    const serializeData = $(this).serialize();

    $.post("/api/users/logout", serializeData, (success) => {
      console.log("response from server", success);
      //hide logout and show original register and login
      $("#logout-div").detach();
      $("nav").append($loginRegisterForm);
    });
    //post ajax to remove cookie
  });

});
