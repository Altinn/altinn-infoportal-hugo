// Get the query parameter(s)
const params = new URLSearchParams(window.location.search)
const query = params.get('q')

var client = window.ElasticAppSearch.createClient({
    searchKey: "search-r6rtkhg95naeirkv7v3scye6",
    endpointBase: "https://infoportal-search-test.ent.westeurope.azure.elastic-cloud.com",
    engineName: "infoportal-search"
}); //TODO: These should be set at deploytime to support different environments

function displayResults(resultList, reqId) {
    const searchResults = document.getElementById('results')
    if (resultList && resultList.length) {
        let resultListHtml = ''
        resultList.forEach(result => { //TODO: Possible to render the html in a better way?
            resultListHtml += `<div class="a-linkArticle a-borderBottomDark"><h2><a href="${result.getRaw('url')}" class="a-link-title track-click" data-query="${query}" data-doc-id="${result.getRaw('id')}" data-req-id="${reqId}" data-tag="${result.getRaw('meta_keywords')}">${result.getRaw('title')}</a></h2><p>${result.getRaw('meta_description')}</p></div>`
        })
        searchResults.innerHTML = resultListHtml
    } else {
        searchResults.innerHTML = "No results found for for query: " + query //TODO: add language support
    }
}

if (query) {
    document.getElementById('search').setAttribute('value', query)
    var options = {
        search_fields: { title: {} },
        result_fields: { id: { raw: {} }, title: { raw: {} }, url: { raw: {} }, meta_keywords: { raw: {} } },
        analytics: {
            tags: ["infoportal-search"]
        }
    }
    client.search(query, options)
        .then(resultList => {
            displayResults(resultList.results, resultList.info.meta.request_id)
        })
        .catch(error => {
            console.log(`error: ${error}`)
        });
}

document.addEventListener("click", function(e) {
    const el = e.target;
    if (!el.classList.contains("track-click")) return;
    console.log({
        query: el.getAttribute("data-query"),
        documentId: el.getAttribute("data-doc-id"),
        requestId: el.getAttribute("data-req-id"),
        tags: [el.getAttribute("data-tag")]
      });
    client.click({
      query: el.getAttribute("data-query"),
      documentId: el.getAttribute("data-doc-id"),
      requestId: el.getAttribute("data-req-id"),
      tags: ["altinn-search"]
    })
    .catch(error => {
        console.log(`error registering click: ${error}`)
    });
  });