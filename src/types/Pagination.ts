export type PaginationLinkT = {
  url: string | null;
  label: string;
  active: boolean;
  page: number | null;
};

export type PaginationLinksT = {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
};

export type PaginationMetaT = {
  current_page: number;
  from: number;
  last_page: number;
  links: PaginationLinkT[];
  per_page: number;
  to: number;
  total: number;
};

export type PaginatedData<T> = {
  data: T[];
  links: PaginationLinksT;
  meta: PaginationMetaT;
};

export type ApiPaginatedResponse<T> = {
  success: boolean;
  message: string;
  data: PaginatedData<T>;
};
