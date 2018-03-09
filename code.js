// Initial array of gifs
var topics = ["puppers", "doggos", "honey badgers", "army ants", "caterpillars", "sterling archer phrasing"];

function renderButtons() {
  $("#buttons-view").empty();
  for (var i = 0; i < topics.length; i++) {
    //dynamicaly generating buttons for each gif in the array
    var a = $("<button>");
    a.addClass("gif");
    a.attr("data-name", topics[i]);
    a.text(topics[i]);
    $("#buttons-view").append(a);
  }
  console.log("render buttons finishing");
}

renderButtons();





//dynamicly renders 10 new gifs with their G/PG/PG13/etc
$("#buttons-view").on("click", "button", function() {
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
console.log(response);
        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div class='item'>");

          var rating = results[i].rating;
          var p = $("<h4>").text("Rating: " + rating);

          var gifUrl = $("<img>");
          
          gifUrl.attr("src", results[i].images.fixed_height_small.url);
          gifUrl.attr("data-still", results[i].images.fixed_height_small_still.url)
          gifUrl.attr("data-animate", results[i].images.fixed_height_small.url);
          gifUrl.attr("data-state", "still");
          gifUrl.attr("class", "gif");
          console.log("gifUrl =" + gifUrl)
          gifDiv.prepend(p);
          gifDiv.prepend(gifUrl);
          $("#gifs-appear-here").prepend(gifDiv);
        }
      });
  });

  $("#add-gif").on("click", function(event) {
    event.preventDefault();
    var gif = $("#gif-input").val().trim();
    topics.push(gif);
    renderButtons();
  });

  $(".gif").on("click", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
