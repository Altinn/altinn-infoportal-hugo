// Get the query parameter(s)
const params = new URLSearchParams(window.location.search)
const query = params.get('q')
const news = params.get('news')
const help = params.get('help')
const newsEngine = "infoportal-news"
const helpEngine = "infoportal-help"

var client = window.ElasticAppSearch.createClient({
    searchKey: "search-r6rtkhg95naeirkv7v3scye6",
    endpointBase: "https://infoportal-search-test.ent.westeurope.azure.elastic-cloud.com",
    engineName: "infoportal-meta"
}); //TODO: These should be set at deploytime to support different environments

function displayResults(resultList, reqId) {
    const searchResults = document.getElementById('results')
    if (resultList && resultList.length) {
        let resultListHtml = ''
        console.log(resultList[0].data['_meta'].engine)
        resultList.forEach(result => { //TODO: Possible to render the html in a better way?
            const engineName = result.data['_meta'].engine;
            if (engineFilter == "" || (news && newsEngine == engineName) || (help && helpEngine == engineName)) {
                description = (typeof result.getRaw('meta_description') !== "undefined") ? result.getRaw('meta_description') : result.getRaw('headings')
                title = (typeof result.getRaw('altinn_title') !== "undefined") ? result.getRaw('altinn_title') : result.getRaw('title')
                resultListHtml += `
            <div class="a-linkArticle a-borderBottomDark">
              <h2><a href="${result.getRaw('url')}" class="a-link-title track-click" data-query="${query}" data-doc-id="${result.getRaw('id')}" data-req-id="${reqId}" data-tag="${result.getRaw('meta_keywords')}">${title}</a></h2>
              <p>${description}</p>
            </div>`
            }
        })
        searchResults.innerHTML = resultListHtml
    } else {
        searchResults.innerHTML = "No results found for for query: " + query //TODO: add language support
    }
}

if (query) {
    document.getElementById('input-search-main').setAttribute('value', query)
    var options = {
        search_fields: { altinn_title: {}, meta_description: {}, meta_keywords: {}, body_content: {} },
        result_fields: { id: { raw: {} }, title: { raw: {} }, altinn_title: { raw: {} }, url: { raw: {} }, meta_keywords: { raw: {} }, meta_description: { raw: {} }, headings: { raw: {} } },
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

if (news) {
    document.getElementById('search-ctx-news').checked = true
}

if (help) {
    document.getElementById('search-ctx-help').checked = true
}

document.addEventListener("click", function (e) {
    const el = e.target;
    if (!el.classList.contains("track-click")) return;
    client.click({
        query: el.getAttribute("data-query"),
        documentId: el.getAttribute("data-doc-id"),
        requestId: el.getAttribute("data-req-id"),
        tags: ["infoportal-search"]
    })
        .catch(error => {
            console.log(`error registering click: ${error}`)
        });
});

document.addEventListener("change", function (e) {
    const el = e.target;
    var url = new URL(window.location.href);
    if (el.id == "search-ctx-news") {
        if (el.checked) {
            url.searchParams.append("news", el.checked);
        } else {
            url.searchParams.delete("news")
        }
        window.location.href = url
    }
    if (el.id == "search-ctx-help") {
        if (el.checked) {
            url.searchParams.append("help", el.checked);
        } else {
            url.searchParams.delete("help")
        }
        window.location.href = url
    }
});