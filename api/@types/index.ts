export type AddressTRXRef = {
	trx_hash: string;
	block_height: number;
	tx_input_n: number;
	tx_output_n: number;
	value: number;
	ref_balance: number;
	spent: boolean;
	confirmations: number;
	confirmed: string;
	double_spend: boolean;
};

export type AddressResponse = {
	address: string;
	total_received: number;
	total_sent: number;
	balance: number;
	unconfirmed_balance: number;
	final_balance: number;
	n_tx: number;
	unconfirmed_n_tx: number;
	final_n_tx: number;
	txrefs: AddressTRXRef[];
	tx_url: string;
};

export type TransactionResponse = {
	block_hash: string;
	block_height: number;
	block_index: number;
	hash: string;
	addresses: string[];
	total: number;
	fees: number;
	size: number;
	vsize: number;
	preference: string;
	confirmed: string;
	received: string;
	ver: number;
	double_spend: boolean;
	vin_sz: number;
	vout_sz: number;
	confirmations: number;
	confidence: number;
	inputs: {
		prev_hash: string;
		output_index: number;
		script: string;
		output_value: number;
		sequence: number;
		addresses: string[];
		script_type: string;
		age: number;
	}[];
	outputs: {
		value: number;
		script: string;
		spent_by: string;
		addresses: string[];
		script_type: string;
	}[];
};
