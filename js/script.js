
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    var streetStr = $('#street').val()
    var cityStr = $('#city').val();
    var address = streetStr + ',' + cityStr;

    $greeting.text('So, you want to live at '+ address + '?')
    var streetViewURL = `http://maps.googleapis.com/maps/api/streetview?size=600x300&location=${address}`;
    $body.append(`<img class="bgimg" src="${streetViewURL}" >`)
    // YOUR CODE GOES HERE!
    var nytimesUrl = `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${cityStr}&sort=newest&api-key=48a413a76aac4948a321914cc53c9692`
    $.getJSON(nytimesUrl, function(data) {
        console.log(data)
        $nytHeaderElem.text('New York Times Articles About ' + cityStr.toUpperCase())
        var articles  = data.response.docs;
        articles.forEach(i => {
            $nytElem.append(
                `<li class="article"> 
                    <a href="${i.web_url}"> ${i.headline.main}</a>
                    <p>${i.snippet}</p>
                </li>`)
            
        });
    })
    return false;
};

$('#form-container').submit(loadData);
