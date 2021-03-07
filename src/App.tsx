import "./App.css";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import {
  LadingPageContent,
  LandingPageContentItem,
  useItemsApi,
  useItemsState,
} from "./api";

const SubSection = ({
  sectionId,
  subSectionId,
}: {
  sectionId: string;
  subSectionId: string;
}) => {
  const result = useItemsApi(sectionId, subSectionId);

  if (!result.isSuccess || !result.data.pages.length) return null;

  return (
    <div className="sub-section">
      {subSectionId}
      <ul>
        {result.data.pages.map((page) =>
          page.items.map((i) => <li key={i.id}>{i.name}</li>)
        )}
      </ul>
      {result.hasNextPage && (
        <button
          onClick={() => {
            result.fetchNextPage();
          }}
        >
          {result.isFetchingNextPage ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
};

const Section = ({ content }: { content: LandingPageContentItem }) => {
  const { isEmpty } = useItemsState([content]);

  if (isEmpty) return null;

  return (
    <div className="section">
      {content.sectionId}
      {content.subSectionIds.map((subSectionId) => (
        <SubSection
          key={subSectionId}
          sectionId={content.sectionId}
          subSectionId={subSectionId}
        />
      ))}
    </div>
  );
};

const LandingPage = () => {
  const dynamicLandingPageContent: LadingPageContent = [
    {
      sectionId: "section1",
      subSectionIds: ["subSectionA", "subSectionB"],
    },
    {
      sectionId: "section2",
      subSectionIds: ["subSectionC", "subSectionD"],
    },
  ];

  const { isEmpty, isLoading } = useItemsState(dynamicLandingPageContent);

  if (isLoading) return <>Loading...</>;

  if (isEmpty) return <>No sections</>;

  return (
    <>
      {dynamicLandingPageContent.map((content) => (
        <Section key={content.sectionId} content={content} />
      ))}
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <LandingPage />
    </QueryClientProvider>
  );
};

export default App;
