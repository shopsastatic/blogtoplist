import { FC } from 'react'
import Navigation from '@/components/Navigation/Navigation'
import MenuBar from '@/components/MenuBar/MenuBar'
import { NC_PRIMARY_MENU_QUERY_FRAGMENT } from '@/fragments/menu'
import { FragmentType } from '@/__generated__'
import AvatarDropdown from './AvatarDropdown'
import Brand from './Brand'
import CreateBtn from './CreateBtn'
import { SearchIconBtn } from './HeaderSearch'
import Button from '../Button/Button'
import Link from 'next/link'

export interface MainNav1Props {
	menuItems: FragmentType<typeof NC_PRIMARY_MENU_QUERY_FRAGMENT>[]
	title?: string | null
	description?: string | null
}

const MainNav1: FC<MainNav1Props> = ({ menuItems, title, description }) => {
	return (
		<div className="main-header nc-MainNav1 relative z-10 border-neutral-200/70 bg-white dark:border-transparent">
			<div className="container">
				<div className="flex h-12 items-center justify-between py-3 sm:py-4">
					<div className="flex flex-1 items-center">
						<div className="flex flex-1 items-center space-x-4 sm:space-x-10 lg:justify-start 2xl:space-x-14 rtl:space-x-reverse">
							<Brand title={title} description={description} />

							<Navigation menuItems={menuItems} className="header-menu text-black hidden lg:flex" />
						</div>
					</div>


					<div className="flex flex-1 items-center justify-end space-x-1 text-black rtl:space-x-reverse">
						<div className="items-center flex lg:flex">
							{/* <CreateBtn /> */}
							{/* <SearchIconBtn className="flex" /> */}
							{/* <AvatarDropdown /> */}
							<Button href='/email/lulune-newsletter/' className='header-subscribe mr-3 bg-black !text-white !py-2 !text-xs !hover:text-black hover:bg-White !rounded-none'>SUBSCRIBE</Button>
							<MenuBar menuItems={menuItems} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MainNav1
