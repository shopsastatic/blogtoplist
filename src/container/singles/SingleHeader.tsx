import React, { FC, useEffect } from "react";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import SingleTitle from "./SingleTitle";
import PostMeta2 from "@/components/PostMeta2/PostMeta2";
import SingleMetaAction2 from "./SingleMetaAction2";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import { NC_POST_FULL_FRAGMENT } from "@/fragments";
import { FragmentType } from "@/__generated__";
import Link from "next/link";

export interface SingleHeaderProps {
  hiddenDesc?: boolean;
  titleMainClass?: string;
  className?: string;
  post: FragmentType<typeof NC_POST_FULL_FRAGMENT>;
}

function formatDate(dateString: any) {

  const date = new Date(dateString);

  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();


  const formattedDate = `${month} ${day}, ${year}`;

  return formattedDate;
}

const SingleHeader: FC<SingleHeaderProps> = ({
  titleMainClass,
  hiddenDesc = false,
  className = "",
  post,
}) => {
  const {
    title,
    excerpt,
    content,
    ncPostMetaData,
    categories,
    featuredImage,
    commentCount,
    databaseId,
    author,
    date,
    uri,
    postData
  } = getPostDataFromPostFragment(post || {});

  const addIdsToH2Tags = (htmlContent: any) => {
    return htmlContent.replace(/<h2(.*?)>(.*?)<\/h2>/g, (match: any, p1: any, p2: any) => {
      const id = p2.trim().toLowerCase().replace(/[\s]+/g, '_').replace(/[^\w\-]+/g, '');
      return `<h2${p1} id="${id}">${p2}</h2>`;
    });
  };
  
  const updatedContent = addIdsToH2Tags(content);
  
  const featuredImageTyped: any = featuredImage;

  const paragraphs = updatedContent.split('</p>');
  const numParagraphs = paragraphs.length;
  const firstPart = paragraphs.slice(0, numParagraphs - 2).join('</p>') + '</p>';
  const lastPart = paragraphs[numParagraphs - 2];

  const dataProducts = postData?.products
  const headlineDesc = postData?.headlineDesc
  const layoutStyle = postData?.layoutStyle &&  postData?.layoutStyle[0]
  
  const mainAuthor = postData?.author?.nodes[0]
  
  
  return (
    <>
      <div className={`nc-SingleHeader ${className}`}>
        <div className="space-y-4 lg:space-y-5">
          <div className="container">
            <CategoryBadgeList
              itemClass="!px-3 mb-10"
              categories={categories?.nodes  || []}
            />
            <SingleTitle mainClass={titleMainClass} title={title || ""} />
            <div className="my-5">
              <h5 className="headline_desc italic">{headlineDesc}</h5>
            </div>
            <div className="header-author">
              {author && (
                <p>BY <a href={author?.uri ?? "/"} className="underline underline-offset-2">{author?.name}</a> PUBLISHED: {formatDate(date)}</p>
              )}
            </div>
            <div className="save-article bg-black w-fit flex items-center gap-3 text-sm font-semibold p-2 px-8 my-4">
                <img width={16} src="/images/posts/save-article.svg" alt="" />
                <p className="text-white">Save Article</p>
            </div>
          </div>

          <img className="container single-featured-image" width={'100%'} src={featuredImageTyped?.sourceUrl} alt={featuredImageTyped?.altText} />
          
          <div className="container">
            {layoutStyle == "Layout 1" && (
              <div className="editor-text mb-5">
                <p className="text-center text-xs">Every item on this page was chosen by an LULUNE editor. We may earn commission on some of the items you choose to buy.</p>
              </div>
            )}

            {!hiddenDesc && (
              <>
              <div
                dangerouslySetInnerHTML={{ __html: layoutStyle == "Layout 1" ? firstPart?.trim() : firstPart?.trim() + lastPart?.trim() }}
                className="post-intro-content text-base text-neutral-500 lg:text-lg dark:text-neutral-400 pb-1 max-w-screen-md"
              ></div>
              {layoutStyle == "Layout 1" && (
                <div className="my-7">
                    {dataProducts && dataProducts.slice(0, 3).map((product: any, index: any) => (
                      index <= 2 && (
                        <div key={index} className="flex gap-5 md:gap-10 border-b border-slate-400 py-5">
                          <div>
                            <Link href={`#product_${index + 1}`}><img width={140} className="min-w-28" src={product.image.node.sourceUrl} alt="" /></Link>
                          </div>
                          <div>
                            <span className="text-xs font-semibold underline">{product.title}</span>
                            <Link href={`#product_${index + 1}`}><h4 className="text-2xl mt-3">{product.name}</h4></Link>
                            <Link href={`#product_${index + 1}`} className="font-semibold mt-2 block text-lg font-merriweather border-b w-fit border-slate-500">Read more</Link>
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                )}
              
              {layoutStyle == "Layout 1" && (
                <div
                  dangerouslySetInnerHTML={{ __html: lastPart?.trim() }}
                  className="post-intro-content text-base text-neutral-500 lg:text-lg dark:text-neutral-400 pb-1 max-w-screen-md"
                ></div>
              )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleHeader;
