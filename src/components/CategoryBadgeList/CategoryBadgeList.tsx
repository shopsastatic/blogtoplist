import { TwMainColor } from '@/data/types';
import { FC } from 'react';
import Badge from '@/components/Badge/Badge';
import {
	NcmazFcCategoryCardFieldsNotImageFragment,
	NcmazFcCategoryFullFieldsFragmentFragment,
} from '@/__generated__/graphql';

export interface CategoryBadgeListProps {
	className?: string;
	itemClass?: string;
	categories:
		| NcmazFcCategoryCardFieldsNotImageFragment[]
		| NcmazFcCategoryFullFieldsFragmentFragment[];
}

const CategoryBadgeList: FC<CategoryBadgeListProps> = ({
	className = 'flex flex-wrap gap-1.5',
	itemClass,
	categories,
}) => {
	return (
		<div className={`nc-CategoryBadgeList ${className}`}>
			{categories.flatMap((item, index) => [
				index > 0 && <span key={`separator-${index}`}>/</span>,
				<Badge
					className={itemClass}
					key={item.name}
					name={item.name}
					href={item.uri || ''}
					color={(item?.ncTaxonomyMeta?.color?.[0] as TwMainColor) || 'gray'}
				/>
			])}
		</div>
	);
};

export default CategoryBadgeList;
