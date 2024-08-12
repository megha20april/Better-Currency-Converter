import { useState } from "react";
import useCurrName from "./hooks/useCurrName";
import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle';
import InputBox from "./Components/InputBox";
import useExchgRates from "./hooks/useExchgRates";

function App() {

  const [fromCur, setFromCur] = useState({ value: "USD", label: "US Dollar" });
  const [toCur, setToCur] = useState({ value: "INR", label: "Indian Rupee" });

  const [givenAmountValue, setGivenAmountValue] = useState(0);
  const [calculatedAmountValue, setCalculatedAmountValue] = useState(0);

  const allCurrencies = useCurrName();
  console.log("inside app:",allCurrencies);

  const conversionRate = useExchgRates(fromCur, toCur);

  const swap = () => {
    setFromCur(toCur)
    setToCur(fromCur)
    setCalculatedAmountValue(0)
    setGivenAmountValue(0)
  }

  const conversion = () => {
    setCalculatedAmountValue(givenAmountValue * conversionRate)
  }
  

  return (
  <>
  <div
        id="background"
        className="flex fixed inset-0 justify-center items-center"
      >
        <div className="relative flex flex-col gap-6 justify-center items-start p-8 bg-gradient-to-r from-cyan-500 to-blue-500 w-1/3 h-full">
          <h1 className="text-white text-6xl font-bold font-Manrope">
            Currency
          </h1>
          <h1 className="text-white text-6xl font-bold -mt-5 ml-2 font-Manrope">
          <SwapVerticalCircleIcon fontSize="large" />
            <span className="ml-2">Converter</span>
          </h1>

          <p className="text-blue-200 text-justify">
            Convert currencies effortlessly with our user-friendly currency
            converter. Get real-time exchange rates, swap between currencies,
            and see instant results with just a few clicks.
          </p>
        </div>

        <div
          className="h-full relative w-2/3"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/936722/pexels-photo-936722.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
          }}
        >
          <div
            id="card"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm p-4 rounded-xl [ shadow-black/70 shadow-2xl ]"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                conversion()
              }}
              className="flex flex-col gap-6 "
            >
              <InputBox
                toOrFrom="To"
                defaultCurrency={fromCur}
                allCurrencies={allCurrencies}
                onCurrencyChange={(fromCur) => setFromCur(fromCur)}
                amount={givenAmountValue}
                onAmountChange={(e) => setGivenAmountValue(e.target.value)}
              />

              <button
                onClick={swap}
                className="absolute top-40 left-1/2 -translate-x-1/2 -translate-y-3/4 bg-blue-500 text-white px-2 py-1 border-2 border-white rounded-lg "
              >
                <SwapVerticalCircleIcon />
              </button>

              <InputBox
                toOrFrom="From"
                defaultCurrency={toCur}
                allCurrencies={allCurrencies}
                onCurrencyChange={(toCur) => setToCur(toCur)}
                amount={calculatedAmountValue}
                onAmountChange={(e) => setCalculatedAmountValue(e.target.value)}
                amountDisable
              />

              <button className="bg-blue-500 text-white p-4 rounded-lg [ shadow-black/10 shadow-xl ]">
                Convert {fromCur.value} to {toCur.value}
              </button>
            </form>
          </div>
        </div>
      </div>
  </>
  );
}

export default App;
