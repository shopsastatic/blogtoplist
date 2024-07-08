import React, { FC, useEffect } from "react";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import SingleTitle from "./SingleTitle";
import PostMeta2 from "@/components/PostMeta2/PostMeta2";
import SingleMetaAction2 from "./SingleMetaAction2";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import { NC_POST_FULL_FRAGMENT } from "@/fragments";
import { FragmentType } from "@/__generated__";
import Link from "next/link";
import LayoutHalfFour from "@/components/LayoutHalfFour";
import LayoutLineFour from "@/components/LayoutLineFour";

export interface SinglePageProps {
    page: any,
    category: any
}

const SinglePage: FC<SinglePageProps> = ({
    page,
    category
}) => {
    
    return (
        <>
            <div className={`nc-SingleHeader pb-14`}>
                <div className="space-y-4 lg:space-y-5">
                    <div className="container">
                        <SingleTitle mainClass={page?.title} title={page?.title || ""} />
                    </div>

                    <img className="container single-featured-image" width={'100%'} src={page?.featuredImage?.node?.sourceUrl} alt={page?.featuredImage?.node?.altText} />

                    <div className="container">

                        <div
                            dangerouslySetInnerHTML={{ __html: page?.content}}
                            className="post-intro-content text-base text-neutral-500 lg:text-lg dark:text-neutral-400 pb-1 max-w-screen-md"
                        ></div>
                    </div>

                </div>
            </div>
            {category?.posts?.nodes?.slice(0, 4).length > 0 && (
                <div className="footer-category container mt-16">
                    <a href={category?.uri} className="block w-fit my-14">
                        <h3>{category?.name}</h3>
                    </a>

                    {category?.posts?.nodes?.slice(0, 4).length > 0 && (
                        <LayoutHalfFour data={category?.posts?.nodes?.slice(0, 4)}></LayoutHalfFour>
                    )}

                    {category?.posts?.nodes?.slice(4, 8).length > 0 && (
                        <div className="my-20">
                            <LayoutLineFour data={category?.posts?.nodes?.slice(4, 8)}></LayoutLineFour>
                        </div>
                    )}

                    {category?.posts?.nodes?.slice(8, 12).length > 0 && (
                        <div className="my-20">
                            <LayoutLineFour data={category?.posts?.nodes?.slice(8, 12)}></LayoutLineFour>
                        </div>
                    )}

                </div>
            )}
        </>
    );
};

export default SinglePage;
