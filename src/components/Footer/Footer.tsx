import { FragmentType } from '@/__generated__'
import { NC_FOOTER_MENU_QUERY_FRAGMENT } from '@/fragments/menu'
import WidgetAddSubscriberForm from '../WidgetAddSubscriberForm/WidgetAddSubscriberForm'
import { NC_SITE_SETTINGS } from '@/contains/site-settings'
import MyImage from '../MyImage'
import { flatListToHierarchical } from '@faustwp/core'
import { NcFooterMenuFieldsFragmentFragment } from '@/__generated__/graphql'
import Link from 'next/link'
import Logo from '../Logo/Logo'
import Button from '../Button/Button'

interface Props {
	menuItems: FragmentType<typeof NC_FOOTER_MENU_QUERY_FRAGMENT>[] | null
}

export type FooterNavItemType = NcFooterMenuFieldsFragmentFragment & {
	children?: FooterNavItemType[]
}

export default function Footer({ menuItems }: Props) {
	const menus = flatListToHierarchical(menuItems || [], {
		idKey: 'id',
		parentKey: 'parentId',
		childrenKey: 'children',
	}) as FooterNavItemType[]

	const renderMenuItem = (item: FooterNavItemType, index: number) => {
		return (
			<div key={index + item.id}>
				<h3 className="text-sm font-semibold leading-6 text-neutral-900 dark:text-neutral-200">
					<Link href={item.uri ?? '/'}>{item.label}</Link>
				</h3>
				<ul role="list" className="mt-6 space-y-4">
					{item.children?.map((j, id) => (
						<li key={j.id + id}>
							<Link
								href={j.uri ?? ''}
								className="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-neutral-400 dark:hover:text-neutral-100"
							>
								{j.label}
							</Link>
						</li>
					))}
				</ul>
			</div>
		)
	}

	return (
		<footer
			className="border-t border-neutral-900/10 py-10 bg-black dark:border-transparent dark:bg-neutral-900"
			aria-labelledby="footer-heading"
		>
			<h2 id="footer-heading" className="sr-only">
				Footer
			</h2>
			<div className="container mx-auto max-w-7xl px-6 pb-8 lg:px-8 pt-10">
				
				<div className="border-t border-gray-900/10 md:flex md:items-center md:justify-between dark:border-neutral-700">
					<div className="flex flex-wrap gap-x-6 gap-y-3 md:order-2">
					</div>
					<div className="mt-0 text-[13px] leading-5 text-gray-500 md:order-1 grid grid-col-1 md:grid-cols-2 gap-5 md:gap-16 items-center">
						{/* {NC_SITE_SETTINGS.site_footer?.all_rights_reserved_text} */}
						<img src="/logo-white.png" width={'150'} />

						<div className='footer-icon col-span-1 flex items-center gap-7 my-4 md:my-0'>
							<Link href={'/'}>
								<img width={'18px'} src="/images/socials/footer-icon-1.svg" alt="" />
							</Link>
							<Link href={'/'}>
								<img width={'18px'} src="/images/socials/footer-icon-2.svg" alt="" />
							</Link>
							<Link href={'/'}>
								<img width={'18px'} src="/images/socials/footer-icon-3.svg" alt="" />
							</Link>
							<Link href={'/'}>
								<img width={'18px'} src="/images/socials/footer-icon-4.svg" alt="" />
							</Link>
							<Link href={'/'}>
								<img width={'18px'} src="/images/socials/footer-icon-5.svg" alt="" />
							</Link>
						</div>
					</div>
				</div>

				<div className="menu-footer xl:gap-8 mt-4">
					<div className="grid grid-cols-2 gap-3 md:gap-2 md:grid-cols-4">
						{menus.map(renderMenuItem)}
					</div>
					{/* <div className="mt-10 xl:mt-0">
						<WidgetAddSubscriberForm />
						</div> */}
				</div>
				<img className='brand-footer-image' src="/images/network-footer.svg" alt="" />
				<div className='footer-intro-txt'>
					<p>A Part of Hearst Digital Media</p>
					<p>We may earn commission from links on this page, but we only recommend products we back.</p>
					<p>©2024 Hearst Magazine Media, Inc. All Rights Reserved.</p>
				</div>

				<div className='legal-menu-footer mt-5 flex gap-5'>
					<Link href={'/privacy-policy'}>Privacy Notice</Link>
					<Link href={'/'}>CA Notice at Collection
					</Link>
					<Link href={'/'}>Your CA Privacy Rights/Shine the Light</Link>
					<Link href={'/'}>DAA Industry Opt Out</Link>
					<Link href={'/term-of-use'}>Terms of Use</Link>
					<Link href={'/'}>Site Map</Link>
				</div>

				<Button className='cookie-choices mt-16'>COOKIES CHOICES</Button>
			</div>
		</footer>
	)
}
