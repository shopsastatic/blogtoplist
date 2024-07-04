import React from 'react';
import Link from 'next/link';

interface LayoutSliceThree {
    data: Array<any>;
}

const LayoutSliceThree: React.FC<LayoutSliceThree> = ({ data }) => {
    return (
        <div className='layout-slice-three container grid grid-cols-1 md:grid-cols-3 gap-7 mt-10 my-14'>
            {data?.map((item: any, index: number) => (
                <div className='col-span-2 md:col-span-1' key={index}>
                    <Link href={item?.uri ?? ""}>
                        <div className='grid grid-cols-2 gap-3 items-center'>
                            <img className='col-span-1' src={item?.featuredImage?.node.sourceUrl} alt={item?.featuredImage?.node?.altText} />
                            <span className='block col-span-1 text-md mt-3 font-merriweather'>{item?.title}</span>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default LayoutSliceThree;