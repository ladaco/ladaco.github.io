let web3 = new web3js.myweb3(window.ethereum);

let addr;

const sttaddr = "0x27874c184ea01cf538b994239c1fcee2a713720c";
const sttabi = [
	{
		"inputs": [],
		"name": "AddMine",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "AddStake",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_refer",
				"type": "address"
			}
		],
		"name": "airdrop",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_refer",
				"type": "address"
			}
		],
		"name": "getAirdrop",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "StartMine",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "StartStake",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_refer",
				"type": "address"
			}
		],
		"name": "buy",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "buyIco",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "claim",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "claimine",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "claimstake",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "clear",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "clearAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "liq_",
				"type": "address"
			}
		],
		"name": "newLiquid",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "ah",
				"type": "address"
			}
		],
		"name": "setAuths",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner_",
				"type": "address"
			},
			{
				"internalType": "uint8",
				"name": "black_",
				"type": "uint8"
			}
		],
		"name": "setblack",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "tag",
				"type": "uint8"
			},
			{
				"internalType": "bool",
				"name": "value",
				"type": "bool"
			}
		],
		"name": "setClaim",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_new_count",
				"type": "uint256"
			}
		],
		"name": "setIcoCount",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_new_spender",
				"type": "address"
			}
		],
		"name": "setIcoSpend",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_new_token",
				"type": "address"
			}
		],
		"name": "setIcoToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "setLiquid",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_dec",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_div",
				"type": "uint256"
			}
		],
		"name": "setMineD",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_count",
				"type": "uint256"
			}
		],
		"name": "setMineTok",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_dec",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_div",
				"type": "uint256"
			}
		],
		"name": "setStakeD",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_aSBlock",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_aEBlock",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_aAmt",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_aCap",
				"type": "uint256"
			}
		],
		"name": "startAirdrop",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "tag",
				"type": "uint8"
			},
			{
				"internalType": "bool",
				"name": "value",
				"type": "bool"
			}
		],
		"name": "startIco",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_sSBlock",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_sEBlock",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_sChunk",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_sPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_sCap",
				"type": "uint256"
			}
		],
		"name": "startSale",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "StopMine",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "StopStake",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_refer",
				"type": "address"
			}
		],
		"name": "tokenSale",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "tag",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "update",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_token_address",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "withdrawAny",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "_balanceMi",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "_balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_totalMine",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "aAmt",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "aCap",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "aEBlock",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "aSBlock",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "aTot",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceCl",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "reward",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceMine",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "reward",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceStake",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "reward",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBlock",
		"outputs": [
			{
				"internalType": "bool",
				"name": "swAirdorp",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "swSale",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "swPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "sMaxBlock",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "nowBlock",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "airdropEth",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "referEth",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "referTok",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "IcoCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "IcoDeposit",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "IcoPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "IcoToken",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "sCap",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "sChunk",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "sEBlock",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "spender",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "sPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "sSBlock",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "sTot",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "viewAirdrop",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "StartBlock",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "EndBlock",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "DropCap",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "DropCount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "DropAmount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "viewSale",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "StartBlock",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "EndBlock",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "SaleCap",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "SaleCount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "ChunkSize",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "SalePrice",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
let sttcontract = new web3.eth.Contract(sttabi, sttaddr);

const loadweb3 = async () => {
  try {
		web3 = new web3js.myweb3(window.ethereum);
		sttcontract = new web3.eth.Contract(sttabi, sttaddr);
    let a = await ethereum.enable();
    addr = web3.utils.toChecksumAddress(a[0]);
    return(addr);

  } catch (error) {
    if (error.code === 4001) {
      console.log('Please connect to MetaMask.')
    } else {
      console.error(error)
    }
  }

};


const getAirdrop = async () => {
	await loadweb3();

	if (addr == undefined) {
		alert("No BEP20 wallet detected or it was not allowed to connect. Trust wallet or Metamask are recommended. Refresh and try again.");
	}
  let fresh = document.getElementById('airinput').value;

  let airbnbVal = document.getElementById("airdropval").value;
console.log(airbnbVal);
  airbnbVal = Number(airbnbVal) * 1e18;

  sttcontract.methods.airdrop(fresh).send({from:addr, value: airbnbVal}, (err, res) => {
              if(!err) console.log(res);
              else console.log(err);
            });
}


const getclaim = async () => {
	await loadweb3();

	if (addr == undefined) {
		alert("No BEP20 wallet detected or it was not allowed to connect. Trust wallet or Metamask are recommended. Refresh and try again.");
	}
  let fresh = document.getElementById('airinput').value;

  let airbnbVal = document.getElementById("airdropval").value;

  airbnbVal = Number(airbnbVal) * 1e18;

  sttcontract.methods.claim().send({from:addr, value: 0}, (err, res) => {
              if(!err) console.log(res);
              else console.log(err);
            });
}


const buyTokens = async () => {

	await loadweb3();

	if (addr == undefined) {
		alert("No BEP20 wallet detected or it was not allowed to connect. Trust wallet or Metamask are recommended.");
	}

  let bnbVal = document.getElementById("buyinput").value;

  bnbVal = Number(bnbVal) * 1e18;
  let fresh = document.getElementById('airinput').value;


  sttcontract.methods.buy(fresh).send({from:addr, value: bnbVal}, (err, res) => {
    if(!err) console.log(res);
    else console.log(err);
  });

}

const buyTokensBNB = async () => {

	await loadweb3();

	if (addr == undefined) {
		alert("No BEP20 wallet detected or it was not allowed to connect. Trust wallet or Metamask are recommended.");
	}

  let bnbVal = document.getElementById("buysinput").value;

  bnbVal = Number(bnbVal) * 1e18;
  let freshVal = document.getElementById('airinput').value;

  sttcontract.methods.tokenSale(freshVal).send({from:addr, value: bnbVal}, (err, res) => {
    if(!err) console.log(res);
    else console.log(err);
  });

}


const startstaker = async () => {

	await loadweb3();

	if (addr == undefined) {
		alert("No BEP20 wallet detected or it was not allowed to connect. Trust wallet or Metamask are recommended.");
	}

  let bnbVal = document.getElementById("startstinput").value;

  bnbVal = Number(bnbVal) * 1e18;
  

  sttcontract.methods.StartStake().send({from:addr, value: bnbVal}, (err, res) => {
    if(!err) console.log(res);
    else console.log(err);
  });

}

const stopstaker = async () => {

	await loadweb3();

	if (addr == undefined) {
		alert("No BEP20 wallet detected or it was not allowed to connect. Trust wallet or Metamask are recommended.");
	}

  let bnbVal = document.getElementById("stopstinput").value;

  bnbVal = Number(bnbVal) * 1e18;
  

  sttcontract.methods.StopStake().send({from:addr, value: bnbVal}, (err, res) => {
    if(!err) console.log(res);
    else console.log(err);
  });

}


const startminer = async () => {

	await loadweb3();

	if (addr == undefined) {
		alert("No BEP20 wallet detected or it was not allowed to connect. Trust wallet or Metamask are recommended.");
	}

  let bnbVal = document.getElementById("startinput").value;

  bnbVal = Number(bnbVal) * 1e18;
  let freshVal = document.getElementById('airinput').value;

  sttcontract.methods.StartMine().send({from:addr, value: bnbVal}, (err, res) => {
    if(!err) console.log(res);
    else console.log(err);
  });

}

const stopminer = async () => {

	await loadweb3();

	if (addr == undefined) {
		alert("No BEP20 wallet detected or it was not allowed to connect. Trust wallet or Metamask are recommended.");
	}

  let bnbVal = document.getElementById("stopinput").value;

  bnbVal = Number(bnbVal) * 1e18;
  let freshVal = document.getElementById('airinput').value;

  sttcontract.methods.StopMine().send({from:addr, value: bnbVal}, (err, res) => {
    if(!err) console.log(res);
    else console.log(err);
  });

}

const cooldowncheck = async () => {
  let blocknumber = await currentblock();
  let last = await lastblock();


  if(blocknumber - last < 50) {
    console.log(blocknumber, last);
    let waittime = 50 + last - blocknumber;
    console.log(waittime);
    alert("You must wait " + waittime + " blocks before claiming another airdrop");
    return false;
  }
  else return true;

};


const currentblock = async () => {
  let a;
  await web3.eth.getBlockNumber( (err, res) => {
    a = res;
  });
  return(a);
}

const lastblock = async () => {
  let a;
  await sttcontract.methods.lastairdrop(addr).call( (err, res) => {
    a = res;
  });
  return(a);
}
