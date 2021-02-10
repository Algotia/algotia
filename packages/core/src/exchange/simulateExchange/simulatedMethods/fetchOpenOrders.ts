import { Exchange as CCXT_Exchange, Params, Order } from "@algotia/ccxt";
import { SimulatedExchangeStore } from "@algotia/types";

type FetchOpenOrders = CCXT_Exchange["fetchOpenOrders"];

const createFetchOpenOrders = (
	store: SimulatedExchangeStore
): FetchOpenOrders => {
	return async (
		symbol?: string,
		since?: number,
		limit?: number,
		params?: Params
	): Promise<Order[]> => {
		return store.openOrders;
	};
};

export default createFetchOpenOrders;
