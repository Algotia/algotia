import { Currency } from "@algotia/client";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

interface SelectInitialBalanceProps {
    id: string;
    pair: string;
    currency: string;
    setCurrency: Dispatch<SetStateAction<string>>;
    amount: number;
    setAmount: Dispatch<SetStateAction<number>>;
    currencyList: Record<string, Currency> | undefined;
    onChange: (value: { currency: string; amount: number }) => void;
    FormItem: FC;
}

const SelectInitialBalance: FC<SelectInitialBalanceProps> = (props) => {
    const {
        id,
        pair,
        currencyList,
        FormItem,
        currency,
        setCurrency,
        amount,
        setAmount,
    } = props;
    const [error, setError] = useState(false);

    return (
        <>
            <FormItem>
                <Autocomplete
                    id={id + "-autocomplete"}
                    fullWidth={true}
                    disabled={!pair}
                    options={Object.keys(currencyList || {})}
                    getOptionLabel={(c) => c}
                    value={currency}
                    onChange={(_, val) => {
                        setCurrency(val || "");
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Select a currency"
                            variant="standard"
                        />
                    )}
                />
            </FormItem>
            <FormItem>
                <TextField
                    id={id + "-text-field"}
                    disabled={!pair}
                    fullWidth={true}
                    label={"Amount"}
                    value={amount}
                    error={typeof amount === "string"}
                    onChange={(e) => {
                        let val: string | number = e.target.value;
                        if (!isNaN(Number(val))) {
                            error && setError(false);
                            val = Number(val);
                            setAmount(val);
                        } else {
                            setError(true);
                        }
                    }}
                />
            </FormItem>
        </>
    );
};

export default SelectInitialBalance;
