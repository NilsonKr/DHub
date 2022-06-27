import { useState } from 'react';

type HookShape = <ItemType>(initial: ItemType[]) => {
	items: ItemType[];
	setItems: (newItems: ItemType[]) => void;
	handleSearch: (key: string, value: string) => void;
};

export const useSearch: HookShape = initial => {
	const [items, setItems] = useState(initial);
	const [original, setOriginal] = useState(initial);

	const handleSearch = (key: string, value: string) => {
		//Reset items
		if (value === '') {
			setItems(original);
			return;
		}

		//Cover more search cases
		if (items.length < 2) {
			setItems(
				original.filter(el => el[key].toLowerCase().includes(value.toLowerCase()))
			);
		} else {
			setItems(prev => {
				return prev.filter(el => el[key].toLowerCase().includes(value.toLowerCase()));
			});
		}
	};

	const handleSetItems = newItems => {
		setItems(newItems);
		setOriginal(newItems);
	};

	return { items, setItems: handleSetItems, handleSearch };
};
