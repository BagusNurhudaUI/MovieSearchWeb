function cariMovie() {
  $("#movie-list").html("");
  $.ajax({
    url: "http://omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "8fbb8082",
      s: $("#searchinput").val(),
    },
    success: function (hasil) {
      //test if
      if (hasil.Response.toLowerCase() == "true") {
        let movies = hasil.Search;
        console.log(movies);
        `
                <div>
                <a href="#" class="btn btn-primary id = lihatmovie2">Lihat Movie </a>
                </div>
                `;
        $.each(movies, function (i, data) {
          $("#movie-list").append(
            `<div class="col-md-4">
             <div class="card" style="width: 18rem;">
             <img src="${data.Poster}" class="card-img-top" alt="...">
             <div class="card-body">
             <h5 class="card-title">${data.Title}</h5>
                    <p class="card-text">${data.Year}</p>
                    <h5 class="card-price"> ${data.Year}</h5>
                    <a href="#" class="btn btn-primary lihatmovie" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-id = "`+data.imdbID+`">Lihat Movie</a>
                    </div>
                    </div> 
                    </div>
                    `
          );
        });
        $("#searchinput").val("");
      } else {
        $("#movie-list").html(
          `<div class="col">
            <h1 class= "text-center">` +
            hasil.Error +
            `</h1>
            </div>
        `
        );
      }
    },
  });
}

$("#searchbutton").on("click", function () {
  console.log("tombol button di click");
  cariMovie();
});

$("#searchinput").on("keyup", function (e) {
	if (e.keyCode === 13) {
		console.log("enter di click");
    cariMovie();
  }
});

$('#movie-list').on('click','.lihatmovie', function() {
console.log($(this).data('id'));
	$.ajax({
		url: "http://omdbapi.com",
		type: "get",
		dataType: "json",
		data: {
			apikey: "8fbb8082",
			i: $(this).data('id')
		},
		success: function(movie){
			console.log("berhasil masuk ke ajax");
			if (movie.Response==="True"){

				$('.modal-content').html(`
						<div class="modal-header justify-content-center">
							<h5 class="modal-title text-center">Movie Description</h5>
						</div>
						<div class="modal-body">
							<div class="container-fluid">
								<div class="row">
									<div class="col-md-4">
									<img src="`+ movie.Poster+`" class="img-fluid">
									</div>

									<div class="col-md-8">
										<ul class="list-group">
											<h1>`+movie.Title+`</h1>
											<p> `+movie.Plot+`</p>
											<h5> Genre		:`+movie.Genre+`</h5>
											<h5> Year			:`+movie.Year+`</h5>
											<h5> Rated		:`+movie.Rated+`</h5>
											<h5> Runtime	:`+movie.Runtime+`</h5>
											<h5> Released	:`+movie.Released+`</h5>
											<h5> Director	:`+movie.Director+`</h5>
											<h5> Writer		:`+movie.Writer+`</h5>
											<h5> Rating 	:`+movie.imdbRating+`</h5>
											<h5> Total value : `+movie.BoxOffice+`</h5>
											<h5></h5>
										</ul>
									</div>
								
									
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-bs-dismiss="modal">Tutup</button>
						</div>
					</div>
				</div>
			</div>
				`);
			}
		}
	});
});