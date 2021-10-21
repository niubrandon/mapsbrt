$(() => {
  window.mapdetails = {};

  function editMap(mapDetail) {
   return `
      <div class="modal" tabindex="-1" role="dialog" id="updateMapModal">
      <form id="edit-map-form" method="post" action="/api/maps/${mapDetail.creator_id}/updatemap/${mapDetail.id}?_method=PUT”>
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit Map</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
              <div class="modal-body">
                <div class="form-outline mb-4">
                  <input type="hidden" id="mapId" name="map_id" value="${mapDetail.id}">
                </div>
                <div class="form-outline mb-4">
                  <input name="title" type="text" class="form-control" placeholder="Title" aria-label="Title" aria-describedby="basic-addon1" value="${mapDetail.title}"required>
                </div>
                <div class="form-outline mb-4">
                  <input name="description" type="text" required class="form-control" placeholder="Description" aria-label="Description" aria-describedby="basic-addon1" value="${mapDetail.description}">
                </div>
                <div class="form-outline mb-4">
                  <input name="lng" required type="number" class="form-control" placeholder="longitude" min="-180" max="180" aria-label="lng" step="any" aria-describedby="basic-addon1" id="lng_value"
                  value=${mapDetail.lng}>
                  <small id="createmapln-Help" class="form-text text-muted">Range is in between -180 and 180</small>
                </div>
                <div class="form-outline mb-4">
                  <input name="lat" required type="number" step="any" class="form-control" placeholder="latitude" min="-90" max="90" aria-label="lat" aria-describedby="basic-addon1" id="lat_value"
                  value="${mapDetail.lat}">
                  <small id="createmaplat-Help" class="form-text text-muted">Range is in between -90 and 90</small>
                </div>
                <div class="form-outline mb-4">
                  <input name="zoom" required type="number" class="form-control" placeholder="zoom" aria-label="zoom" min="1" max="25"  aria-describedby="basic-addon1" value="${mapDetail.zoom}">
                  <small id="createmapzoom-Help" class="form-text text-muted">Range is in between 1 and 25</small>
                </div>
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-primary">Save changes</button>
                <button type="button" class="btn btn-secondary close" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        </form>
      </div>`;
  }

  window.mapdetails.editMap = editMap;

});
