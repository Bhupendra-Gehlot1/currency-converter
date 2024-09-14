import { useState } from "react";
import InputBox from "./components/InputBox";
import background from "../src/assets/property (32).jpg";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  
  const convert = () => {        
    setConvertedAmount(amount * currencyInfo[to]);
  };

  const swap = () => {
    setAmount(convertedAmount);
    setConvertedAmount(amount);
    setTo(from);
    setFrom(to);
  };
  return (
    <>
      <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-no-repeat bg-cover"
        style={{ backgroundImage: `url('${background}')` }}
      >
        <div className="w-full">
          <div className="w-full max-w-md m-auto border border-gray-50 rounded-lg p-5 backdrop-blur-sm bg-white/30">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                convert();
              }}
            >
              <div className="w-full mb-1">
                <InputBox
                  label="from"
                  amount={amount}
                  currencyOptions={options}
                  onAmountChange={(amount) => setAmount(amount)}
                  onCurrencyChange={(currency) => setFrom(currency)}
                  selectCurrency={from}
                />
              </div>
              <div className="relative w-full h-0.5">
                <button
                  type="button"
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-white rounded-md bg-blue-500 text-white px-2 py-0.5"
                  onClick={swap}
                >
                  swap
                </button>
              </div>
              <div className="w-full mb-1">
                <InputBox
                  label="To"
                  amount={convertedAmount}
                  currencyOptions={options}
                  onAmountChange={(convertedAmount) =>
                    setConvertedAmount(convertedAmount)
                  }
                  onCurrencyChange={(currency) => setTo(currency)}
                  amountDisable={true}
                  selectCurrency={to}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg"
                onClick={convert}
              >
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
