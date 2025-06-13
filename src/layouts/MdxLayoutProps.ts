import type { MDXLayoutProps } from "astro";
import type { BreadcrumbItem } from "../components/Breadcrumbs.astro";

export type MdxLayoutProps = MDXLayoutProps<{
  // 在这里定义 frontmatter 属性
  title: string;
  author: string;
  date: string;
  parent?: { name: string; path: string } | undefined;
  translateFrom?: { url: string; title: string } | undefined;
}> & {
  breadcrumbs?: BreadcrumbItem[] | null | undefined;
};
