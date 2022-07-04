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

type SnapshotCallback = (snapshot: DocumentSnapshot<DocumentData>) => void;

export const CreateTags = async (account: string, tag: string) => {
	try {
		await setDoc(doc(dbInstance, USER_COLLECTION, account), {
			tags: [tag],
		});

		return true;
	} catch (error) {
		const msg = (error as FirebaseError).message;
		throw new Error(msg);
	}
};

export const AddTag = async (account: string, tag: string) => {
	try {
		const newTags = arrayUnion(tag);
		await updateDoc(doc(dbInstance, USER_COLLECTION, account), {
			tags: newTags,
		});
	} catch (error) {
		const msg = (error as FirebaseError).message;
		throw new Error(msg);
	}
};

export const GetTags = (account: string, cb: SnapshotCallback) => {
	onSnapshot(doc(dbInstance, USER_COLLECTION, account), cb);
};

export const DeleteTag = async (account: string, tag: string) => {
	try {
		const newTags = arrayRemove(tag);
		await updateDoc(doc(dbInstance, USER_COLLECTION, account), {
			tags: newTags,
		});
	} catch (error) {
		console.log((error as FirebaseError).message);
		return false;
	}
};
