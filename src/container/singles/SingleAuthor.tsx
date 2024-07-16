import { FragmentType } from "@/__generated__";
import { NcmazFcUserFullFieldsFragment } from "@/__generated__/graphql";
import Avatar from "@/components/Avatar/Avatar";
import { NC_USER_FULL_FIELDS_FRAGMENT } from "@/fragments";
import { getImageDataFromImageFragment } from "@/utils/getImageDataFromImageFragment";
import getTrans from "@/utils/getTrans";
import { getUserDataFromUserCardFragment } from "@/utils/getUserDataFromUserCardFragment";
import Link from "next/link";
import React, { FC } from "react";

export interface SingleAuthorProps {
  author:
  | FragmentType<typeof NC_USER_FULL_FIELDS_FRAGMENT>
  | NcmazFcUserFullFieldsFragment;
}

const SingleAuthor: FC<SingleAuthorProps> = ({ author: authorProp }) => {
  const author = getUserDataFromUserCardFragment(
    authorProp as FragmentType<typeof NC_USER_FULL_FIELDS_FRAGMENT>
  );

  console.log(author)

  const T = getTrans();
  return (
    <div className="nc-SingleAuthor">
      <div className="flex items-center md:items-start gap-2">
        <Link href={author?.uri || ""}>
          <Avatar
            imgUrl={
              getImageDataFromImageFragment(
                author?.ncUserMeta?.featuredImage?.node
              ).sourceUrl
            }
            userName={author?.name || "T"}
            sizeClass="h-[60px] w-[60px]"
            radius="rounded-full"
          />
        </Link>
        <div className="flex flex-col max-w-lg">
          <h2 className="!text-xs uppercase underline underline-offset-2 font-semibold font-inter">
            <Link href={author?.uri || ""} className="text-sm">{author?.name}</Link>
          </h2>
          <p className="text-sm my-3">{author?.ncUserMeta?.ncBio}</p>
          <span className="text-sm hidden md:block">
            {author?.description || ""}
          </span>
          <Link href={author?.uri ?? "/"} className="mt-2 underline w-fit hidden md:block">
            <p className="text-sm">Read Full Bio</p>
          </Link>
        </div>
      </div>

      <div className="mt-4">
        <span className="block md:hidden text-[15px]">
          {author?.description || ""}
        </span>
      </div>
      <Link href={author?.uri ?? "/"} className="mt-2 underline w-fit block md:hidden">
        <p className="text-sm">Read Full Bio</p>
      </Link>
    </div>
  );
};

export default SingleAuthor;
