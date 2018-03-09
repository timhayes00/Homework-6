// Initial array of gifs
var gifArray = ["puppers", "pupperinos", "doggos", "honey badgers", "army ants", "yaks"];


// Function for displaying gif data
function renderButtons() {

  $("#buttons-view").empty();

  // Looping through the array of gifs
  for (var i = 0; i < gifArray.length; i++) {

    // Then dynamicaly generating buttons for each gif in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class
    a.addClass("gif");
    // Added a data-attribute
    a.attr("data-name", gifArray[i]);
    // Provided the initial button text
    a.text(gifArray[i]);
    // Added the button to the HTML
    $("#buttons-view").append(a);
    
  }
}

$("#add-gif").on("click", function(event) {
  event.preventDefault();

  var gif = $("#gif-input").val().trim();

  gifArray.append(gif);

  renderButtons();
});

renderButtons();

//dynamicly renders 10 new gifs with their G/PG/PG13/etc
$("button").on("click", function() {
    var gifDisplay = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      gifDisplay + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div class='item'>");

          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating);

          var gifUrl = $("<img>");
          
          gifUrl.attr("src", results[i].images.fixed_height_small.url);
          console.log(results[i].images.fixed_height_small.url);
          gifDiv.prepend(p);
          gifDiv.prepend(gifUrl);
          console.log(gifDiv);

          $("#gifs-appear-here").prepend(gifDiv);
        }
      });
  });

//   var imageUrl = response.data.image_original_url;

//   // Creating and storing an image tag
//   var catImage = $("<img>");

//   // Setting the catImage src attribute to imageUrl
//   catImage.attr("src", imageUrl);
//   catImage.attr("alt", "cat image");

//   // Prepending the catImage to the images div
//   $("#images").prepend(catImage);