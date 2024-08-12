import React, { useState } from "react";
import Select from "react-select";

function InputBox({
  toOrFrom,
  defaultCurrency,
  allCurrencies = [],
  onCurrencyChange,
  amount,
  onAmountChange,
  amountDisable = false, //this is because in the result input i want to make it readOnly
}) {
  console.log(allCurrencies.length);

  return (
    <div className="flex gap-8 bg-white p-6 rounded-xl [ shadow-black/10 shadow-xl ]">
      <div id="left-div" className="flex flex-col gap-4">
        <label className="text-gray-400">{toOrFrom}</label>

        {/* to be able to access this value we used a state and then to be able to change it we'll have to pass and onChange function as well */}

        {/* this step attribute is used to allow decimal values */}
        <input
          type="number"
          step="any"
          value={amount}
          onChange={onAmountChange}
          min="0"
          className="focus:outline-none"
          disabled={amountDisable}
        />
      </div>
      <div id="right-div" className="flex flex-col gap-4">
        <label className="text-gray-400">Currency type</label>

        <Select
        classNamePrefix="custom-select"
          styles={{
            dropdownIndicator: (provided, state) => ({
                ...provided,
                color: state.isFocused ? 'blue' : 'gray',  // Change color based on focus
                padding: 4,  // Adjust padding around the arrow
                transition: 'all 0.2s',  // Smooth transition on focus
                transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null, // Rotate arrow when open
              }),
            indicatorSeparator: () => ({
                display: 'none',  
           }),
            control: (baseStyles, state) => ({
              ...baseStyles,
              width : "10em",
              backgroundColor : "#D3D3D3",
              border : "none",
              borderRadius : "10px",

            }),
            menuList: (provided) => ({
                ...provided,
                maxHeight: '200px',  // Max height for the dropdown list (scrollable)
                overflowY: 'auto',  // Enables scrolling
              }),
          }}
          value={defaultCurrency}
          onChange={onCurrencyChange}
          options={allCurrencies}
        />
      </div>
    </div>
  );
}

export default InputBox;
