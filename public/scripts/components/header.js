$() => {

  window.header = {};

  const $pageHeader = $('#page-header');

  let currentUser = null;

  function updateHeader(user) {
    currentUser = user;
    $pageHeader.find("#page-header_user").remove();
    let userLinks;

    if (!user) {
      userLink = `
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Maps</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Favorite</a>
              </li>
            </ul>
          </div>
          <form method="post" action="/users/register">
            <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
            <input type="text" class="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1">
            <input type="text" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1">
            <button class="btn btn-primary" type="submit">Register</button>
          </form>
        </div>
      </nav>
      `
    }
  }
}
