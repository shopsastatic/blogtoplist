import React, { FC } from "react";
import NcImage from "@/components/NcImage/NcImage";
import { CUSTOM_POST_DATA, getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import SingleHeader from "../SingleHeader";
import { FragmentType } from "@/__generated__";
import { NC_POST_FULL_FRAGMENT } from "@/fragments";
import { ApolloClient, InMemoryCache, useApolloClient } from '@apollo/client';
import Link from "next/link";
import classNames from "@/utils/classNames";
import LayoutHalfFour from "@/components/LayoutHalfFour";
import LayoutLineFour from "@/components/LayoutLineFour";
import FormSubscibe from "@/components/formSubscibe";

export interface SingleType1Props {
  post: FragmentType<typeof NC_POST_FULL_FRAGMENT>;
  showRightSidebar?: boolean;
}

const SingleType1: FC<SingleType1Props> = ({ post, showRightSidebar }) => {
  //

  const {
    title,
    content,
    date,
    author,
    databaseId,
    excerpt,
    uri,
    featuredImage,
    postData,
    categories,
    ncPostMetaData
  } = getPostDataFromPostFragment(post || {});

  //
  let footer_category = categories?.nodes[0]?.posts?.nodes.filter(p => p.uri != uri)
  const layoutStyle = postData?.layoutStyle && postData.layoutStyle[0]

  const convertProsToArray = (prosString: any) => {
    let lines = prosString?.trim()?.split('\n')?.map((line: any) => line.trim());

    return lines;
  };
  const hasFeaturedImage = !!featuredImage?.sourceUrl;

  const imgWidth = featuredImage?.mediaDetails?.width || 1000;
  const imgHeight = featuredImage?.mediaDetails?.height || 750;
  return (
    <>
      <div className="section-white"></div>
      <div className={`nc-PageSingle pt-8 lg:pt-16`}>
        <header className="rounded-xl">
          <div
            className={
              !hasFeaturedImage && showRightSidebar
                ? ""
                : `max-w-screen-md mx-auto`
            }
          >
            <SingleHeader post={{ ...post }} />
            {!hasFeaturedImage && (
              <div className="my-5 border-b border-neutral-200 dark:border-neutral-800" />
            )}
          </div>
        </header>

        {layoutStyle == "Style 1" && (
          <div className="post-style-1">
            {postData?.products?.map((item: any, index: number) => (
              <div key={index} className="box-product product-review-layout container max-w-96 mt-20 mx-0" id={`product_${++index}`}>
                <div className="product-overview grid grid-cols-1 lg:grid-cols-2 gap-7">
                  <div className="block lg:hidden">
                    <h3 className="product-index text-center">{index}</h3>
                    <span className="uppercase block my-4 text-center">{item.title}</span>
                    <h3 className="product-name mb-4 text-center">{item.name}</h3>
                  </div>

                  <div className="product-image relative col-span-1">
                    {item.isBestSeller ? (
                      <>
                        <img width={130} className="absolute hidden lg:block top-10 left-2" src="/images/posts/best-seller-tag.svg" alt="" />
                        <img width={100} className="absolute block lg:hidden top-10 left-2" src="/images/posts/best-seller-tag.svg" alt="" />
                      </>
                    ) : null}
                    {!item.isBestSeller && item.isSale ? (
                      <>
                        <img width={130} className="absolute hidden lg:block top-1/3 left-2" src="/images/posts/on-sale.svg" alt="" />
                        <img width={100} className="absolute block lg:hidden top-1/3 left-2" src="/images/posts/on-sale.svg" alt="" />
                      </>
                    ) : null}
                    <img src={item.image.node.sourceUrl} alt="" />
                  </div>
                  <div className="product-info col-span-1">
                    <div className="hidden lg:block">
                      <h3 className="product-index">{index}</h3>
                      <span className="uppercase block my-4 mt-2 underline underline-offset-8 tracking-wider">{item.title}</span>
                      <h3 className="product-name">{item.name}</h3>
                    </div>
                    {item.brand ? (
                      <span className="brand-name uppercase my-4 text-neutral-500 text-left hidden lg:block">FROM: {item.brand}</span>
                    ) : null}
                    {item.salePercentage ? (
                      <span className="save-now uppercase block my-4 lg:mb-8 text-neutral-500 text-center lg:text-left">NOW {item.salePercentage}% OFF</span>
                    ) : null}
                    {item.actionButtons && item.actionButtons.map((e: any, index: any) => (
                      <Link key={index} href={e.actionLink} className={`m-auto lg:mx-0 block mb-4 w-fit ${!item.salePercentage ? '!mt-4' : ''}`}>
                        <button className="text-sm uppercase block bg-black text-white m-auto lg:m-0">
                          {e.actionText}
                        </button>
                      </Link>
                    ))}
                    {item.brand ? (
                      <span className="brand-name uppercase block mt-6 text-neutral-500 text-center lg:hidden">FROM: {item.brand}</span>
                    ) : null}
                  </div>
                </div>
                <div className="product-pros-cons grid grid-cols-2 gap-5 mt-3 lg:mt-7 border">
                  <div className="col-span-1 product-pros border-r p-4 pb-6">
                    <p className="pb-1">PROS</p>
                    <ul className="mt-3 flex flex-col gap-3">
                      {convertProsToArray(item.prosCons.pros)?.map((node: any, index: any) => {
                        if (node) {
                          return (
                            <li key={index} className="flex gap-2 items-start">
                              <img width={15} className="pros-cons-icon" src={"/images/posts/circle-check.svg"} alt="" />
                              <p>{node}</p>
                            </li>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </ul>
                  </div>
                  <div className="col-span-1 product-cons p-4 pb-6 pl-0">
                    <p className="pb-1">CONS</p>
                    <ul className="mt-3 flex flex-col gap-3">
                      {convertProsToArray(item.prosCons.cons)?.map((node: any, index: any) => (
                        index % 2 === 0 && node.nodeName !== '#text' && (
                          <li key={index} className="flex gap-2 items-start">
                            <img width={15} className="pros-cons-icon" src={"/images/posts/circle-xmark.svg"} alt="" />
                            <p>{node}</p>
                          </li>
                        )
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="product-review-content mt-10" dangerouslySetInnerHTML={{ __html: item.description }} />
              </div>
            ))}

            <div className="faqs-footer container m-0 !mt-20">
              {postData?.faqsFooter?.map((item: any, index: number) => (
                <div className="faq-item" key={index}>
                  <h4>{item.label}</h4>
                  <div className="faq-divider"></div>
                  <div className="faq-content mb-14" dangerouslySetInnerHTML={{ __html: item.content }}></div>
                </div>
              ))}
            </div>

            <FormSubscibe></FormSubscibe>

            <div className="watch-next container">
              <p className="underline underline-offset-4">WATCH NEXT</p>
              <h3 className="text-center mt-10">This Real Housewife of New York Is Most Likely to Throw a Fit</h3>
            </div>
          </div>
        )}

        <div className="footer-category container mt-28">
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
      </div>
    </>
  );
};

export default SingleType1;
