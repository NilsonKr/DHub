import { doc, updateDoc } from 'firebase/firestore'
import { FirebaseError } from 'firebase/app'

import { dbInstance } from '..'

import { USER_COLLECTION } from '@utils/index'
import { DocTags } from '@roottypes/gallery'

export const AddTagsToItem = async (
  account: string,
  tagsIndex: number[],
  itemId: number,
  current: DocTags
) => {
  try {
    const newTags = current[itemId] ? [...current[itemId], ...tagsIndex] : [...tagsIndex]
    await updateDoc(doc(dbInstance, USER_COLLECTION, account), {
      linkedDocs: { ...current, [itemId]: newTags },
    })
  } catch (error) {
    const msg = (error as FirebaseError).message
    throw new Error(msg)
  }
}

export const DeleteTagsFrom = async (
  account: string,
  index: number,
  itemId: number,
  current: DocTags
) => {
  try {
    const newTags = [...current[itemId]]
    newTags.splice(index, 1)
    await updateDoc(doc(dbInstance, USER_COLLECTION, account), {
      linkedDocs: { ...current, [itemId]: [...newTags] },
    })
  } catch (error) {
    const msg = (error as FirebaseError).message
    throw new Error(msg)
  }
}

export const ClearTagsFrom = async (
  account: string,
  itemId: string,
  current: DocTags
) => {
  try {
    const newDicc = { ...current }
    delete newDicc[itemId]

    await updateDoc(doc(dbInstance, USER_COLLECTION, account), {
      linkedDocs: newDicc,
    })
  } catch (error) {
    const msg = (error as FirebaseError).message
    throw new Error(msg)
  }
}
