import { Exchange, Order, Balances, Balance } from "@algotia/ccxt";
import { StrategyError } from "../errors";

export const AllowedExchangeIDs = ["binance", "kucoin", "bitfinex"] as const;

export type ExchangeID = typeof AllowedExchangeIDs[number];

export type InitialBalance = Record<string, number>;

export interface OHLCV_Candle {
	timestamp: number;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
}

export { Exchange };

export interface SimulatedExchange extends InstanceType<typeof Exchange> {
	simulated: true;
	derviesFrom?: ExchangeID;
}

export interface SimulatedExchangeStore {
	currentTime: number;
	currentPrice: number;
	balance: { [key: string]: Balance };
	openOrders: Order[];
	closedOrders: Order[];
	errors: StrategyError[];
}

export interface SimulatedExchangeResult {
	fillOrders: (candle: OHLCV_Candle) => void;
	updateContext: (time: number, price: number) => void;
	flushStore: () => void;
	store: SimulatedExchangeStore;
	exchange: SimulatedExchange;
}
