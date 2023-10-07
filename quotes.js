let timer = setInterval(bgchange, 8000);

const bgimg = [
  'url(/resources/polygon-scatter-haikei1.svg)',
  'url(/resources/polygon-scatter-haikei2.svg)',
  'url(/resources/polygon-scatter-haikei3.svg)',
  'url(/resources/polygon-scatter-haikei4.svg)',
  'url(/resources/polygon-scatter-haikei5.svg)',
  'url(/resources/polygon-scatter-haikei6.svg)',
  'url(/resources/polygon-scatter-haikei7.svg)'
];

let presentQuote = ""; // Initialize an empty string for the quote
let authorName = "";  // Initialize an empty string for the author name

document.getElementById('switch').onclick = function () {
  bgchange();

  fetchdata()
    .then(({ quote, author }) => {
      presentQuote = quote;
      authorName = author;
      
      var comma=authorName.indexOf(',');
      var authorName2 = authorName.slice(0,comma);
      
      
      document.getElementById('quote').innerHTML = presentQuote;
      document.getElementById('author').innerHTML = authorName2;
    });
};

function fetchdata() {
  return fetch("https://type.fit/api/quotes")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const randomIndex = Math.floor(Math.random() * data.length);
      const quote = data[randomIndex].text;
      const author = data[randomIndex].author || "Unknown";

      console.log("Quote:", quote);
      console.log("Author:", author);

      return { quote, author };
    })
    .catch(function (error) {
      console.error("Error fetching data:", error);
    });
}

function bgchange() {
  let random = Math.floor(Math.random() * 7); // 0-6
  document.body.style.backgroundImage = bgimg[random];
}
