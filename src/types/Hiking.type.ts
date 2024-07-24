export type HikingSearch = {
  id: number;
  title: string;
  state: string;
  categoriesId: number;
  state_id: number;
  difficulty: string;
};

export type HikingExplore = {
  id: number;
  main_image: number;
  title: string;
  state_id?: number;
};
