export class Pricing {
  priceData = [];

  init(apiUrl) {
    let response;
    fetch(`${apiUrl}/prices`)
      .then((resp) => {
        response = resp;
        return response.json();
      })
      .then((data) => {
        if (!response.ok) {
          throw new Error(response.status + ": " + data.message);
        }
        this.priceData = data;
        console.log("Pricing.init(): " + JSON.stringify(data));
      })
      .catch((error) => {
        console.log("Pricing.init(): " + error.message);
      });
  }

  #nearestPrice(date) {
    return this.priceData.reduce((x, datePrice) => {
      const distance = new Date(date) - new Date(datePrice.from);
      if (distance >= 0 && (!x.distance || distance < x.distance)) {
        return { distance, price: datePrice.price, tariff: datePrice.tariff };
      }
      return x;
    }, {});
  }

  calculate(start, end) {
    if (!this.priceData) {
      return -1;
    }

    // create array of dates between start and end (exclusive)
    const dates = [];
    let d = new Date(start);
    while (d <= new Date(end)) {
      dates.push(new Date(d));
      d.setDate(d.getDate() + 1);
    }
    dates.pop();

    // calculate price
    const priceData = dates.reduce(
      (x, date) => {
        const datePrice = this.#nearestPrice(date);
        x.sum += datePrice.price;
        x.tariffs[datePrice.tariff] = (x.tariffs[datePrice.tariff] || 0) + 1;
        // console.log("x: " + JSON.stringify(x));
        return x;
      },
      { sum: 0, tariffs: {} }
    );

    if (priceData.sum == 0) {
      return "";
    }

    let priceString = "Preis: " + priceData.sum + " CHF (";
    Object.entries(priceData.tariffs).forEach(([tariff, count]) => {
      priceString += count + " x " + tariff + ", ";
    });
    priceString = priceString.slice(0, -2);
    priceString += ")";

    return priceString;
  }
}
