import React, { useState, useEffect } from "react";
import './crypto.css';
import { api } from "./apiManager";

function Crypto() {

  const [crypto, setCrypto] = useState([])
  const [query, setQuery] = useState([])

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}/currencies/ticker?search=${query}&key=${api.key}&ids=${query}&interval=1d,30d&convert=EUR&per-page=100&page=1`)
        .then(res => res.json())
        .then(result => setCrypto(result))
        .then(setQuery(''))

    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear()
    let yearAbr = String(year).slice(2, 4)
    return `${day} ${month} ${date} '${yearAbr} `
  }
  return (
    <>
      <div className="searchBox">
        <input
          type="text"
          className="searchBar"
          placeHolder="Search..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        />
        </div>
        <div className="date">{dateBuilder(new Date())}</div>
                            
        <div className="cryptoBox">
          {crypto.currency}
        </div>

      </>
      )


}

      export default Crypto;
