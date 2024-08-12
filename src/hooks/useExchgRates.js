import React from 'react'
import Freecurrencyapi from "@everapi/freecurrencyapi-js";
import { useEffect } from "react";
import { useState } from "react";

export default function useExchgRates(fromCur, toCur) {
    const [exchgRates, setExchgRates] = useState(0);

    const freecurrencyapi = new Freecurrencyapi(
        "fca_live_6tXlsTcw75BptkwhMgoqnPfCNgtbDpXbmyB0dKuu"
    );
    
    useEffect(() => {

        freecurrencyapi.latest({
            base_currency: fromCur.value,
            currencies: toCur.value
        }).then(response => {
            console.log(response.data[toCur.value]);
            
            setExchgRates(response.data[toCur.value]);
        });

    },[fromCur, toCur])
    
    return exchgRates;
}
