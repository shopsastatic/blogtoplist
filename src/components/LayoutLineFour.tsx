import React from 'react';
import Link from 'next/link';

interface LayoutLineFour {
    data: Array<any>;
}

const LayoutLineFour: React.FC<LayoutLineFour> = ({ data }) => {
    return (
        <div className="layout-line-four grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 container">
            {data?.map((item: any, index: number) => (
                <Link href={item?.uri ?? "/"} className="col-span-1" key={index}>
                    <img className="w-full h-[140px] pre-sm:h-[250px] md:h-[200px] lg:h-[266px] object-cover object-center" src={item?.featuredImage?.node?.sourceUrl} alt={item?.featuredImage?.node?.altText} />
                    <p className="font-merriweather mt-7 text-black">{item.title}</p>
                </Link>
            ))}
        </div>
    );
};

export default LayoutLineFour;