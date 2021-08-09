const page = (apiKey, bookList, favourites, requestDetails) => {
    return `
    <!DOCTYPE html>
    <div id="app">
      <div id="topbar">
        Learn REST APIs! Playground token: ${apiKey}
        <br/>
      </div>
      <hr />
      <div id="app-content">
        <h2>Books in store</h2>
        <div class="main-container">
          <ul>
            ${bookList}
          </ul>
        </div>
        <h2>Favourites</h2>
        <div>
          ${favourites}
        </div>
          Last request: 
          ${requestDetails}
          <br />
          TODO Full-on docs here
      </div>
    </div>
  `
}

module.exports = page