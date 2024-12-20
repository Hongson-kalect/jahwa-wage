import * as React from "react";
import Heading1 from "../_shared/heading1";
import { Skeleton } from "antd";
import { useSearch } from "../../../../../hooks/useSearch";
import { use } from "i18next";
import { useTranslation } from "react-i18next";

const NewsItem = ({ title, content }: { title: string; content: string }) => {
  return (
    <div className="flex gap-4 text-gray-500">
      - <p>{title}</p> <p>{content}</p>
    </div>
  );
};

export interface INewsProps {
  news?: { title: string; content: string }[];
}

export default function News({ news }: INewsProps) {
  const { t } = useTranslation();
  const [paramsObject, setSearchParams] = useSearch();

  return (
    <div>
      <div onClick={() => alert("Đi ")}>
        <Heading1 title={t("homePage.news")} />
      </div>

      {!news ? (
        <Skeleton active />
      ) : !news.length ? (
        <div>Không có tin tức</div>
      ) : (
        <div className="px-5 py-3">
          {news.map((item, index) => (
            <NewsItem title={item.title} content={item.content} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}
