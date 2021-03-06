import React, { useState, useEffect } from "react";
import axios from "axios";
import { Section, SearchDiv } from "./styles/Search.styled";
import Tokens from "./Tokens";
import WatchList from "./WatchList";

function Search() {
  const [token, setToken] = useState([]);
  const [search, setSearch] = useState("");
  const [savedToken, setSavedToken] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"
      )
      .then((res) => {
        setToken(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const addCardHandler = (token) => {
    let addToken = {
      key: token.id,
      name: token.name,
      image: token.image,
      current_price: token.current_price,
      symbol: token.symbol,
    };

    const filteredArr = savedToken.filter(
      (token) => token.key === addToken.key
    );

    if (filteredArr.length === 0) {
      setSavedToken((savedToken) => [...savedToken, addToken]);
    }
  };

  const deleteCardHandler = (token) => {
    const newCardArr = savedToken.filter((elem) => elem.key !== token.key);
    console.log(newCardArr);
    setSavedToken((savedToken) => [...newCardArr]);
  };

  const onChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  // console.log(token);
  // console.log(search);
  // console.log(savedToken);

  return (
    <>
      <WatchList savedToken={savedToken} clicked={deleteCardHandler} />
      <Section>
        <SearchDiv>
          <form>
            <input
              type="text"
              placeholder="Search"
              onChange={onChangeHandler}
            />
          </form>
        </SearchDiv>
      </Section>
      <Tokens token={token} search={search} clicked={addCardHandler} />
    </>
  );
}

export default Search;
