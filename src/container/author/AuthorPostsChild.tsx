import { FaustPage } from '@faustwp/core'
import { useFragment } from '@/__generated__'
import {
	GetAuthorWithPostsQuery,
	NcgeneralSettingsFieldsFragmentFragment,
} from '@/__generated__/graphql'
import React from 'react'
import ArchiveFilterListBox from '@/components/ArchiveFilterListBox/ArchiveFilterListBox'
import SectionSubscribe2 from '@/components/SectionSubscribe2/SectionSubscribe2'
import SectionTrendingTopic from '@/components/SectionTrendingTopic'
import { FILTERS_OPTIONS } from '@/contains/contants'
import useHandleGetPostsArchivePage from '@/hooks/useHandleGetPostsArchivePage'
import { NC_USER_FULL_FIELDS_FRAGMENT } from '@/fragments'
import PageLayout from '@/container/PageLayout'
import { getImageDataFromImageFragment } from '@/utils/getImageDataFromImageFragment'
import { PostDataFragmentType } from '@/data/types'
import GridPostsArchive from '@/components/GridPostsArchive'
import useGetPostsNcmazMetaByIds from '@/hooks/useGetPostsNcmazMetaByIds'
import { TPostCard } from '@/components/Card2/Card2'
import { TCategoryCardFull } from '@/components/CardCategory1/CardCategory1'
import AuthorLayout from '@/container/AuthorPageLayout'
import Tab from '@/container/AuthorPageTab'
import { NC_SITE_SETTINGS } from '@/contains/site-settings'
import LayoutLineFour from '@/components/LayoutLineFour'

const FILTERS = FILTERS_OPTIONS

const AuthorPostsChild: FaustPage<GetAuthorWithPostsQuery> = props => {
	const { user } = props.data || {}

	const posts = user?.posts
	const { databaseId, id, name, ncUserMeta } = useFragment(
		NC_USER_FULL_FIELDS_FRAGMENT,
		user || {},
	)
	const _top10Categories =
		(props.data?.categories?.nodes as TCategoryCardFull[]) || []

	//
	const {} = useGetPostsNcmazMetaByIds({
		posts: (posts?.nodes || []) as TPostCard[],
	})
	//
	console.log(posts)

	const userTyped: any = user;

	const {
		currentPosts,
		handleChangeFilterPosts,
		handleClickShowMore,
		hasNextPage,
		loading,
	} = useHandleGetPostsArchivePage({
		initPosts: (posts?.nodes as PostDataFragmentType[]) || [],
		initPostsPageInfo: posts?.pageInfo || null,
		authorDatabaseId: databaseId,
	})

	return (
		<>
			<PageLayout
				headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
				footerMenuItems={props.data?.footerMenuItems?.nodes || []}
				pageFeaturedImageUrl={
					getImageDataFromImageFragment(ncUserMeta?.featuredImage?.node)
						?.sourceUrl || null
				}
				pageTitle={name}
				generalSettings={
					props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
				}
			>
				<div className="section-white flex items-center justify-center">
					<img src="https://tpc.googlesyndication.com/simgad/5691605194776125024" alt="" />
				</div>
				<div className='container my-10'>
					<img className='m-auto max-w-32 rounded-full' src={userTyped?.ncUserMeta?.backgroundImage?.node?.sourceUrl} alt="" />
					<h2 className='text-center uppercase my-5 !text-3xl'>{userTyped?.name}</h2>
					<p className='text-center font-semibold'>{userTyped?.ncUserMeta?.ncBio}</p>
					<span className='block text-center mt-5 font-light font-merriweather'>{userTyped?.description}</span>
				</div>

				<div className='my-20 container'>
					<LayoutLineFour data={userTyped?.posts?.nodes}></LayoutLineFour>
				</div>
			</PageLayout>
		</>
	)
}

export default AuthorPostsChild
