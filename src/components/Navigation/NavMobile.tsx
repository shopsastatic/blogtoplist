'use client'

import React from 'react'
import ButtonClose from '@/components/ButtonClose/ButtonClose'
import Logo from '@/components/Logo/Logo'
import { Disclosure } from '@headlessui/react'
import { NavItemType } from './NavigationItem'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { NC_SITE_SETTINGS } from '@/contains/site-settings'
import MyImage from '../MyImage'
import { FragmentType } from '@/__generated__'
import { NC_PRIMARY_MENU_QUERY_FRAGMENT } from '@/fragments/menu'
import { flatListToHierarchical } from '@faustwp/core'
import { useRouter } from 'next/router'
import { SearchIcon } from '../Icons/Icons'

export interface NavMobileProps {
	menuItems: FragmentType<typeof NC_PRIMARY_MENU_QUERY_FRAGMENT>[]
	onClickClose?: () => void
}

const NavMobile: React.FC<NavMobileProps> = ({
	menuItems: menuItemsProp,
	onClickClose,
}) => {
	const router = useRouter()
	const menuItems = flatListToHierarchical(menuItemsProp, {
		idKey: 'id',
		parentKey: 'parentId',
		childrenKey: 'children',
	})

	const _renderMenuChild = (
		item: NavItemType,
		itemClass = ' ps-3 text-black font-medium',
	) => {
		return (
			<ul className="nav-mobile-sub-menu relative pb-1 ps-6 text-base">
				<div className="absolute bottom-2 start-4 top-2 border-s-2 border-neutral-100 dark:border-neutral-700" />
				{item.children?.map((i, index) => (
					<Disclosure key={index} as="li">
						<Link
							href={{
								pathname: i.uri || '',
							}}
							className={`mt-0.5 flex rounded-lg pe-4 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 ${itemClass}`}
						>
							<span
								className={`py-2.5 ${!i.children ? 'block w-full' : ''}`}
								onClick={onClickClose}
							>
								{i.label}
							</span>
							{!!i.children?.length && (
								<span
									className="flex flex-grow items-center"
									onClick={e => e.preventDefault()}
								>
									<Disclosure.Button
										as="span"
										className="flex flex-grow justify-end"
									>
										<ChevronDownIcon
											className="ms-2 h-4 w-4 text-neutral-500"
											aria-hidden="true"
										/>
									</Disclosure.Button>
								</span>
							)}
						</Link>
						{!!i.children?.length && (
							<Disclosure.Panel>
								{_renderMenuChild(
									i,
									'ps-3 text-neutral-600 dark:text-neutral-400 ',
								)}
							</Disclosure.Panel>
						)}
					</Disclosure>
				))}
			</ul>
		)
	}

	const _renderItem = (item: NavItemType, index: number) => {
		return (
			<Disclosure
				key={index}
				as="li"
				className="text-black"
				defaultOpen={!index}
			>
				<Link
					className="flex w-full items-center rounded-lg px-4 py-2.5 text-sm font-medium tracking-wide hover:bg-neutral-100 dark:hover:bg-neutral-800"
					href={{
						pathname: item.uri || '',
					}}
				>
					<span
						className={!item.children ? 'block w-full' : ''}
						onClick={onClickClose}
					>
						{item.label}
					</span>
					{!!item.children?.length && (
						<span className="block flex-grow" onClick={e => e.preventDefault()}>
							<Disclosure.Button
								as="span"
								className="flex flex-grow justify-end"
							>
								<ChevronDownIcon
									className="ms-2 h-4 w-4 text-neutral-500"
									aria-hidden="true"
								/>
							</Disclosure.Button>
						</span>
					)}
				</Link>
				{!!item.children?.length && (
					<Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>
				)}
			</Disclosure>
		)
	}

	const renderSearchForm = () => {
		return (
			<form
				onSubmit={e => {
					e.preventDefault()
					router.push('/search/posts/' + e.currentTarget.mbsearch.value || '')
				}}
				className="flex-1"
			>
				<div className="relative flex h-full rounded-xl">
					<input
						type="search"
						name="mbsearch"
						id="mbsearch"
						placeholder="Search"
						className="w-full flex-1 border-none bg-transparent py-3.5 pe-10 text-sm focus:outline-none focus:ring-0 indent-8"
					/>

					<button
						type="submit"
						className="absolute inset-y-0 start-0 py-2 pe-4 ps-2"
					>
						<SearchIcon className="h-5 w-5" />
					</button>
				</div>
			</form>
		)
	}

	return (
		<div className="sidebar-menu h-screen w-full transform overflow-y-auto bg-white py-2 shadow-lg ring-1 transition dark:bg-black dark:ring-neutral-700">
			<div className="px-5">
				<span className="absolute end-2 p-1 z-10 mt-1">
					<ButtonClose onClick={onClickClose} />
				</span>

				<div className="sidebar-search">{renderSearchForm()}</div>
			</div>
			<ul className="flex flex-col space-y-1 px-2 py-6 rtl:space-x-reverse">
				{menuItems?.map((item, index) =>
					_renderItem(item as NavItemType, index),
				)}
			</ul>

			<div className='sidebar-menu-footer flex gap-5 mt-5 pt-5 px-6'>
				<Link href={'/'}>Privacy Policy</Link>
				<Link href={'/'}>Term of Use</Link>
			</div>
		</div>
	)
}

export default NavMobile
