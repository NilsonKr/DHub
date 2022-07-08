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

import { dbInstance } from '../';

import { USER_COLLECTION } from '@utils/index';

type LinkedDocs = { [k: number]: string[] };

export const AddTagsToItem = async (
	account: string,
	tagIndex: number,
	itemId: number,
	current: LinkedDocs
) => {
	try {
		await updateDoc(doc(dbInstance, USER_COLLECTION, account), {
			linkedDocs: { ...current, [itemId]: [...current[itemId], tagIndex] },
		});
	} catch (error) {
		console.log(error);
		const msg = (error as FirebaseError).message;
		throw new Error(msg);
	}
};
