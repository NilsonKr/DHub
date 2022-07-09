import {
	doc,
	collection,
	arrayUnion,
	arrayRemove,
	setDoc,
	updateDoc,
	onSnapshot,
	DocumentData,
	DocumentSnapshot,
} from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';

import { dbInstance } from '..';

import { USER_COLLECTION } from '@utils/index';
import { DocTags } from '@roottypes/gallery';

export const AddTagsToItem = async (
	account: string,
	tagsIndex: number[],
	itemId: number,
	current: DocTags
) => {
	try {
		await updateDoc(doc(dbInstance, USER_COLLECTION, account), {
			linkedDocs: { ...current, [itemId]: [...current[itemId], ...tagsIndex] },
		});
	} catch (error) {
		console.log(error);
		const msg = (error as FirebaseError).message;
		throw new Error(msg);
	}
};
