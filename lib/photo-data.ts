// Photo data for all collections

export interface LocationPhotos {
  id: string;
  name: string;
  region: string;
  country: string;
  photoCount: number;
  description: string;
  hero: string;
  photos: string[];
}

// Generate photo list helper
function generatePhotoList(location: string, fileNames: string[]): string[] {
  return fileNames.map(file => `/images/revelations/${location}/${file}`);
}

export const revelationsData: LocationPhotos[] = [
  {
    id: "prague",
    name: "Prague",
    region: "Europe",
    country: "Czech Republic",
    photoCount: 61,
    description: "Romantic fairytale city with golden hour magic",
    hero: "/images/revelations/Prague - Czech Republic/0d73fbe7-c3c7-4a77-95ad-c83a9180162c_rw_1920.jpg",
    photos: generatePhotoList("Prague - Czech Republic", [
      "09547910-f875-47b0-a685-78ad5115df91_rw_1920.jpg",
      "0a2f56f8-746b-4dcc-9dc8-573e5e1081f2_rw_1920.jpg",
      "0a5511e8-2b1d-4eb0-aed6-fb281de99e39_rw_1920.jpg",
      "0aacb3ca-c89a-43e6-be9e-ae02de5086ca_rw_1920.jpg",
      "0d73fbe7-c3c7-4a77-95ad-c83a9180162c_rw_1920.jpg",
      "12c603ae-f81e-473f-a5d7-4db2c835b796_rw_1920.jpg",
      "12da71d3-3833-41cc-be92-57012f4f8244_rw_1920.jpg",
      "148df17b-8c4f-4f23-a17b-029fe8873006_rw_1920.jpg",
      "152d6a4b-e609-45ec-ade9-11ea9057c70d_rw_1920.jpg",
      "1570d6d3-bf40-42fd-8a94-e777ec36309d_rw_1920.jpg",
      "15dced77-b658-4720-829c-af18c0ac4961_rw_1920.jpg",
      "19ae8683-e1f6-4c5c-8194-26ab2f9c166d_rw_1920.jpg",
      "1e312c93-a651-4e23-8c63-ba9ca9c96989_rw_1920.jpg",
      "234e2475-0a2b-41ec-8d47-13ebcfa22e14_rw_1920.jpg",
      "264aaf77-b954-46ef-b117-4fcc986302c1_rw_1920.jpg",
      "27565e82-a1e8-49f5-a13b-8efed9fce13c_rw_1920.jpg",
      "2a890a4b-f172-42a6-8bf5-980c06e73829_rw_1920.jpg",
      "2e9f71b1-21c3-45b9-a205-d7210f942dd1_rw_1920.jpg",
      "34df884d-7cd4-41c4-90e2-81d9e18c4dcb_rw_1920.jpg",
      "35e5e3fe-ae38-439f-bfd0-ee1559f3f5ab_rw_1920.jpg",
      "3b539bcb-9597-474d-a07f-caabb8fa4861_rw_1920.jpg",
      "486e77ad-306e-440f-ba77-80e6596d1b83_rw_1920.jpg",
      "4979774f-e295-4359-9ad5-b09dedde50c6_rw_1920.jpg",
      "4eb47576-7fc3-4627-adc7-2e6541dca532_rw_1920.jpg",
      "51031333-d869-4151-9a44-ee21c81f7cca_rw_1920.jpg",
      "547ad0ce-4f6e-4688-a3af-4c9c6617fcc3_rw_1920.jpg",
      "57a96926-4a46-459e-9d2e-526e3312ac39_rw_1920.jpg",
      "5d40be87-a820-4c05-91fb-c858fd0eafee_rw_1920.jpg",
      "604c5677-9433-4bfb-9165-e4454d53c11c_rw_1920.jpg",
      "6d747211-dd4e-43ce-b93b-e306ba259f5e_rw_1200.jpg",
      "6f0a21b7-b08c-4ed4-a5db-95172b083b33_rw_1920.jpg",
      "6f8c8cc4-9d55-4069-9d3b-7317e7b06cd9_rw_1920.jpg",
      "7a6c6682-f0fe-49e7-8b39-2615cb6ffffd_rw_1920.jpg",
      "7ef9503f-c814-4d67-a56c-127d2ff46e7b_rw_1920.jpg",
      "8167aa09-0b49-4c24-b1e5-b672c191a392_rw_1920.jpg",
      "87cf12bf-ede2-44b2-8459-cd1ecc00ea9d_rw_1920.jpg",
      "894e0251-d83c-4297-8ce8-8b0491d4fbb6_rw_1920.jpg",
      "8996c2b9-3333-47f9-a37a-6a54d0bb7bf5_rw_1920.jpg",
      "90209b49-071a-46f1-80c3-9ebf358fec8a_rw_1920.jpg",
      "902db350-51ff-46cc-9289-e4b88285d814_rw_1920.jpg",
      "932bb26f-fdec-4656-a361-03e4888f8de1_rw_1920.jpg",
      "95153db3-7415-4159-a025-39cb9b11177e_rw_1920.jpg",
      "999f9118-26cb-430b-a725-4f7c0c3716a8_rw_1920.jpg",
      "9ab968c4-ffbc-492e-bbee-73a347d5752b_rw_1920.jpg",
      "9ba595cc-aca3-4409-a6e8-bc4b0d4f5d1c_rw_1920.jpg",
      "a88e70d4-4859-4102-8c7d-ddbdfe0f2f01_rw_1920.jpg",
      "ab500970-8eaa-4c01-a705-cd4204a7e1d9_rw_1920.jpg",
      "b25ac9ae-a973-4533-be7a-0d5e074136ce_rw_1920.jpg",
      "b3cd9e8f-b551-48e1-b440-3723b87eaf04_rw_1920.jpg",
      "c2c501f8-bb40-4b97-b4c8-606b022e8196_rw_1920.jpg",
      "c3bb5c12-326c-41e7-8ecf-40c4c1951d6a_rw_1920.jpg",
      "cf954084-67e1-4b11-8dc5-56c7e0cde6ca_rw_1920.jpg",
      "d8995e0e-9c93-429a-93b8-778566db293e_rw_1920.jpg",
      "de4a49a9-bb4e-40c0-bbc2-62b23d62958e_rw_1920.jpg",
      "e25cb4b3-3b3c-421c-8c1e-0dca7eab02a9_rw_1920.jpg",
      "e4a3f355-6d9a-4047-8587-1f400790b792_rw_1920.jpg",
      "f25fa3f7-4606-4da8-bf58-d6c60d804f10_rw_1920.jpg",
      "f3327f3a-6adc-4109-9627-c0c045aeca2d_rw_1920.jpg",
      "f39a4ae7-b6e4-430d-89e6-9094add624b9_rw_1920.jpg",
    ]),
  },
  // We'll add other locations as simplified versions for now
  {
    id: "oslo",
    name: "Oslo",
    region: "Europe",
    country: "Norway",
    photoCount: 53,
    description: "Nordic minimalism and seasonal contrasts",
    hero: "/images/revelations/Oslo, Norway/404cc4bc-ab10-4b49-aff2-d41e84a7e91a_rw_1920.jpg",
    photos: [], // Will be populated via file system scan on load
  },
];
