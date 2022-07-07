import { useState } from 'react';

type ReturnProps = {
	tags: Ttag[];
	selected: Ttag[];
	setTagsState: (tags: Ttag[]) => void;
	toggleSelect: (tag: Ttag) => void;
	resetSelected: () => void;
};

export const useTags = (initialTags: string[] = []): ReturnProps => {
	const [tags, setTags] = useState<Ttag[]>(initialTags);
	const [selected, setSelectedTags] = useState<Ttag[]>([]);

	const toggleSelect = (tag: Ttag) => {
		if (selected.includes(tag)) {
			const newSelected = [...selected];
			const tagIdx = selected.findIndex(t => t === tag);

			newSelected.splice(tagIdx, 1);
			setSelectedTags(newSelected);
		} else {
			setSelectedTags(prev => [...prev, tag]);
		}
	};

	const resetSelected = () => setSelectedTags([]);

	return {
		tags,
		selected,
		resetSelected,
		setTagsState: (tags: Ttag[]) => setTags(tags),
		toggleSelect,
	};
};
