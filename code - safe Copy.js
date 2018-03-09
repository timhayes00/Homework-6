// Initial array of gifs
var gifArray = ["puppers", "doggos", "honey badgers", "army ants", "caterpillars"];

function renderButtons() {
  $("#buttons-view").empty();
  for (var i = 0; i < gifArray.length; i++) {
    //dynamicaly generating buttons for each gif in the array
    var a = $("<button>");
    a.addClass("gif");
    a.attr("data-name", gifArray[i]);
    a.text(gifArray[i]);
    $("#buttons-view").append(a);
  }
  console.log("render buttons finishing");
}

renderButtons();





//dynamicly renders 10 new gifs with their G/PG/PG13/etc
$("button").on("click", function() {
    console.log("button clicked");
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

  $("#add-gif").on("click", function(event) {
    console.log("gifarray =" + gifArray);
    event.preventDefault();
  
    var gif = $("#gif-input").val().trim();
  
    gifArray.push(gif);
  
    console.log("gifarray =" + gifArray);
    renderButtons();
    console.log("after calling render buttons");
  });

//   var imageUrl = response.data.image_original_url;

//   // Creating and storing an image tag
//   var catImage = $("<img>");

//   // Setting the catImage src attribute to imageUrl
//   catImage.attr("src", imageUrl);
//   catImage.attr("alt", "cat image");

//   // Prepending the catImage to the images div
//   $("#images").prepend(catImage);