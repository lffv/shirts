import { ref, watch } from "vue";

export type Currency = "USD" | "EUR" | "GBP";

export interface CurrencyInfo {
  code: Currency;
  symbol: string;
  name: string;
  locale: string;
  rate: number; // Exchange rate relative to USD
}

const currencies: CurrencyInfo[] = [
  { code: "USD", symbol: "$", name: "US Dollar", locale: "en-US", rate: 1 },
  { code: "EUR", symbol: "€", name: "Euro", locale: "pt-PT", rate: 0.92 },
  {
    code: "GBP",
    symbol: "£",
    name: "British Pound",
    locale: "en-GB",
    rate: 0.79,
  },
];

const currentCurrency = ref<Currency>("USD");

export const useCurrency = () => {
  // Load currency from localStorage on first use
  if (typeof window !== "undefined") {
    const savedCurrency = localStorage.getItem("currency") as Currency | null;
    if (savedCurrency && currencies.find((c) => c.code === savedCurrency)) {
      currentCurrency.value = savedCurrency;
    }
  }

  // Watch for currency changes and save to localStorage
  watch(currentCurrency, (newCurrency) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("currency", newCurrency);
    }
  });

  const setCurrency = (currency: Currency) => {
    currentCurrency.value = currency;
  };

  const getCurrentCurrencyInfo = (): CurrencyInfo => {
    return (
      currencies.find((c) => c.code === currentCurrency.value) || currencies[0]
    );
  };

  const convertAmount = (
    amountInUSD: number,
    toCurrency?: Currency
  ): number => {
    const targetCurrency = toCurrency || currentCurrency.value;
    const currencyInfo = currencies.find((c) => c.code === targetCurrency);
    return amountInUSD * (currencyInfo?.rate || 1);
  };

  const formatAmount = (amountInUSD: number, toCurrency?: Currency): string => {
    const targetCurrency = toCurrency || currentCurrency.value;
    const currencyInfo =
      currencies.find((c) => c.code === targetCurrency) || currencies[0];
    const convertedAmount = convertAmount(amountInUSD, targetCurrency);

    return new Intl.NumberFormat(currencyInfo.locale, {
      style: "currency",
      currency: currencyInfo.code,
    }).format(convertedAmount);
  };

  return {
    currentCurrency,
    currencies,
    setCurrency,
    getCurrentCurrencyInfo,
    convertAmount,
    formatAmount,
  };
};
