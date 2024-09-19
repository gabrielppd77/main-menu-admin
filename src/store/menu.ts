interface MenuProps {
  title: string;
  icon: string;
  link: string;
}

const menu: MenuProps[] = [
  {
    title: "Empresa",
    icon: "apartment",
    link: "/company",
  },
  {
    title: "Categorias",
    icon: "category",
    link: "/category",
  },
  {
    title: "Produtos",
    icon: "store",
    link: "/product",
  },
];

export default menu;
