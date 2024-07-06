import { PageCategoryGetCategoryQuery } from '@/__generated__/graphql'
import ArchiveFilterListBox from '@/components/ArchiveFilterListBox/ArchiveFilterListBox'
import Button from '@/components/Button/Button'
import { TPostCard } from '@/components/Card2/Card2'
import { CommonTermCardProps, TCategoryCardFull } from '@/components/CardCategory1/CardCategory1'
import GridPostsArchive from '@/components/GridPostsArchive'
import LayoutHalfFour from '@/components/LayoutHalfFour'
import LayoutLineFour from '@/components/LayoutLineFour'
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

interface IArchiveLayoutChildProps {
    parent: any
    name?: string | null
    initPosts?: any
    tagDatabaseId?: number | null
    categoryDatabaseId?: number | null,
    taxonomyType: 'tag' | 'category' | 'postFormat'
    ncTaxonomyMeta: any
}


const ArchiveLayoutChild: FC<IArchiveLayoutChildProps> = ({
    parent,
    name,
    initPosts: posts,
    tagDatabaseId,
    categoryDatabaseId,
    taxonomyType,
    ncTaxonomyMeta
}) => {
    // START ----------
    //
    const dataPosts = posts?.nodes

    return (
        <>
            <div className='mt-10 container'>
                <h4 className='category-child-title text-center font-semibold uppercase'>{name}</h4>
                <div className='breadcrumbs flex items-center text-xs gap-1 justify-center my-5'>
                    <Link href={parent?.node?.uri ?? "/"} className='underline underline-offset-4'>{parent?.node?.name}</Link> {'>'} <p>{name}</p>
                </div>
            </div>
            <div className='section-white'></div>
            <div className='container my-10'>
                {dataPosts.slice(0, 4).length > 0 && (
                    <div className='my-20'>
                        <LayoutHalfFour data={dataPosts?.slice(0, 4)}></LayoutHalfFour>
                    </div>
                )}
                {dataPosts.slice(4, 8).length > 0 && (
                    <div className='my-20'>
                        <LayoutLineFour data={dataPosts?.slice(4, 8)}></LayoutLineFour>
                    </div>
                )}
                {dataPosts.slice(8, 12).length > 0 && (
                    <div className='my-20'>
                        <LayoutSliceThree data={dataPosts?.slice(8, 12)}></LayoutSliceThree>
                    </div>
                )}
                {dataPosts.slice(12, 16).length > 0 && (
                    <div className='my-20'>
                        <LayoutHalfFour data={dataPosts?.slice(12, 16)}></LayoutHalfFour>
                    </div>
                )}
                {dataPosts.slice(16, 20).length > 0 && (
                    <div className='my-20'>
                        <LayoutSliceThree data={dataPosts?.slice(16, 20)}></LayoutSliceThree>
                    </div>
                )}
                {dataPosts.slice(20, 24).length > 0 && (
                    <div className='my-20'>
                        <LayoutHalfFour data={dataPosts?.slice(20, 24)}></LayoutHalfFour>
                    </div>
                )}
                {dataPosts.slice(24, 28).length > 0 && (
                    <div className='my-20'>
                        <LayoutSliceThree data={dataPosts?.slice(24, 28)}></LayoutSliceThree>
                    </div>
                )}
            </div>
        </>
    )
}

export default ArchiveLayoutChild
