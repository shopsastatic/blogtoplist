import React, { FC } from "react";
import NcImage from "@/components/NcImage/NcImage";
import { CUSTOM_POST_DATA, getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import SingleHeader from "../SingleHeader";
import { FragmentType } from "@/__generated__";
import { NC_POST_FULL_FRAGMENT } from "@/fragments";
import { ApolloClient, InMemoryCache, useApolloClient } from '@apollo/client';
import Link from "next/link";
import classNames from "@/utils/classNames";

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
    ncPostMetaData
  } = getPostDataFromPostFragment(post || {});
  //

  const postData = CUSTOM_POST_DATA(uri)
  let acfPostData = []

  if (postData && postData.data) {
    acfPostData = postData.data.postBy.postData.products
  }

  const convertProsToArray = (prosString: any) => {
    // Split the string into an array of lines
    let lines = prosString?.trim()?.split('\n')?.map((line: any) => line.trim());
  
    return lines;
  };
  const hasFeaturedImage = !!featuredImage?.sourceUrl;

  const imgWidth = featuredImage?.mediaDetails?.width || 1000;
  const imgHeight = featuredImage?.mediaDetails?.height || 750;
  return (
    <>
      <div className={`nc-PageSingle pt-8 lg:pt-16`}>
        <header className="container rounded-xl">
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

        {/* FEATURED IMAGE */}
        {/* {!!hasFeaturedImage && (
          <NcImage
            alt={title}
            containerClassName="container my-10 sm:my-12"
            className={`rounded-xl mx-auto ${
              imgWidth <= 768 && ncPostMetaData?.showRightSidebar
                ? "w-full max-w-screen-md"
                : ""
            }`}
            src={featuredImage?.sourceUrl || ""}
            width={imgWidth}
            height={imgHeight}
            sizes={"(max-width: 1024px) 100vw, 1280px"}
            priority
            enableDefaultPlaceholder
          />
        )} */}


        {acfPostData?.map((item: any, index: number) => (
          <div key={index} className="box-product product-review-layout container max-w-96 mt-20 mx-0">
            <div className="product-overview grid grid-cols-1 lg:grid-cols-2 gap-7">
              <div className="block lg:hidden">
                <h3 className="product-index text-center">{++index}</h3>
                <span className="uppercase block my-4 text-center">{item.title}</span>
                <h3 className="product-name mb-4 text-center">{item.name}</h3>
              </div>

              <div className="product-image relative col-span-1">
                {item.isSale ? (
                  <>
                    <img width={130} className="absolute hidden lg:block top-1/3 left-2" src="https://content.lulune.com/wp-content/uploads/2024/06/on-sale.png" alt="" />
                    <img width={100} className="absolute block lg:hidden top-1/3 left-2" src="https://content.lulune.com/wp-content/uploads/2024/06/on-sale.png" alt="" />
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
                  <span className="brand-name uppercase block my-4 lg:mb-4 text-neutral-500 text-center lg:text-left">FROM: {item.brand}</span>
                ) : null}
                {item.salePercentage ? (
                  <span className="save-now uppercase block my-4 lg:mb-8 text-neutral-500 text-center lg:text-left">NOW {item.salePercentage}% OFF</span>
                ) : null}
                {item.actionButtons && item.actionButtons.map((e, index) => (
                  <Link key={index} href={e.actionLink} className={`m-auto block mb-4 ${!item.salePercentage ? '!mt-4' : ''}`}>
                    <button className="text-sm uppercase block bg-black text-white m-auto lg:m-0">
                      {e.actionText}
                    </button>
                  </Link>
                ))}
              </div>
            </div>
            <div className="product-pros-cons grid grid-cols-2 gap-5 mt-7 border rounded">
              <div className="col-span-1 product-pros border-r p-4 pb-6">
                <p className="pb-1">PROS</p>
                <ul className="mt-3 flex flex-col gap-3">
                {convertProsToArray(item.prosCons.pros)?.map((node, index) => {
                  if (node) {
                    console.log(node)
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
                  {convertProsToArray(item.prosCons.cons)?.map((node, index) => (
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
      </div>
    </>
  );
};

export default SingleType1;
