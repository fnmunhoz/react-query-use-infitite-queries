import { rest, setupWorker } from "msw";
import { Item } from "./api";

const mockHttp = () => {
  const items: Item[] = [
    {
      id: 1,
      name: "item 1",
      sectionId: "section1",
      subSectionId: "subSectionA",
    },
    {
      id: 2,
      name: "item 2",
      sectionId: "section1",
      subSectionId: "subSectionA",
    },
    {
      id: 3,
      name: "item 3",
      sectionId: "section1",
      subSectionId: "subSectionA",
    },
    {
      id: 4,
      name: "item 4",
      sectionId: "section1",
      subSectionId: "subSectionA",
    },
    {
      id: 5,
      name: "item 5",
      sectionId: "section1",
      subSectionId: "subSectionA",
    },
    {
      id: 6,
      name: "item 6",
      sectionId: "section1",
      subSectionId: "subSectionA",
    },
    {
      id: 7,
      name: "item 7",
      sectionId: "section1",
      subSectionId: "subSectionA",
    },
    {
      id: 8,
      name: "item 8",
      sectionId: "section1",
      subSectionId: "subSectionA",
    },
    {
      id: 9,
      name: "item 9",
      sectionId: "section1",
      subSectionId: "subSectionB",
    },
    {
      id: 10,
      name: "item 10",
      sectionId: "section1",
      subSectionId: "subSectionB",
    },
    {
      id: 11,
      name: "item 11",
      sectionId: "section1",
      subSectionId: "subSectionB",
    },
    {
      id: 12,
      name: "item 12",
      sectionId: "section1",
      subSectionId: "subSectionB",
    },
    {
      id: 13,
      name: "item 13",
      sectionId: "section1",
      subSectionId: "subSectionB",
    },
    {
      id: 14,
      name: "item 14",
      sectionId: "section1",
      subSectionId: "subSectionB",
    },
    {
      id: 15,
      name: "item 15",
      sectionId: "section1",
      subSectionId: "subSectionB",
    },
    {
      id: 16,
      name: "item 16",
      sectionId: "section1",
      subSectionId: "subSectionB",
    },
    {
      id: 17,
      name: "item 17",
      sectionId: "section2",
      subSectionId: "subSectionC",
    },
    {
      id: 18,
      name: "item 18",
      sectionId: "section2",
      subSectionId: "subSectionC",
    },
    {
      id: 19,
      name: "item 19",
      sectionId: "section2",
      subSectionId: "subSectionC",
    },
    {
      id: 20,
      name: "item 20",
      sectionId: "section2",
      subSectionId: "subSectionC",
    },
    {
      id: 21,
      name: "item 21",
      sectionId: "section2",
      subSectionId: "subSectionC",
    },
    {
      id: 22,
      name: "item 22",
      sectionId: "section2",
      subSectionId: "subSectionC",
    },
    {
      id: 23,
      name: "item 23",
      sectionId: "section2",
      subSectionId: "subSectionC",
    },
    {
      id: 24,
      name: "item 24",
      sectionId: "section2",
      subSectionId: "subSectionC",
    },
    {
      id: 25,
      name: "item 25",
      sectionId: "section2",
      subSectionId: "subSectionD",
    },
    {
      id: 26,
      name: "item 26",
      sectionId: "section2",
      subSectionId: "subSectionD",
    },
    {
      id: 27,
      name: "item 27",
      sectionId: "section2",
      subSectionId: "subSectionD",
    },
    {
      id: 28,
      name: "item 28",
      sectionId: "section2",
      subSectionId: "subSectionD",
    },
    {
      id: 29,
      name: "item 29",
      sectionId: "section2",
      subSectionId: "subSectionD",
    },
    {
      id: 30,
      name: "item 30",
      sectionId: "section2",
      subSectionId: "subSectionD",
    },
    {
      id: 31,
      name: "item 31",
      sectionId: "section2",
      subSectionId: "subSectionD",
    },
    {
      id: 32,
      name: "item 32",
      sectionId: "section2",
      subSectionId: "subSectionD",
    },
  ];

  const handlers = [
    rest.get("/items/:section/:subSection", (req, res, ctx) => {
      const { section, subSection } = req.params;
      const offset = parseInt(req.url.searchParams.get("offset") || "0");
      const limit = parseInt(req.url.searchParams.get("limit") || "3");

      const filteredItems = items.filter(
        (i) => i.sectionId === section && i.subSectionId === subSection
      );

      return res(
        ctx.json({
          offset,
          limit,
          total: filteredItems.length,
          items: filteredItems.slice(offset, offset + limit),
        }),
        ctx.delay(2000)
      );
    }),
  ];

  const worker = setupWorker(...handlers);

  worker.start();
};

export default mockHttp;
