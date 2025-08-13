const currencies = ["GBP", "USD", "EUR", "JPY", "NGN", "AUD", "GMD", "CAD", "INR", "AOA"];


        //populate dropdowns
        const fromSelect = document.getElementById("fromCurrency");
        const toSelect = document.getElementById("toCurrency");

        currencies.forEach(currency => {
            let option1 = document.createElement("option");
            option1.value = option1.text = currency;
            fromSelect.add(option1);

            let option2 = document.createElement("option");
            option2.value = option2.text = currency;
            toSelect.add(option2);
        });

        //set default values
        fromSelect.value = "GBP";
        toSelect.value = "USD";

        //Fetch Exchange Rates
        async function getExchangeRates(fromCurrency, toCurrency) {
            try {
                const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
                const response = await fetch(url);
                const data = await response.json();
                return data.rates[toCurrency] || null;
            } catch (error) {
                console.error("Error fetching exchange rates:", error);
                return null;
            }
        }

        //Convert Currency
        async function convertCurrency() {
            const fromCurrency = fromSelect.value;
            const toCurrency = toSelect.value;
            const amount = parseFloat(document.getElementById("Amount").value);

            const resultDiv = document.getElementById("result");

            if (isNaN(amount)) {
                resultDiv.textContent = "Please enter a valid number.";
                return;
            }

            const exchangeRate = await getExchangeRates(fromCurrency, toCurrency);
            if (exchangeRate) {
                const convertedAmount = (amount * exchangeRate).toFixed(2);
            resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
            } else {
                resultDiv.textContent = "Invalid Currency Code or API issue.";
            }
        }

        //Reset Form
        function resetForm() {
            document.getElementById("Amount").value = "";
            fromSelect.value = "GBP";
            toSelect.value = "USD";
            document.getElementById("result").textContent = "";
        }

        //Exit app
        function exitApp() {
            if (confirm("Are you sure you want to exit?")) {
                window.close();
            }
        }