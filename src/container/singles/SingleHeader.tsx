import React, { FC, useEffect, useState } from "react";
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

const useEnsureMenuContentClass = (updatedContent: string) => {
  const [content, setContent] = useState<string>(updatedContent);

  useEffect(() => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = updatedContent;

    if (tempDiv.querySelector('.menu-content') === null) {
      const h2Elements = tempDiv.querySelectorAll('h2');

      if (h2Elements.length > 0) {
        const menuContentDiv = document.createElement('div');
        menuContentDiv.className = 'menu-content';

        const h4Element = document.createElement('h4');
        h4Element.textContent = 'JUMP TO:';
        menuContentDiv.appendChild(h4Element);

        const ulElement = document.createElement('ul');

        h2Elements.forEach((h2) => {
          const h2Text = h2.textContent || h2.innerText;
          const slug = h2Text.toLowerCase().replace(/[\s]+/g, '-').replace(/[^\w\-]+/g, '');

          const liElement = document.createElement('li');
          const aElement = document.createElement('a');
          aElement.href = `#toc-${slug}`;
          aElement.textContent = h2Text;
          liElement.appendChild(aElement);
          ulElement.appendChild(liElement);

          h2.id = "toc-" + slug;
        });

        menuContentDiv.appendChild(ulElement);

        h2Elements?.[0]?.parentNode?.insertBefore(menuContentDiv, h2Elements[0]);
      }
    }

    setContent(tempDiv.innerHTML);
  }, [updatedContent]);

  return content;
};

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
      return `<h2${p1} id="toc-${id}">${p2}</h2>`;
    });
  };


  const addAnchorTagsToLi = (htmlContent: any) => {
    return htmlContent.replace(/<div class="menu-content">([\s\S]*?)<\/div>/g, (match: any) => {
      return match.replace(/<li>(.*?)<\/li>/gs, (liMatch: any, p1: any) => {
        const cleanedContent = p1.replace(/<a\b[^>]*>(.*?)<\/a>/gi, '$1').trim();
        const slug = cleanedContent.toLowerCase().replace(/[\s]+/g, '-').replace(/[^\w\-]+/g, '');
        return `<li><a href="#toc-${slug}">${cleanedContent}</a></li>`;
      });
    });
  };

  const processHtmlContent = (htmlContent: any) => {
    let updatedContent = addIdsToH2Tags(htmlContent);
    updatedContent = addAnchorTagsToLi(updatedContent);
    return updatedContent;
  };

  let updatedContent = processHtmlContent(content);

  updatedContent = useEnsureMenuContentClass(updatedContent)

  const featuredImageTyped: any = featuredImage;

  const h2Regex = /<h2\b[^>]*>/gi;
  const matches = [...updatedContent.matchAll(h2Regex)];

  const lastH2Index = matches[matches.length - 1]?.index;
  let firstPart = updatedContent
  let lastPart = ""

  if(lastH2Index) {
    firstPart = updatedContent.slice(0, lastH2Index);
    lastPart = updatedContent.slice(lastH2Index);
  }
  
  
  const layoutStyle = postData?.layoutStyle && postData?.layoutStyle[0]

  const dataProducts = postData?.products
  const headlineDesc = postData?.headlineDesc

  const mainAuthor = postData?.author?.nodes[0]

  if(layoutStyle != "Comparison" && layoutStyle != "Information") {
    firstPart = firstPart + lastPart
  }

  if (layoutStyle == "Comparison" || layoutStyle != "Information") {
    titleMainClass = "text-center"
  }

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

  const [showAll, setShowAll] = useState(false);
  const productsToShow = showAll ? dataProducts : dataProducts?.slice(0, 5);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <>
      {layoutStyle == "Comparison" && (
        <>
          {layoutStyle == "Comparison" && (
            <p className="text-xs text-center py-3 border-y border-y-slate-200 px-4">We earn a commission for products purchased through some links in this article.</p>
          )}
          <div className="container">
            <div className="my-5 flex gap-1 items-center justify-center">
              {categories?.nodes?.length == 1 && (
                <>
                  <Link href={"/"}>
                    <span className="text-xs font-normal underline underline-offset-4">Home</span>
                  </Link>
                  <span className="text-xs font-normal mt-1">{">"}</span>
                </>
              )}
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
              <h5 className="headline_desc italic text-center">{headlineDesc}</h5>
            </div>
            <div className="header-author m-auto">
              {author && (
                <p className="flex items-center justify-center flex-wrap gap-0 md:gap-5 mb-5 md:mb-0"><span>BY <Link href={author?.uri ?? "/"} className="underline underline-offset-2">{author?.name}</Link></span> PUBLISHED: {formatDate(date)}</p>
              )}
            </div>
            <div className="article-share-icon flex items-center justify-center w-full gap-3 text-sm font-semibold my-4">
              <div className="share-icon facebook relative group" onClick={linkToF}>
                <img className="cursor-pointer max-w-5 block group-hover:hidden" src="/images/posts/facebook-icon.png" alt="Facebook Icon" />
                <img className="cursor-pointer max-w-5 hidden group-hover:block" src="/images/posts/facebook-icon-white.png" alt="Facebook Icon White" />
              </div>
              <div className="share-icon x group" onClick={linkToX}>
                <img className="cursor-pointer max-w-5 block group-hover:hidden" src="/images/posts/x-icon.png" alt="X Icon" />
                <img className="cursor-pointer max-w-5 hidden group-hover:block" src="/images/posts/x-icon-white.png" alt="X Icon White" />
              </div>
              <div className="share-icon whatsapp group" onClick={linkToW}>
                <img className="cursor-pointer max-w-5 block group-hover:hidden" src="/images/posts/whatsapp-icon.png" alt="Whatsapp Icon" />
                <img className="cursor-pointer max-w-5 hidden group-hover:block" src="/images/posts/whatsapp-icon-white.png" alt="Whatsapp Icon White" />
              </div>
              <div className="share-icon mail group" onClick={linkToM}>
                <img className="cursor-pointer max-w-5 block group-hover:hidden" src="/images/posts/mail-icon.png" alt="Mail Icon" />
                <img className="cursor-pointer max-w-5 hidden group-hover:block" src="/images/posts/mail-icon-white.png" alt="Mail Icon White" />
              </div>
            </div>

            {layoutStyle == "Comparison" && (
              <Link href={"#toc-product-1"} className="w-fit block m-auto">
                <button className="border m-auto block border-black p-2 text-sm font-medium mb-3">Jump to Products</button>
              </Link>
            )}
          </div>
        </>
      )}


      <div className={`nc-SingleHeader ${className}`}>
        <div className="space-y-4 lg:space-y-5">
          {layoutStyle == "Comparison" && (
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
                  <p className="flex items-center gap-5"><span>BY <Link href={author?.uri ?? "/"} className="underline underline-offset-2">{author?.name}</Link></span> PUBLISHED: {formatDate(date)}</p>
                )}
              </div>
              <div className="article-share-icon w-fit flex items-center gap-3 text-sm font-semibold my-4">
                <div className="share-icon facebook relative group" onClick={linkToF}>
                  <img className="cursor-pointer max-w-5 block group-hover:hidden" src="/images/posts/facebook-icon.png" alt="Facebook Icon" />
                  <img className="cursor-pointer max-w-5 hidden group-hover:block" src="/images/posts/facebook-icon-white.png" alt="Facebook Icon White" />
                </div>
                <div className="share-icon x group" onClick={linkToX}>
                  <img className="cursor-pointer max-w-5 block group-hover:hidden" src="/images/posts/x-icon.png" alt="X Icon" />
                  <img className="cursor-pointer max-w-5 hidden group-hover:block" src="/images/posts/x-icon-white.png" alt="X Icon White" />
                </div>
                <div className="share-icon whatsapp group" onClick={linkToW}>
                  <img className="cursor-pointer max-w-5 block group-hover:hidden" src="/images/posts/whatsapp-icon.png" alt="Whatsapp Icon" />
                  <img className="cursor-pointer max-w-5 hidden group-hover:block" src="/images/posts/whatsapp-icon-white.png" alt="Whatsapp Icon White" />
                </div>
                <div className="share-icon mail group" onClick={linkToM}>
                  <img className="cursor-pointer max-w-5 block group-hover:hidden" src="/images/posts/mail-icon.png" alt="Mail Icon" />
                  <img className="cursor-pointer max-w-5 hidden group-hover:block" src="/images/posts/mail-icon-white.png" alt="Mail Icon White" />
                </div>
              </div>
            </div>
          )}

          {(layoutStyle == "Comparison" || layoutStyle == "Information") && (
            <img className="container single-featured-image" width={'100%'} src={featuredImageTyped?.sourceUrl} alt={featuredImageTyped?.altText} />
          )}

          <div className="container">
            {layoutStyle == "Comparison" && (
              <div className="editor-text mb-5">
                <p className="text-center text-xs">Every item on this page was chosen by an LULUNE editor. We may earn commission on some of the items you choose to buy.</p>
              </div>
            )}

            {!hiddenDesc && (
              <>
                <div
                  dangerouslySetInnerHTML={{ __html: firstPart.trim() }}
                  className="post-intro-content text-base text-neutral-500 lg:text-lg dark:text-neutral-400 pb-1 max-w-screen-md"
                ></div>

                {layoutStyle == "Comparison" && (
                  <div className="my-7">
                    {productsToShow?.map((product: any, index: any) => (
                      (
                        <div key={index} className="flex gap-2 md:gap-10 border-b border-slate-400 py-5">
                          <div className="flex items-center">
                            <h3 className="mr-3">{++index}</h3>
                            <Link href={`#toc-product-${index}`}><img className="w-44 md:w-[140px] min-w-20 max-w-20 md:min-w-28" src={product.image.node.sourceUrl} alt="" /></Link>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div className="col-span-1">
                              <span className="text-xs font-semibold border-b border-black">{product.title}</span>
                              <Link href={`#toc-product-${index}`}><h4 className="text-2xl mt-3">{product.name}</h4></Link>
                              <button className="block md:hidden w-full py-2 md:py-3 mt-3 px-5 text-sm border border-[#00767a] bg-[#00767a] text-white hover:bg-white hover:text-black hover:border-black transition-all">{product?.actionButtons?.[0]?.actionText}</button>
                              <Link href={`#toc-product-${index}`} className="font-semibold mt-2 block text-sm font-merriweather border-b w-fit border-slate-500">Read more</Link>
                            </div>
                            <div className="col-span-1 flex-col justify-center items-center hidden md:flex">
                              <button className="w-full py-3 px-5 text-sm border border-[#00767a] bg-[#00767a] text-white hover:bg-white hover:text-black hover:border-black transition-all">{product?.actionButtons?.[0]?.actionText}</button>
                            </div>
                          </div>
                        </div>
                      )
                    ))}
                    {dataProducts && dataProducts?.length > 5 && (
                      <div className="text-center mt-5">
                        <button
                          onClick={toggleShowAll}
                          className="py-2 px-5 text-sm border bg-white text-black border-black w-full hover:bg-[#ddd] rounded transition-all"
                        >
                          {showAll ? 'SHOW LESS' : 'SHOW MORE'}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {layoutStyle == "Information" && (
                  <div className="my-7">
                    {dataProducts && dataProducts.slice(0, 3).map((product: any, index: any) => (
                      index <= 2 && (
                        <div key={index} className="flex gap-5 md:gap-10 border-b border-slate-400 py-5">
                          <div>
                            <Link href={`#toc-product-${index + 1}`}><img width={140} className="min-w-28" src={product.image.node.sourceUrl} alt="" /></Link>
                          </div>
                          <div>
                            <span className="text-xs font-semibold underline">{product.title}</span>
                            <Link href={`#toc-product-${index + 1}`}><h4 className="text-2xl mt-3">{product.name}</h4></Link>
                            <Link href={`#toc-product-${index + 1}`} className="font-semibold mt-2 block text-lg font-merriweather border-b w-fit border-slate-500">Read more</Link>
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                )}

                {(layoutStyle == "Comparison" || layoutStyle == "Information") && (
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
