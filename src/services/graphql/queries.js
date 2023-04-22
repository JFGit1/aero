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

export const PROJECT_LIST = gql`
	query AllProjects {
		projects(first: 0, where: { status: PUBLISH }) {
			nodes {
				title
				slug
				uri
				projHasPage
				featuredImage {
					node {
						mediaItemUrl
					}
				}
				projTeam(first: 0) {
					nodes {
						title
						slug
						uri
						staffCategories {
							nodes {
								name
							}
						}
					}
				}
				projSubTitle
				projectsCategories {
					edges {
						node {
							name
							slug
							uri
						}
					}
				}
			}
		}
	}
`;

export const ALL_PROJECT_CATEGORIES = gql`
	query AllProjectsCategory {
		projectsCategories(first: 50, where: { hideEmpty: false }) {
			nodes {
				name
				slug
				uri
			}
		}
	}
`;

export const PROJECTS_CATEGORY = gql`
	query ProjectsCategory($slug: [String] = "") {
		projectsCategories(first: 50, where: { hideEmpty: false, slug: $slug }) {
			nodes {
				name
				slug
				uri
				description
				projects(where: { orderby: { field: TITLE, order: ASC } }) {
					nodes {
						title
						slug
						projHasPage
					}
				}
			}
		}
	}
`;

export const PROJECTS_PAGE = gql`
	query ProjectsPage($id: ID = "") {
		project(id: $id, idType: SLUG) {
			databaseId
			id
			title
			slug
			projHasPage
			projSubTitle
			content
			projCustomizedSolution
			projHighlights
			projTeam(first: 50) {
				nodes {
					databaseId
					id
					title
					slug
					uri
				}
			}
			projectsCategories(first: 50) {
				nodes {
					databaseId
					id
					name
					slug
					uri
				}
			}
			settings {
				nodes {
					databaseId
					id
					slug
				}
			}
			projFirstImage {
				node {
					sourceUrl(size: _1536X1536)
					title
					mediaDetails {
						height
						width
					}
				}
			}
			projSecondImage {
				node {
					sourceUrl(size: _1536X1536)
					title
					mediaDetails {
						height
						width
					}
				}
			}
			projThirdImage {
				node {
					sourceUrl(size: _1536X1536)
					title
					mediaDetails {
						height
						width
					}
				}
			}
			projFourthImage {
				node {
					sourceUrl(size: _1536X1536)
					title
					mediaDetails {
						height
						width
					}
				}
			}
		}
	}
`;

export const PROJECTS_PAGE_MEDIA = gql`
	query ProjectsPageMedia($parent: ID = "") {
		mediaItems(
			where: { orderby: { field: TITLE, order: ASC }, parent: $parent }
			first: 50
		) {
			nodes {
				databaseId
				id
				title
				sourceUrl(size: _1536X1536)
				mediaDetails {
					height
					width
				}
			}
		}
	}
`;

export const PROJECTS_PAGE_FULL = gql`
	query ProjectsPage($id: ID = "", $parent: ID = 301) {
		project(id: $id, idType: SLUG) {
			databaseId
			id
			title
			slug
			projHasPage
			projSubTitle
			content
			projCustomizedSolution
			projHighlights
			projTeam(first: 50) {
				nodes {
					databaseId
					id
					title
					slug
					uri
				}
			}
			projectsCategories(first: 50) {
				nodes {
					databaseId
					id
					name
					slug
					uri
				}
			}
			settings {
				nodes {
					databaseId
					id
					slug
				}
			}
		}
		mediaItems(
			where: { orderby: { field: TITLE, order: ASC }, parent: $parent }
			first: 50
		) {
			nodes {
				databaseId
				id
				title
				sourceUrl(size: _2048X2048)
				mediaDetails {
					height
					width
				}
			}
		}
	}
`;

export const ALL_PROJECTS_PATH = gql`
	query AllProjectsPath {
		projects(first: 200, where: { status: PUBLISH }) {
			nodes {
				slug
			}
		}
	}
`;

export const ALL_STAFF_LIST = gql`
	query AllStaffList {
		staffCategories(first: 50) {
			nodes {
				name
				slug
				staffs(
					first: 100
					where: { orderby: { field: MENU_ORDER, order: ASC } }
				) {
					nodes {
						title
						slug
						featuredImage {
							node {
								sourceUrl
								mediaDetails {
									height
									width
								}
							}
						}
					}
				}
			}
		}
	}
`;

export const STAFF_PAGE = gql`
	query StaffPage($id: ID = "") {
		staff(id: $id, idType: URI) {
			title
			slug
			staffSubTitle
			content
			staffInformations
			staffEmail
			featuredImage {
				node {
					sourceUrl(size: LARGE)
					mediaDetails {
						height
						width
					}
				}
			}
			projTeam(first: 100) {
				nodes {
					title
					slug
					status
				}
			}
		}
	}
`;

export const ALL_STAFF_PAGE = gql`
	query AllStaffPage {
		staffs(first: 500, where: { status: PUBLISH }) {
			nodes {
				slug
			}
		}
	}
`;

/* SEARCH - Open */
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
				... on Project {
					title
					excerpt
				}
				... on Staff {
					title
					excerpt
				}
			}
		}
	}
`;

export const SEARCH_ON_PROJECTS = gql`
	query SearchOnProjects($search: String = "") {
		contentNodes(
			where: { search: $search, status: PUBLISH, contentTypes: PROJECTS }
			first: 50
		) {
			nodes {
				slug
				... on Project {
					title
					excerpt
				}
			}
		}
	}
`;
/* SEARCH - Close */

export const ALL_POSTS = gql`
	query AllPosts {
		posts(where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
			nodes {
				databaseId
				title
				slug
				excerpt
				featuredImage {
					node {
						sourceUrl
						mediaDetails {
							height
							width
						}
					}
				}
			}
		}
	}
`;
