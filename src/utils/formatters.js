export const getMonth = (date) => {
  let splitted = date.split("-");
  let num = Number.parseInt(splitted[1]);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[num - 1];
};

export const getExchange = (month) => {
  const exchange = [
    {
      month: "2021-01",
      price: 150.43,
    },
    {
      month: "2021-02",
      price: 146.22,
    },
    {
      month: "2021-03",
      price: 150.75,
    },
    {
      month: "2021-04",
      price: 144.73,
    },
    {
      month: "2021-05",
      price: 148.52,
    },
    {
      month: "2021-06",
      price: 161.9,
    },
    {
      month: "2021-07",
      price: 172.9,
    },
    {
      month: "2021-08",
      price: 180.55,
    },
    {
      month: "2021-09",
      price: 184.23,
    },
    {
      month: "2021-10",
      price: 182.81,
    },
    {
      month: "2021-11",
      price: 200.17,
    },
    {
      month: "2021-12",
      price: 193.74,
    },
    {
      month: "2022-01",
      price: 211.39,
    },
    {
      month: "2022-02",
      price: 213.18,
    },
    {
      month: "2022-03",
      price: 195.42,
    },
    {
      month: "2022-04",
      price: 151.43,
    },
  ];
  const data = exchange.find((elem) => elem.month === month);
  // if(data === undefined) throw new Error(`No se encontró cotización para ${month}`)
  if (data === undefined) return 150;
  return data.price;
};

export const getTotal = (list) => {
  let total = 0;
  list.forEach((elem) => (total += Number.parseInt(elem.amount)));
  return total;
};

export const getBalanceColor = (balance) =>
  balance > 0 ? "green" : balance < 0 ? "red" : "white";

export const truncateDate = (date) => date.substring(0, 10);

export const commaToPoint = (float) => {
  const [integers, decimals] = float.toString().split(".");
  let formattedIntegers =
    integers.length > 3
      ? integers
          .split("")
          .reverse()
          .join("")
          .match(/.{1,3}/g)
          .map((e) => e.split("").reverse().join(""))
          .reverse()
          .join(".")
      : integers;
  return `${formattedIntegers},${decimals || "00"}`;
};
