import { gql } from "@/__generated__";
import EntryHeader from "../components/entry-header";
import {
  GetPageQuery,
  NcgeneralSettingsFieldsFragmentFragment,
} from "../__generated__/graphql";
import { FaustTemplate, flatListToHierarchical } from "@faustwp/core";
import { FOOTER_LOCATION, PRIMARY_LOCATION } from "@/contains/menu";
import PageLayout from "@/container/PageLayout";
import MyWordPressBlockViewer from "@/components/MyWordPressBlockViewer";
import SinglePage from "@/container/singles/SinglePage";
import ArchiveLayout from "@/container/archives/ArchiveLayout";

const Page: FaustTemplate<GetPageQuery> = (props) => {
  // LOADING ----------
  if (props.loading) {
    return <>Loading...</>;
  }

  // for this page
  const { title, editorBlocks, featuredImage, ncPageMeta, pageCategory, uri, content } =
    props.data?.page || {};

  const blocks = flatListToHierarchical(editorBlocks as any, {
    idKey: "clientId",
    parentKey: "parentClientId",
  });

  const pageContent = props.data?.page?.editorBlocks
  const isFrontPage = props.data?.page?.isFrontPage
  
  const postTyped: any = pageCategory;
  const postsByCategory = postTyped?.pageCategory?.nodes?.[0] ?? []

  if (isFrontPage) {
    return (
      <PageLayout
        headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
        footerMenuItems={props.data?.footerMenuItems?.nodes || []}
        pageFeaturedImageUrl={featuredImage?.node?.sourceUrl}
        pageTitle={title}
        generalSettings={
          props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
        }
      >
        <ArchiveLayout
          name={"Home"}
          initPosts={[]}
          initPostsPageInfo={null}
          tagDatabaseId={null}
          taxonomyType="tag"
          top10Categories={[]}
          categorylayout={[]}
          ncTaxonomyMeta={[]}
          homepageData={props.data?.page?.pageCategory}
          homepageImageUrl={featuredImage?.node?.sourceUrl}
        ></ArchiveLayout>
      </PageLayout>
    )
  }

  return (
    <>
      <PageLayout
        headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
        footerMenuItems={props.data?.footerMenuItems?.nodes || []}
        pageFeaturedImageUrl={featuredImage?.node?.sourceUrl}
        pageTitle={title}
        generalSettings={
          props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
        }
      >
        <div className="section-white"></div>
        <div className={`pt-8`}>
          <header className="rounded-xl">
            <div
              className="mx-auto"
            >
              <SinglePage page={{ ...props?.data?.page }} category={postsByCategory} />
            </div>
          </header>
        </div>
      </PageLayout>
    </>
  );
};

Page.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
    headerLocation: PRIMARY_LOCATION,
    footerLocation: FOOTER_LOCATION,
  };
};

// Note***: tat ca cac query trong cac page deu phai co generalSettings, no duoc su dung o compoent Wrap
Page.query = gql(`
  query GetPage($databaseId: ID!, $asPreview: Boolean = false, $headerLocation: MenuLocationEnum!, $footerLocation: MenuLocationEnum!) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      uri
      content
      ncPageMeta {
        isFullWithPage
      }
      featuredImage {
        node {
          altText
          sourceUrl
        }
      }
      pageCategory {
      pageCategory {
        nodes {
          id
          databaseId
          name
          uri
          ... on Category {
            posts {
              nodes {
                id
                title
                uri
                featuredImage {
                  node {
                    altText
                    sourceUrl
                  }
                }
              }
            }
          }
        }
      }
      homeCategory1 {
        nodes {
          name
          uri
          ... on Category {
            posts (first: 5) {
              nodes {
                title
                uri
                featuredImage {
                  node {
                    altText
                    sourceUrl
                  }
                }
              }
            }
          }
        }
      }
      
      homeCategory2 {
        nodes {
          name
          uri
          ... on Category {
            posts (first: 4) {
              nodes {
                title
                uri
                featuredImage {
                  node {
                    altText
                    sourceUrl
                  }
                }
              }
            }
          }
        }
      }
      
      homeCategory3 {
        nodes {
          name
          uri
          ... on Category {
            posts (first: 12) {
              nodes {
                title
                uri
                featuredImage {
                  node {
                    altText
                    sourceUrl
                  }
                }
              }
            }
          }
        }
      }
      
      homeCategory4 {
        nodes {
          name
          uri
          ... on Category {
            posts (first: 4) {
              nodes {
                title
                uri
                featuredImage {
                  node {
                    altText
                    sourceUrl
                  }
                }
              }
            }
          }
        }
      }
      
      homeCategory5 {
        nodes {
          name
          uri
          ... on Category {
            posts (first: 1) {
              nodes {
                title
                uri
                featuredImage {
                  node {
                    altText
                    sourceUrl
                  }
                }
              }
            }
          }
        }
      }
      
      homePost1 {
        nodes {
          ... on Post {
            title
            uri
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    }
      editorBlocks(flat: true) {
        __typename
        renderedHtml
        clientId
        parentClientId
        ...NcmazFaustBlockMagazineFragment
        ...NcmazFaustBlockTermsFragment
        ...NcmazFaustBlockCtaFragment
        ...NcmazFaustBlockGroupFragment
        ...CoreColumnsFragment
        ...CoreColumnFragment
      }
        isFrontPage
    }
    # common query for all page 
    generalSettings {
      ...NcgeneralSettingsFieldsFragment
    }
    primaryMenuItems: menuItems(where: { location:  $headerLocation  }, first: 80) {
      nodes {
        ...NcPrimaryMenuFieldsFragment
      }
    }
    footerMenuItems: menuItems(where: { location:  $footerLocation  }, first: 40) {
      nodes {
        ...NcFooterMenuFieldsFragment
      }
    }
  }
`);

export default Page;
