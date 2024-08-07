import React from 'react';
import Link from 'next/link';

interface LayoutHalfFourProps {
  data: Array<any>;
}

const LayoutHalfFour: React.FC<LayoutHalfFourProps> = ({ data }) => {
  return (
    <div className="layout-half-four container grid grid-cols-6 gap-10">
      <div className="col-span-6 lg:col-span-4 grid grid-cols-2 gap-4 md:gap-10">
        {data?.map((item: any, index: number) => (
          <Link href={item?.uri ?? "/"} className="col-span-1" key={index}>
            <img className="w-full h-[140px] pre-sm:h-[250px] md:h-[352px] object-cover object-center" src={item?.featuredImage?.node?.sourceUrl} alt={item?.featuredImage?.node?.altText} />
            <p className="font-merriweather mt-7 text-black">{item.title}</p>
          </Link>
        ))}
      </div>
      <div className="sticky-image-layout col-span-6 lg:col-span-2 mb-24 md:my-0">
        <img className="sticky top-20" src="https://tpc.googlesyndication.com/simgad/14486007734352478124" alt="" />
      </div>
    </div>
  );
};

export default LayoutHalfFour;