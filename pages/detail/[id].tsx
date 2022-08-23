import { useState, useEffect, useRef } from 'react';
import { useItemDetail } from '@hooks/web3/useItemDetail'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useWallet } from '@hooks/web3/useWallet';
//UI
import { DetailView } from '@components/Detail/DetailView'
import { TransferModal } from '../../components/Index';
import { Forbidden } from '@components/Detail/Forbidden'
import { PageSkeleton } from '@components/Detail/PageSkeleton'
import { Text, Highlight } from '@chakra-ui/react';
import { CreateTagModal, QRCodeModal } from '../../components/Index';
import { DeleteModal, ShareItem } from '@components/Modal'
import { ItemTags as ItemTagsModal } from '@components/Modal/ItemTags';
//HOC
import TagsWrapper from '@components/HOC/TagsWrapper';
import InstantAuth from '@components/HOC/InstantAuth';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	//This is necessary due metamaks didnt connect automatically due to unknown next's deal with dynamic routes
	return {
		props: {},
	}
}

const detail = () => {
	const { query } = useRouter()
	const { account } = useWallet()

	const { item, isLoading, isForbidden, deleteItem, updateShareState, transferItem } = useItemDetail(query.id as string, account, query?.share as string)
	const [modal, setModal] = useState<string>('');
	const [shareUrl, setShareUrl] = useState<string>('')

	const isShared = query?.share

	useEffect(() => {
		if (item)
			setShareUrl(`${window.location.href}?share=${account}&description=${item?.description}&title=${item?.title}&size=${item?.size}&uploadDate=${item?.uploadDate}&url=${item?.url.split('//')[1]}`)
	}, [item])

	return <>{(isLoading) ? <PageSkeleton /> : (
		<>
			{isForbidden && <Forbidden />}
			{item && (
				<>
					<DetailView
						item={item}
						account={account}
						isShared={isShared as string}
						setModal={(modal) => setModal(modal)}
					/>
					<CreateTagModal account={account} open={modal === 'new_tag'} close={() => setModal(null)} />
					{modal === 'add_tag' && <ItemTagsModal tagsFrom={Number(item.id)} close={(next) => setModal(next || null)} />}
					{modal === 'delete_item' && <DeleteModal
						content={<Text color='gray.200' fontSize='lg' fontWeight='semibold'>
							<Highlight query={item.title} styles={{ bg: 'transparent', color: 'red.500' }}>
								{`You're about to delete this item ( ${item.title} ) from your gallery.`}
							</Highlight>
						</Text>}
						close={() => setModal(null)}
						onClick={deleteItem}
					/>
					}
					{modal === 'share_item' && <ShareItem url={shareUrl} item={item} updateShareState={updateShareState} close={() => setModal(null)} />}
					<QRCodeModal iconUrl={item.url} url={shareUrl} open={modal === 'qrcode'} close={() => setModal('')} />
				</>
			)}
		</>
	)}
		{item && <TransferModal
			item={item}
			account={account}
			open={modal === 'transfer'}
			close={() => setModal('')}
			transferItem={transferItem}
		/>}
	</>;
};

export default InstantAuth(TagsWrapper(detail));
