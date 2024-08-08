import { PageCategoryGetCategoryQuery } from '@/__generated__/graphql'
import ArchiveFilterListBox from '@/components/ArchiveFilterListBox/ArchiveFilterListBox'
import Button from '@/components/Button/Button'
import { TPostCard } from '@/components/Card2/Card2'
import { CommonTermCardProps, TCategoryCardFull } from '@/components/CardCategory1/CardCategory1'
import GridPostsArchive from '@/components/GridPostsArchive'
import LayoutHalfFour from '@/components/LayoutHalfFour'
import LayoutSliceThree from '@/components/LayoutSliceThree'
import { FILTERS_OPTIONS } from '@/contains/contants'
import { NC_SITE_SETTINGS } from '@/contains/site-settings'
import { PostDataFragmentType } from '@/data/types'
import useGetPostsNcmazMetaByIds from '@/hooks/useGetPostsNcmazMetaByIds'
import useHandleGetPostsArchivePage from '@/hooks/useHandleGetPostsArchivePage'
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
	top10Categories: TCategoryCardFull[] | null
	categorylayout: any
	ncTaxonomyMeta: any
}


const ArchiveLayout: FC<any> = ({
	children,
	name,
	initPosts: posts,
	initPostsPageInfo,
	tagDatabaseId,
	categoryDatabaseId,
	taxonomyType,
	top10Categories,
	categorylayout,
	ncTaxonomyMeta,
	homepageData,
	homepageImageUrl
}) => {
	// START ----------
	//
	const { } = useGetPostsNcmazMetaByIds({
		posts: (posts || []) as TPostCard[],
	})

	const isEmptyObject = (obj: any) => {
		return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
	};

	//

	let featuredImage = ''
	let category1 = []
	let category2 = []
	let category3 = []
	let category4 = []
	let category5 = []
	let post1 = []
	let isHomepage = false

	if (categorylayout && top10Categories.length > 0) {
		featuredImage = ncTaxonomyMeta?.featuredImage?.node?.sourceUrl ?? ""

		post1 = categorylayout?.postTemp1?.nodes[0]

		category1 = categorylayout.subCategory1?.nodes[0]
		category2 = categorylayout.subCategory2?.nodes[0]
		category3 = categorylayout.subCategory3?.nodes[0]
		category4 = categorylayout.subCategory4?.nodes[0]
		category5 = categorylayout.subCategory5?.nodes[0]
	} else {
		isHomepage = true
		featuredImage = homepageImageUrl
		post1 = homepageData?.homePost1?.nodes[0]

		category1 = homepageData?.homeCategory1?.nodes[0]
		category2 = homepageData?.homeCategory2?.nodes[0]
		category3 = homepageData?.homeCategory3?.nodes[0]
		category4 = homepageData?.homeCategory4?.nodes[0]
		category5 = homepageData?.homeCategory5?.nodes[0]
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

	const featuredImageStyle = {
		backgroundImage: `url(${featuredImage})`,
		backgroundSize: 'cover',
	};


	return (
		<div className="">
			<div className={`ncmazfc-page-category`}>
				{/* HEADER */}
				{/* {children} */}
				{/* ====================== END HEADER ====================== */}

				<div className="">
					<div className='page-category-banner' style={featuredImageStyle}>
						{!isHomepage && (
							<Button className='font-noto'>{name}</Button>
						)}
					</div>

					<div className='banner-section !mt-5 py-5 flex justify-center min-h-20'>
						{/* <img src="https://tpc.googlesyndication.com/simgad/15365825322237460383" alt="" /> */}
					</div>

					{category1?.posts?.nodes?.length > 0 && (
						<div className='curated-section bg-white py-0 md:py-10'>
							<Link href={category1?.uri ?? "/"} className='block w-fit m-auto'><h2 className='text-hover-effect text-black text-center'>{category1?.name}</h2></Link>
							<div className="container grid grid-cols-5 mt-10 gap-5 !pb-10">
								<div className="curated-main-image col-span-5 md:col-span-3 text-black mb-10 md:mb-0">
									<Link href={category1?.posts?.nodes[0]?.uri ?? ""}>
										<img src={category1?.posts?.nodes[0]?.featuredImage?.node?.sourceUrl} alt="" />
										<h3 className='text-hover-effect text-center mt-10'>{category1?.posts?.nodes[0].title}</h3>
									</Link>
								</div>
								<div className="curated-posts grid gap-3 col-span-5 md:col-span-2 text-black">
									{category1?.posts?.nodes.slice(1).map((item: any, index: number) => (
										<Link key={index} href={item?.uri ?? ""}>
											<div className='grid grid-cols-6 gap-3 items-center'>
												{item.featuredImage && item.featuredImage.node && (
													<img className='col-span-2 w-full h-[100px] pre-sm:h-[180px] md:h-[100px] lg:h-[143px] object-cover object-center' src={item.featuredImage.node.sourceUrl} alt="" />
												)}
												<span className='text-hover-effect col-span-4 font-merriweather'>{item.title}</span>
											</div>
										</Link>
									))}
								</div>

							</div>
							<hr className='my-10 bg-black' />
						</div>
					)}

					{post1?.featuredImage && post1?.title && post1?.uri && (
						<div className='container grid grid-cols-1 md:grid-cols-7 gap-10 mt-10 mb-14'>
							<div className='col-span-1 md:col-span-5 order-2 md:order-1'>
								<Link href={post1?.uri ?? "/"}>
									<img className='m-auto' src={post1?.featuredImage?.node.sourceUrl} alt="" />
									<h4 className='text-hover-effect text-4xl md:text-5xl text-center mt-5 md:mt-14 leading-none'>{post1?.title}</h4>
								</Link>
							</div>
							<div className='col-span-1 md:col-span-2 order-1 md:order-2'>
								{/* <img className='sticky top-20 w-80 m-auto' src="https://tpc.googlesyndication.com/simgad/12060557987624385320" alt="" /> */}
							</div>
						</div>
					)}

					{category2?.posts?.nodes?.length > 0 && (
						<>
							<hr className='my-10 bg-black' />

							<div className='posts-layout-1'>
								<Link href={category2?.uri ?? "/"} className='block w-fit m-auto'><h4 className='sub-category-title text-hover-effect text-center'>{category2?.name}</h4></Link>
								<div className='container grid grid-cols-4 gap-7 mt-10'>
									{category2?.posts?.nodes.map((item: any, index: number) => (
										<div className='col-span-2 md:col-span-1' key={index}>
											<Link href={item.uri}>
												<img src={item.featuredImage?.node.sourceUrl} className='w-full h-[140px] pre-sm:h-[250px] md:h-[200px] pre-xl:h-[270px] object-cover object-center' alt="" />
												<span className='block text-md font-merriweather text-center mt-3'>{item?.title}</span>
											</Link>
										</div>
									))}
								</div>
							</div>
						</>
					)}

					{/* <div className='mt-14 py-5 flex justify-center'>
						<img src="https://tpc.googlesyndication.com/simgad/15365825322237460383" alt="" />
					</div> */}

					{category3?.posts?.nodes?.length > 0 && (
						<>
							<hr className='my-10 bg-black' />

							<div className='posts-layout-2'>
								<Link href={category3?.uri ?? "/"} className='block w-fit m-auto'><h4 className='sub-category-title text-hover-effect text-center'>{category3?.name}</h4></Link>

								<LayoutSliceThree data={category3?.posts?.nodes}></LayoutSliceThree>
							</div>
						</>
					)}

					{category4?.posts?.nodes?.length > 0 && (
						<>
							<hr className='my-10 bg-black' />

							<div className='posts-layout-1 mb-10'>
								<Link href={category4?.uri ?? "/"} className='block w-fit m-auto'><h4 className='sub-category-title text-hover-effect text-center'>{category4?.name}</h4></Link>
								<div className='container grid grid-col-1 md:grid-cols-7 gap-7 mt-10'>
									<div className='col-span-5'>
										<div className='grid grid-cols-2 gap-7'>
											{category4?.posts?.nodes.map((item: any, index: number) => (
												<Link className='col-span-1' href={item?.uri ?? ""} key={index}>
													<div>
														<img className='w-full h-[140px] pre-sm:h-[250px] lg:h-[400px] object-cover object-center' src={item?.featuredImage?.node.sourceUrl} alt="" />
														<p className='text-md font-merriweather text-center mt-3 leading-7'>{item?.title}</p>
													</div>
												</Link>
											))}
										</div>
									</div>
									<div className='col-span-5 md:col-span-2'>
										{/* <img className='sticky top-20 m-auto' src="https://tpc.googlesyndication.com/simgad/12060557987624385320" alt="" /> */}
									</div>
								</div>
							</div>
						</>

					)}

					{category5?.posts?.nodes?.length > 0 && (
						<>
							<hr className='my-10 bg-black' />

							<div className='posts-layout-1 mb-10'>
								<Link href={category5?.uri ?? "/"} className='block w-fit m-auto'><h4 className='sub-category-title text-hover-effect text-center'>{category5?.name}</h4></Link>
								<Link className='block w-fit m-auto' href={category5?.posts?.nodes[0].uri ?? ""}>
									<div className='md:container !max-w-full md:!max-w-[1300px] grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 mb-14 items-center'>
										<div className='px-5 md:px-0 col-span-1 order-2 md:order-1'>
											<h4 className='text-hover-effect text-4xl md:text-5xl leading-none font-semibold'>{category5?.posts?.nodes[0].title}</h4>
										</div>
										<div className='col-span-1 order-1 md:order-2'>
											<img className='sticky top-20 w-full md:h-[400px] lg:h-[598px] object-cover object-center border-l-8 border-r-8 border-y-2 border-black' src={category5?.posts?.nodes[0].featuredImage.node.sourceUrl} alt="" />
										</div>
									</div>
								</Link>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default ArchiveLayout
