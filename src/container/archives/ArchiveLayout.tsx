import { PageCategoryGetCategoryQuery } from '@/__generated__/graphql'
import ArchiveFilterListBox from '@/components/ArchiveFilterListBox/ArchiveFilterListBox'
import Button from '@/components/Button/Button'
import { TPostCard } from '@/components/Card2/Card2'
import { CommonTermCardProps, TCategoryCardFull } from '@/components/CardCategory1/CardCategory1'
import GridPostsArchive from '@/components/GridPostsArchive'
import { FILTERS_OPTIONS } from '@/contains/contants'
import { NC_SITE_SETTINGS } from '@/contains/site-settings'
import { PostDataFragmentType } from '@/data/types'
import useGetPostsNcmazMetaByIds from '@/hooks/useGetPostsNcmazMetaByIds'
import useHandleGetPostsArchivePage from '@/hooks/useHandleGetPostsArchivePage'
import { GET_CUSTOM_CATEGORIES } from '@/utils/getCatgoryDataFromCategoryFragment'
import { FaustTemplate } from '@faustwp/core'
import { init } from '@graphql-codegen/cli'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'

interface IArchiveLayoutProps {
	children: React.ReactNode
	name?: string | null
	initPosts?: PostDataFragmentType[] | null
	initPostsPageInfo?: {
		endCursor?: string | null | undefined
		hasNextPage: boolean
	} | null
	tagDatabaseId?: number | null
	categoryDatabaseId?: number | null,
	taxonomyType: 'tag' | 'category' | 'postFormat'
	top10Categories: TCategoryCardFull[] | null,
}


const ArchiveLayout: FC<IArchiveLayoutProps> = ({
	children,
	name,
	initPosts: posts,
	initPostsPageInfo,
	tagDatabaseId,
	categoryDatabaseId,
	taxonomyType,
	top10Categories,
}) => {
	// START ----------
	//

	const { } = useGetPostsNcmazMetaByIds({
		posts: (posts || []) as TPostCard[],
	})
	
	//
	
	const { error, data } = GET_CUSTOM_CATEGORIES(categoryDatabaseId);
	let featuredImage = ''
	let acfCategoryData = []
	let category1 = []
	let category2 = []
	let category3 = []
	let category4 = []
	let category5 = []
	let post1 = {}

	if(data) {
		acfCategoryData = data.category
		featuredImage = acfCategoryData?.ncTaxonomyMeta?.featuredImage?.node?.sourceUrl ?? ""

		post1 = acfCategoryData?.categorylayout?.postTemp1?.nodes[0]

		category1 = acfCategoryData.categorylayout.subCategory1?.nodes[0]
		category2 = acfCategoryData.categorylayout.subCategory2?.nodes[0]
		category3 = acfCategoryData.categorylayout.subCategory3?.nodes[0]
		category4 = acfCategoryData.categorylayout.subCategory4?.nodes[0]
		category5 = acfCategoryData.categorylayout.subCategory5?.nodes[0]
		
	}
	
	const {
		currentPosts,
		handleChangeFilterPosts,
		handleClickShowMore,
		hasNextPage,
		loading,
	} = useHandleGetPostsArchivePage({
		initPosts: posts,
		initPostsPageInfo,
		tagDatabaseId,
		categoryDatabaseId,
	})


	return (
		<div className="">
			<div className={`ncmazfc-page-category`}>
				{/* HEADER */}
				{/* {children} */}
				{/* ====================== END HEADER ====================== */}

				<div className="">
					<div className='page-category-banner'>
						<img width={'100%'} src={featuredImage} alt="" />
						<img width={'100%'} className='mobile' src="https://hips.hearstapps.com/hmg-prod/images/beauty-6517195948cdd.jpg?crop=0.421xw:1.00xh;0.0497xw,0&resize=1024:*" alt="" />
						<Button>{name}</Button>
					</div>

					<div className='banner-section !mt-5 py-5 flex justify-center'>
						<img src="https://tpc.googlesyndication.com/simgad/15365825322237460383" alt="" />
					</div>

					<div className='curated-section bg-black py-10'>
						<h2 className='text-hover-effect text-white text-center'>{category1?.name}</h2>
						<div className="container grid grid-cols-5 mt-10 gap-5">
							<div className="curated-main-image col-span-5 md:col-span-3 text-white">
								<Link href={category1?.posts?.nodes[0]?.uri ?? ""}>
									<img src={category1?.posts?.nodes[0].featuredImage.node.sourceUrl} alt="" />
									<h3 className='text-hover-effect text-center mt-10'>{category1?.posts?.nodes[0].title}</h3>
								</Link>
							</div>
							<div className="curated-posts grid gap-3 col-span-5 md:col-span-2 text-white">
								{category1?.posts?.nodes.slice(1).map((item: any, index: number) => (
									<Link key={index} href={item?.uri ?? ""}>
									<div className='grid grid-cols-6 gap-3 items-center'>
										{item.featuredImage && item.featuredImage.node && (
										<img className='col-span-2' src={item.featuredImage.node.sourceUrl} alt="" />
										)}
										<span className='text-hover-effect col-span-4'>{item.title}</span>
									</div>
									</Link>
								))}
							</div>

						</div>
					</div>

					<div className='container grid grid-cols-1 md:grid-cols-7 gap-10 mt-10 mb-14'>
							<div className='col-span-1 md:col-span-5 order-2 md:order-1'>
								<Link href={post1?.uri ?? ""}>
									<img src={post1?.featuredImage?.node.sourceUrl} alt="" />
									<h4 className='text-hover-effect text-4xl md:text-5xl text-center mt-14 leading-none'>{post1?.title}</h4>
								</Link>
							</div>
						<div className='col-span-1 md:col-span-2 order-1 md:order-2'>
							<img className='sticky top-20 w-80 m-auto' src="https://tpc.googlesyndication.com/simgad/12060557987624385320" alt="" />
						</div>
					</div>

					<hr className='my-10 bg-black' />

					<div className='posts-layout-1'>
						<h4 className='sub-category-title text-hover-effect text-center'>{category2?.name}</h4>
						<div className='container grid grid-cols-4 gap-7 mt-10'>
							{category2?.posts?.nodes.map((item: any, index: number) => (
								<div className='col-span-2 md:col-span-1' key={index}>
									<Link href={item.uri}>
										<img src={item.featuredImage?.node.sourceUrl} alt="" />
										<span className='block text-xl text-center mt-3'>{item?.title}</span>
									</Link>
								</div>
							))}
						</div>
					</div>

					<div className='mt-14 py-5 flex justify-center'>
						<img src="https://tpc.googlesyndication.com/simgad/15365825322237460383" alt="" />
					</div>

					<hr className='my-10 bg-black' />

					<div className='posts-layout-2'>
						<h4 className='sub-category-title text-hover-effect text-center'>{category3?.name}</h4>
						<div className='container grid grid-cols-1 md:grid-cols-3 gap-7 mt-10 my-14'>
							{category3?.posts?.nodes.map((item: any, index: number) => (
								<div className='col-span-2 md:col-span-1' key={index}>
									<Link href={item?.uri ?? ""}>
										<div className='grid grid-cols-2 gap-3 items-center'>
											<img className='col-span-1' src={item?.featuredImage?.node.sourceUrl} alt="" />
											<span className='block col-span-1 text-md mt-3'>{item?.title}</span>
										</div>
									</Link>
								</div>
							))}
						</div>
					</div>

					<hr className='my-10 bg-black' />

					<div className='posts-layout-1 mb-10'>
						<h4 className='sub-category-title text-hover-effect text-center'>{category4?.name}</h4>
						<div className='container grid grid-col-1 md:grid-cols-7 gap-7 mt-10'>
							<div className='col-span-5'>
								<div className='grid grid-cols-2 gap-7'>
									{category4?.posts?.nodes.map((item: any, index: number) => (
										<Link className='col-span-1' href={item?.uri ?? ""} key={index}>
											<div>
												<img width={'100%'} src={item?.featuredImage?.node.sourceUrl} alt="" />
												<p className='text-xl text-center mt-3 leading-7'>{item?.title}</p>
											</div>
										</Link>
									))}
								</div>
							</div>
							<div className='col-span-5 md:col-span-2'>
								<img className='sticky top-20 m-auto' src="https://tpc.googlesyndication.com/simgad/12060557987624385320" alt="" />
							</div>
						</div>
					</div>

					<hr className='my-10 bg-black' />

					<div className='posts-layout-1 mb-10'>
						<h4 className='sub-category-title text-hover-effect text-center'>{category5?.name}</h4>
						<Link href={category5?.posts?.nodes[0].uri ?? ""}>
							<div className='md:container grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 mb-14 items-center'>
								<div className='px-5 md:px-0 col-span-1 order-2 md:order-1'>
									<p className='text-hover-effect text-4xl md:text-5xl leading-none font-semibold'>{category5?.posts?.nodes[0].title}</p>
									<p className='mt-5 text-2xl'>{category5?.posts?.nodes[0].title}</p>
								</div>
								<div className='col-span-1 order-1 md:order-2'>
									<img className='sticky top-20 border-l-8 border-r-8 border-y-2 border-black' src={category5?.posts?.nodes[0].featuredImage.node.sourceUrl} alt="" />
								</div>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ArchiveLayout
