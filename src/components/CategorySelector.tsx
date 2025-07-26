import type { Category } from "../types/Quiz";
import type { RadioChangeEvent } from "antd";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { Radio } from "antd";

import { fetchCategories } from "./queries";

function categoryQueryOptions() {
  return queryOptions({
    queryKey: ["categories"],
    queryFn: () => {
      return fetchCategories();
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60, // 1 hour
  });
}

export default function CategorySelector({
  selectedId,
  onSelectCategory,
}: {
  selectedId: number;
  onSelectCategory: (categoryId: number) => void;
}) {
  const categories = useQuery(categoryQueryOptions());

  const onCategoryChange = (e: RadioChangeEvent) => {
    onSelectCategory(e.target.value);
  };

  return (
    <div className="flex flex-col w-[80%] mx-auto bg-quiz-base-100 border-quiz-base-300 mb-2 rounded-2xl p-5">
      {categories.isFetching ? (
        <div className="text-xs">Loading Categories ...</div>
      ) : (
        <>
          <h4 className="mx-1 mb-2">Category</h4>
          <div className="trivia-categories overflow-auto no-scrollbar flex ">
            <Radio.Group
              value={selectedId}
              onChange={onCategoryChange}
              className="radio-custom overflow-auto mx-2 no-scrollbar flex!"
            >
              <Radio key={0} value={0} className="category-radio">
                All
              </Radio>

              {categories.data?.trivia_categories.map((category: Category) => {
                return (
                  <Radio
                    key={category.id}
                    value={category.id}
                    className="category-radio"
                  >
                    {category.name}
                  </Radio>
                );
              })}
            </Radio.Group>
          </div>
        </>
      )}
    </div>
  );
}
