import { gql, useQuery } from "@apollo/client";
import { FragmentType, useFragment } from "../__generated__";
import {
  NC_CATEGORY_CARD_FIELD_NOT_IMAGE_FRAGMENT,
  NC_IMAGE_MEDIA_FRAGMENT,
  NC_CATEGORY_FULL_FIELDS_FRAGMENT,
  // GET_CURRENT_CATEGORY
} from "../fragments";
import {
  NcmazFcCategoryFullFieldsFragmentFragment,
  NcmazFcCategoryCardFieldsNotImageFragment,
  NcmazFcImageFieldsFragment,
} from "@/__generated__/graphql";

export function getCatgoryDataFromCategoryFragment(
  category:
    | FragmentType<typeof NC_CATEGORY_FULL_FIELDS_FRAGMENT>
    | FragmentType<typeof NC_CATEGORY_CARD_FIELD_NOT_IMAGE_FRAGMENT>
    | NcmazFcCategoryFullFieldsFragmentFragment
    | NcmazFcCategoryCardFieldsNotImageFragment
) {
  let fullQuery = useFragment(
    NC_CATEGORY_FULL_FIELDS_FRAGMENT,
    category as FragmentType<typeof NC_CATEGORY_FULL_FIELDS_FRAGMENT>
  );

  let featuredImageMeta: NcmazFcImageFieldsFragment | undefined | null = null;
  featuredImageMeta = useFragment(
    NC_IMAGE_MEDIA_FRAGMENT,
    fullQuery.ncTaxonomyMeta?.featuredImage?.node
  );

  const data: NcmazFcCategoryFullFieldsFragmentFragment & {
    featuredImageMeta: NcmazFcImageFieldsFragment | null | undefined;
    colorMeta: (string | null)[] | null | undefined;
  } = {
    ...fullQuery,
    __typename: "Category",
    databaseId: fullQuery.databaseId || 0,
    name: fullQuery.name || "",
    uri: fullQuery.uri || "",
    count: fullQuery.count || 0,
    ncTaxonomyMeta: fullQuery.ncTaxonomyMeta,
    featuredImageMeta,
    colorMeta: fullQuery.ncTaxonomyMeta?.color,
  };

  return {
    ...data,
    uri: data.uri || "",
    name: data.name || "",
    count: data.count || 0,
  };
}

const GET_CATEGORIES = gql`
  query GetCategoryPosts($databaseID: ID!) {
  category(id: $databaseID, idType: DATABASE_ID) {
    id
    name
    ncTaxonomyMeta {
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
    description
    categorylayout {
      postTemp1 {
         nodes{
            ... on Post {
            id
            title
            uri
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
          }
      }
      subCategory1 {
        nodes {
            name
            ... on Category {
              posts (first: 5) {
                nodes {
                    id
                    title
                    uri
                    featuredImage {
                      node {
                        sourceUrl
                      }
                    }
                  }
              }
            }
          }
      }

      subCategory2 {
        nodes {
            name
            ... on Category {
              posts (first: 4) {
                nodes {
                    id
                    title
                    uri
                    featuredImage {
                      node {
                        sourceUrl
                      }
                    }
                  }
              }
            }
          }
      }

      subCategory3 {
        nodes {
            name
            ... on Category {
              posts (first: 12) {
                nodes {
                    id
                    title
                    uri
                    featuredImage {
                      node {
                        sourceUrl
                      }
                    }
                  }
              }
            }
          }
      }

      subCategory4 {
        nodes {
            name
            ... on Category {
              posts (first: 4) {
                nodes {
                    id
                    title
                    uri
                    featuredImage {
                      node {
                        sourceUrl
                      }
                    }
                  }
              }
            }
          }
      }
      
       subCategory5 {
        nodes {
            name
            ... on Category {
              posts (first: 1) {
                nodes {
                    id
                    title
                    uri
                    featuredImage {
                      node {
                        sourceUrl
                      }
                    }
                  }
              }
            }
          }
      }
    }
  }
}
`;

export const GET_CUSTOM_CATEGORIES = (databaseID: any) => {
  const { loading, error, data } = useQuery(GET_CATEGORIES, {
    variables: {
      databaseID: databaseID
    }
  });

  return {error, loading, data};
};