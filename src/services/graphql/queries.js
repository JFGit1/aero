import { gql } from '@apollo/client';

export const MAIN_MENU = gql`
	query MainMenu {
		menu(id: "2", idType: DATABASE_ID) {
			menuItems(where: { parentId: "0" }) {
				nodes {
					uri
					label
					id
					childItems {
						nodes {
							label
							uri
							id
							childItems {
								nodes {
									label
									uri
									id
								}
							}
						}
					}
				}
			}
		}
	}
`;

export const PAGES_BY_SLUG = gql`
	query PageByIdQuery($id: ID!) {
		page(idType: URI, id: $id) {
			title
			content
		}
	}
`;

/* SEARCH */
export const SEARCH_IN_ALL = gql`
	query SearchInAll($search: String = "") {
		contentNodes(where: { search: $search, status: PUBLISH }, first: 50) {
			nodes {
				contentTypeName
				slug
				... on Page {
					title
				}
				... on Post {
					title
					excerpt
				}
			}
		}
	}
`;

/* BLOG */
export const ALL_POSTS = gql`
	query AllPosts {
		posts(where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
			nodes {
				databaseId
				title
				slug
				uri
				excerpt
				featuredImage {
					node {
						title
						sourceUrl(size: MEDIUM)
						mediaDetails {
							height
							width
						}
					}
				}
				categories(first: 1) {
					nodes {
						name
						slug
					}
				}
			}
		}
	}
`;

export const ALL_POSTS_PATH = gql`
	query AllPostsPath {
		posts(where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
			nodes {
				slug
				categories(first: 1) {
					nodes {
						slug
					}
				}
			}
		}
	}
`;
export const POST_PAGE = gql`
	query PostPage($id: ID = "") {
		post(id: $id, idType: SLUG) {
			databaseId
			title
			content
			featuredImage {
				node {
					title
					sourceUrl(size: MEDIUM)
					mediaDetails {
						height
						width
					}
				}
			}
			categories {
				nodes {
					databaseId
					name
					slug
				}
			}
		}
	}
`;

export const ALL_CATEGORY_PATH = gql`
	query AllCategoriesPath {
		categories(first: 50, where: { orderby: TERM_ORDER, order: DESC }) {
			nodes {
				name
				slug
			}
		}
	}
`;
export const CATEGORY_PAGE = gql`
	query CategoryPage($id: ID = "") {
		category(id: $id, idType: SLUG) {
			databaseId
			name
			slug
			posts(
				where: { orderby: { field: DATE, order: DESC }, status: PUBLISH }
			) {
				nodes {
					databaseId
					title
					slug
				}
			}
		}
	}
`;
