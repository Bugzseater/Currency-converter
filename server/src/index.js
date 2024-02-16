const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

//middle weres
app.use(express.json());
app.use(cors());


//all currency
app.get("/getAllCurrencies", async (req, res) => {
    const nameURL = "https://openexchangerates.org/api/currencies.json?app_id=5abea1487b334686a2276d116699da57";

    try {

        const namesResponse = await axios.get(nameURL);
        const nameData = namesResponse.data;

        return res.json(nameData);

    } catch (err) {
        console.error(err);

    }
})


app.get("/convert", async (req, res) => {
    const {sourceCurrency, targetCurrency, amountInSourceCurrency, date } = 
    req.query;

    try {
        const dataURL = 'https://openexchangerates.org/api/historical/2023-01-06.json?app_id=5abea1487b334686a2276d116699da57';
        {date}

        const dataResponce = await axios.get(dataURL);
        const rates = dataResponce.data.rates;

        const sourcerate = rates[sourceCurrency];
        const targetrates = rates[targetCurrency];

        const targetamount = (targetrates / sourcerate) * amountInSourceCurrency;

        return res.json(targetamount.toFixed(2));

    } catch (err) {
        console.error(err);
        
    }
});


//listen to port
app.listen(5000, () => {
    console.log("server started")
})


