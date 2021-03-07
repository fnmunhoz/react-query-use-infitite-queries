import axios from "axios";
import {
  InfiniteData,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
  useQueries,
  UseQueryOptions,
} from "react-query";

export type Item = {
  id: number;
  name: string;
  sectionId: string;
  subSectionId: string;
};

export type PaginatedItems = {
  items: Item[];
  total: number;
  offset: number;
  limit: number;
};

export type LandingPageContentItem = {
  sectionId: string;
  subSectionIds: string[];
};

export type LadingPageContent = LandingPageContentItem[];

export const useItemsApi = (sectionId: string, subSectionId: string) => {
  return useInfiniteQuery({
    queryKey: ["items", { sectionId, subSectionId }],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await axios.get<PaginatedItems>(
        `/items/${sectionId}/${subSectionId}`,
        {
          params: {
            offset: pageParam,
            limit: 3,
          },
        }
      );

      return response.data;
    },
    getNextPageParam: (data: PaginatedItems) =>
      data.items.length + data.offset < data.total
        ? data.items.length + data.offset
        : undefined,
  });
};

export const useItemsState = (content: LadingPageContent) => {
  const queries = content.flatMap(({ sectionId, subSectionIds }) =>
    subSectionIds.map((subSectionId) => ({
      queryKey: ["items", { sectionId, subSectionId }],
      queryFn: async () => {
        const response = await axios.get<PaginatedItems>(
          `/items/${sectionId}/${subSectionId}`,
          {
            params: {
              offset: 0,
              limit: 3,
            },
          }
        );

        const infiniteData: InfiniteData<PaginatedItems> = {
          pages: [response.data],
          pageParams: [0],
        };

        return infiniteData;
      },
    }))
  );

  const results = (useQueries(
    queries as UseQueryOptions<unknown, unknown, unknown>[]
  ) as unknown) as InfiniteQueryObserverResult<PaginatedItems, unknown>[];

  const isLoading = results.some((r) => r.isLoading);

  const isEmpty = results.every((r) => {
    switch (r.status) {
      case "success":
        return r.data.pages.length === 0;

      default:
        return true;
    }
  });

  return { isLoading, isEmpty };
};
