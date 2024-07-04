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
                <h4 className='category-child-title text-center font-semibold'>HAIRSTYLES & HAIRCUTS 2024</h4>
                <div className='breadcrumbs flex items-center text-xs gap-1 justify-center my-5'>
                    <a href={parent?.node?.uri ?? "/"} className='underline underline-offset-4'>{parent?.node?.name}</a> > <p>{name}</p>
                </div>
            </div>
            <div className='section-white'></div>
            <div className='container my-10'>
                <div className='my-20'>
                    <LayoutHalfFour data={dataPosts.slice(0, 4)}></LayoutHalfFour>
                </div>
                <div className='my-20'>
                    <LayoutLineFour data={dataPosts.slice(0, 4)}></LayoutLineFour>
                </div>
                <div className='my-20'>
                    <LayoutSliceThree data={dataPosts.slice(1, 5)}></LayoutSliceThree>
                </div>
                <div className='my-20'>
                    <LayoutHalfFour data={dataPosts.slice(0, 4)}></LayoutHalfFour>
                </div>
                <div className='my-20'>
                    <LayoutSliceThree data={dataPosts.slice(1, 5)}></LayoutSliceThree>
                </div>
                <div className='my-20'>
                    <LayoutHalfFour data={dataPosts.slice(0, 4)}></LayoutHalfFour>
                </div>
                <div className='my-20'>
                    <LayoutSliceThree data={dataPosts.slice(10, 15)}></LayoutSliceThree>
                </div>
            </div>
        </>
    )
}

export default ArchiveLayoutChild
