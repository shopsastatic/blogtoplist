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
      const id = p2.trim().toLowerCase().replace(/[\s]+/g, '-').replace(/[^\w\-]+/g, '');
      return `<h2${p1} id="${id}">${p2}</h2>`;
    });
  };


  const addAnchorTagsToLi = (htmlContent: any) => {
    return htmlContent.replace(/<li>(.*?)<\/li>/gs, (match: any, p1: any) => {
      const cleanedContent = p1.replace(/<a\b[^>]*>(.*?)<\/a>/gi, '$1').trim();
      const slug = cleanedContent.toLowerCase().replace(/[\s]+/g, '-').replace(/[^\w\-]+/g, '');
      return `<li><a href="#${slug}">${cleanedContent}</a></li>`;
    });
  };

  const processHtmlContent = (htmlContent: any) => {
    let updatedContent = addIdsToH2Tags(htmlContent);
    updatedContent = addAnchorTagsToLi(updatedContent);
    return updatedContent;
  };
  
  const updatedContent = processHtmlContent(content);

  const featuredImageTyped: any = featuredImage;

  const paragraphs = updatedContent.split('</p>');
  const numParagraphs = paragraphs.length;
  const firstPart = paragraphs.slice(0, numParagraphs - 2).join('</p>') + '</p>';
  const lastPart = paragraphs[numParagraphs - 2];

  const dataProducts = postData?.products
  const headlineDesc = postData?.headlineDesc
  const layoutStyle = postData?.layoutStyle && postData?.layoutStyle[0]

  const mainAuthor = postData?.author?.nodes[0]


  const getCurrentDomain = () => {
    if (typeof window !== 'undefined') {
      return window.location.origin;
    }
    return '';
  };

  const domain = getCurrentDomain();
  const currentUrl = domain + "/" + uri

  const linkToF = () => {
    const urlToShare = encodeURIComponent(currentUrl);
    const shareLink = `https://www.facebook.com/sharer.php?u=${urlToShare}&quote=${title}`;
    window.open(shareLink, '_blank', 'width=600,height=600');
  };

  const linkToX = () => {
    const urlToShare = encodeURIComponent(currentUrl);
    const shareLink = `https://twitter.com/intent/tweet?url=${urlToShare}&text=${title}`;
    window.open(shareLink, '_blank', 'width=600,height=600');
  };

  const linkToW = () => {
    const urlToShare = encodeURIComponent(currentUrl);
    const shareLink = `https://api.whatsapp.com/send?text=${title}%20${urlToShare}`;
    window.open(shareLink, '_blank', 'width=600,height=600');
  };

  const linkToM = () => {
    const urlToShare = encodeURIComponent(currentUrl);
    const shareLink = `mailto:?subject=${title}&body=${urlToShare}`;
    window.open(shareLink, '_blank', 'width=600,height=600');
  };

  return (
    <>
      <div className={`nc-SingleHeader ${className}`}>
        <div className="space-y-4 lg:space-y-5">
          <div className="container">
            <div className="mb-10 flex gap-1 items-center">
              {categories?.nodes && categories.nodes.map((product: any, index: any) => (
                <React.Fragment key={index}>
                  <Link href={product.uri ?? "/"}>
                    <span className="text-xs font-normal underline underline-offset-4">{product.name}</span>
                  </Link>
                  {categories?.nodes && index < categories.nodes.length - 1 && (
                    <span className="text-xs font-normal mt-1">{">"}</span>
                  )}
                </React.Fragment>
              ))}
            </div>


            <SingleTitle mainClass={titleMainClass} title={title || ""} />
            <div className="my-5">
              <h5 className="headline_desc italic">{headlineDesc}</h5>
            </div>
            <div className="header-author">
              {author && (
                <p>BY <a href={author?.uri ?? "/"} className="underline underline-offset-2">{author?.name}</a> PUBLISHED: {formatDate(date)}</p>
              )}
            </div>
            <div className="save-article w-fit flex items-center gap-3 text-sm font-semibold my-4">
              <img className="cursor-pointer" onClick={linkToF} src="/images/posts/facebook-icon.svg" alt="" />
              <img className="cursor-pointer" onClick={linkToX} src="/images/posts/xcom-icon.svg" alt="" />
              <img className="cursor-pointer" onClick={linkToW} src="/images/posts/whatsapp-icon.svg" alt="" />
              <img className="cursor-pointer" onClick={linkToM} src="/images/posts/mail-icon.svg" alt="" />
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
