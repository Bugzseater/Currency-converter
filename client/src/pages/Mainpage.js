import React, { useEffect, useState } from 'react'
import axios from "axios";


export default function Mainpage() {


    const [date, setDate] = useState(null);
    const [sourceCurrency, setSourceCurrency] = useState("");
    const [targetCurrency, setTargetCurrency] = useState("");
    const [amountInSourceCurrency, setAmountInSourceCurrency] = useState(0);
    const [amountInTargetCurrency, setAmountInTargetCurrency] = useState(0);
    const [currencyNames, setCurrencyNames] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const responce = await axios.get("http://localhost:5000/convert", {
                params:{
                    date,
                    sourceCurrency,
                    targetCurrency,
                    amountInSourceCurrency,
                },
            });
            

            setAmountInTargetCurrency(responce.data);

        } 
        catch (err) {
            console.error(err);
        }
    };

    // get currency
    useEffect(() => {
        const getCurrencyNames = async () => {
            try {

                const responce = await axios.get(
                    "http://localhost:5000/getAllCurrencies"
                );
                setCurrencyNames(responce.data);

            } catch (err) {
                console.error(err);
            }
        };
        getCurrencyNames();
    }, [])

    useEffect(_ => {console.log(currencyNames)}, [currencyNames]);

    return (
        <div>
            <h1 className='lg:mx-32 text-5xl font-bold text-green-500'>
                Convert Your Currency
            </h1>
            <p className='lg:mx-32 opacity-40 text-white py-6'>Welcome to my Project. This is Currency converting app. you can convert your currency with diffrent dates from this app.</p>
            <div className=' mt-5 flex items-center justify-center flex-col'>
                <section className=' w-full lg:w-1/2'>
                    <form onSubmit={handleSubmit}>
                        <div class="mb-4">
                            <label htmlFor={date} class="block mb-2 text-sm font-medium text-white dark:text-white">
                                Date
                            </label>
                            <input
                                onChange={(e) => setDate(e.target.value)}
                                type="date"
                                id={date}
                                name={date}
                                class="bg-gray-50 border border-green-300 text-yellow-900 text-sm rounded-lg focus:ring-green-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                             dark:focus:ring-green-500 dark:focus:border-blue-500" placeholder="Date" required></input>
                        </div>
                        <div class="mb-4">
                            <label htmlFor={sourceCurrency} class="block mb-2 text-sm font-medium text-white dark:text-white">
                                Source Currency
                            </label>
                            <select
                                onChange={(e) => setSourceCurrency(e.target.value)}
                                className="bg-gray-50 border border-green-300 text-yellow-900 text-sm rounded-lg focus:ring-green-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                             dark:focus:ring-green-500 dark:focus:border-blue-500"
                                id={sourceCurrency}
                                name={sourceCurrency}
                                value={sourceCurrency}>

                                <option class='py-2' value="">Select Source Currency</option>
                                {Object.keys(currencyNames).map((currency)=>(
                                    <option key={currency} value={currency}>
                                        {currencyNames[currency]}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div class="mb-4">
                            <label htmlFor={targetCurrency} class="block mb-2 text-sm font-medium text-white dark:text-white">
                                Target Currency
                            </label>
                            <select
                                onChange={(e) => setTargetCurrency(e.target.value)}
                                className="bg-gray-50 border border-green-300 text-yellow-900 text-sm rounded-lg focus:ring-green-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                             dark:focus:ring-green-500 dark:focus:border-blue-500" id={targetCurrency} name={targetCurrency} value={targetCurrency} >

                                <option value="">Select Target Currency</option>
                                <option class='py-2' value="">Select Source Currency</option>
                                {Object.keys(currencyNames).map((currency)=>(
                                    <option key={currency} value={currency}>
                                        {currencyNames[currency]}
                                    </option>
                                ))}

                            </select>
                        </div>
                        <div class="mb-4">
                            <label htmlFor={amountInSourceCurrency} class="block mb-2 text-sm font-medium text-white dark:text-white">
                                Amount in Scourse Currency
                            </label>
                            <input
                                onChange={(e) => setAmountInSourceCurrency(e.target.value)}
                                type="number" id={amountInSourceCurrency} name={amountInSourceCurrency} class="bg-green-50 border border-gray-300 text-yellow-900 text-sm rounded-lg focus:ring-green-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                             dark:focus:ring-green-500 dark:focus:border-blue-500" placeholder="Socure currency" ></input>
                        </div>
                        <button
                            className=' bg-green-600 hover:bg-green-300 text-white font-bold py-2 px-4 rounded-md' >Convert</button>
                    </form>
                </section>
                <section className=' mt-5 bg-yellow-500 text-white font-bold p-3 rounded-lg flex justify-center items-center'>
                {amountInSourceCurrency} {currencyNames[sourceCurrency]} is queals to {" "}
                {amountInTargetCurrency} in {currencyNames[targetCurrency]}
            </section>
            </div>
            
        </div>
    )
}


