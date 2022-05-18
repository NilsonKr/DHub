export const DhubContract: IDhubContract = {
	address: {
		4: '0x93A28F3EA47189923A12CB4335e5Aee438E59666',
	},
	abi: [
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: 'address',
					name: 'from',
					type: 'address',
				},
				{
					indexed: true,
					internalType: 'address',
					name: 'to',
					type: 'address',
				},
				{
					components: [
						{
							internalType: 'uint8',
							name: 'id',
							type: 'uint8',
						},
						{
							internalType: 'string',
							name: 'url',
							type: 'string',
						},
						{
							internalType: 'string',
							name: 'title',
							type: 'string',
						},
						{
							internalType: 'string',
							name: 'description',
							type: 'string',
						},
						{
							internalType: 'string',
							name: 'uploadDate',
							type: 'string',
						},
						{
							internalType: 'uint256',
							name: 'size',
							type: 'uint256',
						},
					],
					indexed: false,
					internalType: 'struct Dhub.UserFile',
					name: 'file',
					type: 'tuple',
				},
			],
			name: 'Transfer',
			type: 'event',
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: 'address',
					name: 'owner',
					type: 'address',
				},
				{
					components: [
						{
							internalType: 'uint8',
							name: 'id',
							type: 'uint8',
						},
						{
							internalType: 'string',
							name: 'url',
							type: 'string',
						},
						{
							internalType: 'string',
							name: 'title',
							type: 'string',
						},
						{
							internalType: 'string',
							name: 'description',
							type: 'string',
						},
						{
							internalType: 'string',
							name: 'uploadDate',
							type: 'string',
						},
						{
							internalType: 'uint256',
							name: 'size',
							type: 'uint256',
						},
					],
					indexed: false,
					internalType: 'struct Dhub.UserFile',
					name: 'file',
					type: 'tuple',
				},
			],
			name: 'Upload',
			type: 'event',
		},
		{
			inputs: [
				{
					internalType: 'uint8',
					name: 'position',
					type: 'uint8',
				},
				{
					internalType: 'string',
					name: 'title',
					type: 'string',
				},
				{
					internalType: 'string',
					name: 'description',
					type: 'string',
				},
			],
			name: 'editFile',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [
				{
					internalType: 'string',
					name: 'field',
					type: 'string',
				},
				{
					internalType: 'string',
					name: 'value',
					type: 'string',
				},
			],
			name: 'editUser',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: '',
					type: 'address',
				},
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256',
				},
			],
			name: 'filesByUser',
			outputs: [
				{
					internalType: 'uint8',
					name: 'id',
					type: 'uint8',
				},
				{
					internalType: 'string',
					name: 'url',
					type: 'string',
				},
				{
					internalType: 'string',
					name: 'title',
					type: 'string',
				},
				{
					internalType: 'string',
					name: 'description',
					type: 'string',
				},
				{
					internalType: 'string',
					name: 'uploadDate',
					type: 'string',
				},
				{
					internalType: 'uint256',
					name: 'size',
					type: 'uint256',
				},
			],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [
				{
					internalType: 'uint8',
					name: 'position',
					type: 'uint8',
				},
			],
			name: 'getFileByPosition',
			outputs: [
				{
					components: [
						{
							internalType: 'uint8',
							name: 'id',
							type: 'uint8',
						},
						{
							internalType: 'string',
							name: 'url',
							type: 'string',
						},
						{
							internalType: 'string',
							name: 'title',
							type: 'string',
						},
						{
							internalType: 'string',
							name: 'description',
							type: 'string',
						},
						{
							internalType: 'string',
							name: 'uploadDate',
							type: 'string',
						},
						{
							internalType: 'uint256',
							name: 'size',
							type: 'uint256',
						},
					],
					internalType: 'struct Dhub.UserFile',
					name: '',
					type: 'tuple',
				},
			],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [],
			name: 'getFilesByUser',
			outputs: [
				{
					components: [
						{
							internalType: 'uint8',
							name: 'id',
							type: 'uint8',
						},
						{
							internalType: 'string',
							name: 'url',
							type: 'string',
						},
						{
							internalType: 'string',
							name: 'title',
							type: 'string',
						},
						{
							internalType: 'string',
							name: 'description',
							type: 'string',
						},
						{
							internalType: 'string',
							name: 'uploadDate',
							type: 'string',
						},
						{
							internalType: 'uint256',
							name: 'size',
							type: 'uint256',
						},
					],
					internalType: 'struct Dhub.UserFile[]',
					name: '',
					type: 'tuple[]',
				},
			],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [],
			name: 'login',
			outputs: [
				{
					components: [
						{
							internalType: 'string',
							name: 'name',
							type: 'string',
						},
						{
							internalType: 'string',
							name: 'profileUrl',
							type: 'string',
						},
					],
					internalType: 'struct Dhub.User',
					name: '',
					type: 'tuple',
				},
			],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [
				{
					internalType: 'string',
					name: 'name',
					type: 'string',
				},
				{
					internalType: 'string',
					name: 'profileUrl',
					type: 'string',
				},
			],
			name: 'register',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [
				{
					internalType: 'uint8',
					name: 'index',
					type: 'uint8',
				},
			],
			name: 'removeFile',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: 'owner',
					type: 'address',
				},
				{
					internalType: 'address',
					name: 'destiny',
					type: 'address',
				},
				{
					internalType: 'uint8',
					name: 'filePosition',
					type: 'uint8',
				},
			],
			name: 'transferFile',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [
				{
					components: [
						{
							internalType: 'uint8',
							name: 'id',
							type: 'uint8',
						},
						{
							internalType: 'string',
							name: 'url',
							type: 'string',
						},
						{
							internalType: 'string',
							name: 'title',
							type: 'string',
						},
						{
							internalType: 'string',
							name: 'description',
							type: 'string',
						},
						{
							internalType: 'string',
							name: 'uploadDate',
							type: 'string',
						},
						{
							internalType: 'uint256',
							name: 'size',
							type: 'uint256',
						},
					],
					internalType: 'struct Dhub.UserFile',
					name: 'file',
					type: 'tuple',
				},
			],
			name: 'uploadFile',
			outputs: [
				{
					internalType: 'uint8',
					name: '',
					type: 'uint8',
				},
			],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: '',
					type: 'address',
				},
			],
			name: 'users',
			outputs: [
				{
					internalType: 'string',
					name: 'name',
					type: 'string',
				},
				{
					internalType: 'string',
					name: 'profileUrl',
					type: 'string',
				},
			],
			stateMutability: 'view',
			type: 'function',
		},
	],
};
