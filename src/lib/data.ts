export const countries = ["United States", "Republic of the Marshall Islands"];

export const imagesRocket = [
  "https://images-cdn.ubuy.ae/634d1b845106304ba32f191d-echo-toys-spaceship-rocket-set-5-piece.jpg",
  "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2019/06/europe_s_rockets/19421217-6-eng-GB/Europe_s_rockets_pillars.jpg",
];

export const randomString = (data: any) => {
  let result = "";
  while (result.length < data) {
    result += Math.random().toString(16).substring(2);
  }
  return result.substring(0, data);
};
