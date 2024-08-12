import React from "react";

import Freecurrencyapi from "@everapi/freecurrencyapi-js";
import { useEffect } from "react";
import { useState } from "react";

function useCurrName() {
  const [allCurrencies, setAllCurrencies] = useState([]);

  const freecurrencyapi = new Freecurrencyapi(
    "fca_live_6tXlsTcw75BptkwhMgoqnPfCNgtbDpXbmyB0dKuu"
  );

  useEffect(() => {
    try {
      freecurrencyapi
        .currencies()
        .then((res) => res["data"])
        .then((res) =>
          setAllCurrencies(
            Object.keys(res).map((key) => ({
              value: res[key].code,
              label: res[key].name,
            }))
          )
        );

      /*
        BIGGEST LESSON WHILE HANDLING ASYNC STUFF

        here i first used two states data and allcurrencies but all currencies was dependent on data
        so when the async stuff would run allcurrencies always took the empty value of data
        and then when setData used to trigger re-render since this useeffect runs only on mount, it won't run]
        hence, allcurrencies won't get changed

        WRONG CODE:
        freecurrencyapi
        .currencies()
        .then((res) => setData(res["data"]))

        setAllCurrencies(                             //sync code
            Object.keys(data).map((key) => ({
              value: data[key].code,
              label: data[key].name,
            }))

        Doubts:
        why was it working fine on saving any file
        but not after reloading the browser


        Bottom line is:
        don't depend any state on any other asynchronous state
        */

      // When you use setAllCurrencies((prev) => prev.push(obj)),
      // you are attempting to pass the result of push (an operation) to setAllCurrencies, which expects an array.

      // if i don't put all that part in useEffect, it'll go in an infinite loop.
    } catch (error) {
      console.error("Error fetching currencies:", error);
    }
  }, []);

  return allCurrencies;
}

export default useCurrName;
