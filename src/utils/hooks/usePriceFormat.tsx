import { useMemo } from 'react';

type Currency = 'ARS' | 'USD' | 'EUR' | 'GBP' | 'JPY' | 'MXN' | string; 

interface UsePriceFormatOptions {
    amount: number;
    currency?: Currency;
    locales?: string;
}

const usePriceFormat = ({
    amount,
    currency = 'ARS',
    locales = 'es-AR',
}: UsePriceFormatOptions): string => {
    const formattedPrice = useMemo(() => {
        return new Intl.NumberFormat(locales, {
            style: 'currency',
            currency: currency,
        }).format(amount);
    }, [amount, currency, locales]);

    return formattedPrice;
};

export default usePriceFormat;
