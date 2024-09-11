const getUserCountry = async () => {
  try {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    localStorage.setItem("country", data.country.toLowerCase());
    return data.country.toLowerCase();
  } catch (error) {
    console.error("Error detecting country:", error);
    return null;
  }
};

await getUserCountry();

// const setName = (country: string) => {
//   localStorage.setItem("countryName", country);
// };

const getCountry = () => {
  let country;
  switch (localStorage.getItem("country")) {
    case "se":
      country = "Sweden";
      break;
    case "pt":
      country = "Portugal";
      break;
    case "en":
      country = "United Kingdom";
      break;
    case "fr":
      country = "France";
      break;
    case "de":
      country = "Germany";
      break;
  }

  return country;
};

export default { getCountry, getUserCountry };
