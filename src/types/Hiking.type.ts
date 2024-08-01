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

export type HikingInformation = {
  main_image: number | null;
  main_image_position: number;
  state: string;
  content: string;
  indication: string;
  title: string;
  difficulty: string;
  length: number;
  elevation: number;
  duration: string;
  images: number[];
};
