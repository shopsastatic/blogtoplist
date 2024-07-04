import React, { FC, useEffect } from "react";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import SingleTitle from "./SingleTitle";
import PostMeta2 from "@/components/PostMeta2/PostMeta2";
import SingleMetaAction2 from "./SingleMetaAction2";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import { NC_POST_FULL_FRAGMENT } from "@/fragments";
import { FragmentType } from "@/__generated__";
import Link from "next/link";

export interface SinglePageProps {
    page: any
}

const SinglePage: FC<SinglePageProps> = ({
    page,
}) => {

    console.log(page)
    let content = page?.editorBlocks[0].renderedHtml
    return (
        <>
            <div className={`nc-SingleHeader`}>
                <div className="space-y-4 lg:space-y-5">
                    <div className="container">
                        <SingleTitle mainClass={page?.title} title={page?.title || ""} />

                        <div className="save-article bg-black w-fit flex items-center gap-3 text-sm font-semibold p-2 px-8 my-4">
                            <img width={16} src="/images/posts/save-article.svg" alt="" />
                            <p className="text-white">Save Article</p>
                        </div>
                    </div>

                    <img className="container single-featured-image" width={'100%'} src={page?.featuredImage?.node?.sourceUrl} alt={page?.featuredImage?.node?.altText} />

                    <div className="container">

                        <div
                            dangerouslySetInnerHTML={{ __html: content?.trim() }}
                            className="post-intro-content text-base text-neutral-500 lg:text-lg dark:text-neutral-400 pb-1 max-w-screen-md"
                        ></div>
                    </div>

                    {/* <div className="footer-category container mt-28">
                        <a href={categories?.nodes[0]?.uri} className="block w-fit my-14">
                            <h3>{categories?.nodes[0]?.name}</h3>
                        </a>

                        <LayoutHalfFour data={footer_category?.slice(0, 4)}></LayoutHalfFour>

                        <div className="my-20">
                            <LayoutLineFour data={footer_category?.slice(4, 8)}></LayoutLineFour>
                        </div>

                        <div className="my-20">
                            <LayoutLineFour data={footer_category?.slice(8, 12)}></LayoutLineFour>
                        </div>

                        </div>
                    </div> */}
                </div>
            </div>
        </>
    );
};

export default SinglePage;
