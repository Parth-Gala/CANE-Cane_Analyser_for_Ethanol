import React, { useEffect} from "react";
// import axios from "axios";
// import Navbar from "../components/Navbar.jsx";
import roadmap from "../assets/roadmap_sugarncane_ethanol.png";
import img2 from "../assets/sugarcane2.png";
import Banner from "../assets/Banner.jpg";
import logo from "../assets/logo.png";
// import { FiMail, FiSend } from "react-icons/fi";
import {
  FaWhatsapp,
  FaGithub,
} from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
const App = () => {
  // const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.post('/trial');
        // console.log('Response:', response);
        // setData(response.data);
      } catch (error) {
        // console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
      {/* <Navbar /> */}
      <div className=" mb-6 mx-2">
        <div className="relative flex justify-center overflow-hidden bg-black border-black rounded-2xl z-0">
          <img
            src={Banner}
            alt="Banner"
            className="overflow-hidden border border-black rounded-2xl opacity-50"
            style={{ objectFit: "cover", width: "100%", height: "500px" }}
          />
          <div className="absolute justify-center self-center text-white lg:text-4xl text-2xl m-8">
            <div className="text-center">
              Analysing the sugarcane fields {" "}
            </div>
            <div className=" text-center">
              and ethanol production in India
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-0 sml:mx-5">
        <div className="flex flex-col items-center justify-center">
          <img
            src={roadmap}
            alt="Sugarcane"
            className="rounded-lg w-full mb-4"
          />
        </div>
        <div className=" flex-col justify-center content-center">
          <p className="text-lg mb-4 font-semibold text-center">
            Sugarcane: From Fields to Fuel
          </p>
          <p className="text-sm text-justify px-0 sml:px-5">
            Sugarcane is a tall, perennial grass that is grown in tropical and
            subtropical regions around the world. It is the world's leading
            source of sugar, and is used to produce table sugar, molasses, and
            biofuel. India is the world's number one producer of sugarcane.
            Uttar Pradesh is the largest producer of sugarcane in India,
            followed by Maharashtra and Karnataka. Uttar Pradesh, Maharashtra,
            and Karnataka together produce around 80% of the sugarcane in India.
            Maharashtra is a key player in India's sugarcane story, ranking
            second in national production. Estimates suggest Maharashtra
            produces around 123.97 million tonnes of sugarcane as of 2022-23.
          </p>
        </div>
        <div className=" flex-col justify-center content-center">
          <p className="text-lg mb-4 font-semibold text-center">
            Ethanol: A Biofuel on the Rise
          </p>
          <p className="text-sm text-justify px-0 sml:px-2">
            Ethanol burns cleaner than gasoline, potentially leading to lower
            air pollution levels in cities like Delhi and Mumbai. The ethanol
            production capacity in the country is about 1380 crore litres out of
            which about 875 crore litres is molasses based and about 505 crore
            litres is grain based. Pure ethanol is a colourless flammable liquid
            (boiling point 78.5 °C [173.3 °F]) with an agreeable ethereal odour
            and a burning taste. Ethanol can be blended with gasoline to create
            a cleaner-burning fuel for vehicles, potentially reducing greenhouse
            gas emissions. Ethanol has antiseptic properties and is used in
            disinfectants and sanitizers. It can also be found in some medical
            wipes and solutions.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <img src={img2} alt="Ethanol" className="rounded-lg w-full mb-4" />
        </div>
      </div>

      <footer className=" bg-gray-200 mt-5 ">
        <div className=" w-full py-6 lg:py-8 p-3">
          <div className="md:flex md:justify-between">
            <div className="w-full md:w-1/4 mr-20">
              <div className="mb-6 md:mb-10">
                <a href="/" className="flex items-center">
                  <img src={logo} className="h-10 me-3" alt="FlowBite Logo" />
                  <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-800">
                    CANE
                  </span>
                </a>
              </div> 
              <div className="mb-4 flex flex-col xl:flex-row gap-3 justify-between">
                <h2 className="my-4 ml-4 text-sm font-semibold uppercase text-gray-800">
                  Follow us
                </h2>
                <div className="flex gap-4">
                  <span className="bannerIcon">
                    <FaWhatsapp
                      onClick={() =>
                        window.open(
                          "https://wa.me/+919819615731?text=Hi%20Parth,%20I%20would%20like%20to%20connect%20with%20you."
                        )
                      }
                    />
                  </span>                  
                  <span className="bannerIcon">
                    <FaGithub
                      onClick={() =>
                        window.open("https://github.com/Parth-Gala")
                      }
                    />
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-3/4 flex justify-between ">
              <div class=" flex justify-between ">
                <div className="grid grid-cols-2">
                  <div className="mx-4 ">
                    <h2 class="mb-6 text-sm font-semibold uppercase text-gray-800">
                      Contact
                    </h2>
                    <ul class="text-gray-500 dark:text-gray-400 font-medium">
                      <li class="mb-4">
                        <a
                          href="/"
                          class="hover:underline"
                        >
                          PMPS@gmail.com
                        </a>
                      </li>
                      <li className=" underline">+919819494333</li>
                      <li className="">
                        <FaHouse className="inline" />
                        KJSCE, Vidyavihar, Mumbai
                      </li>
                    </ul>
                  </div>

                  <div className=" mx-4">
                    <h2 class="mb-6 text-sm font-semibold text-gray-800 uppercase ">
                      Legal
                    </h2>
                    <ul class="text-gray-500 dark:text-gray-400 font-medium">
                      <li class="mb-4">
                        <a href="/" class="hover:underline">
                          Privacy Policy
                        </a>
                      </li>
                      <li class="mb-4">
                        <a href="/" class="hover:underline">
                          FAQ
                        </a>
                      </li>
                      <li>
                        <a href="/" class="hover:underline">
                          Terms &amp; Conditions
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div class="sm:flex sm:items-center sm:justify-center">
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2024{" "}
              <a href="https://github.com/Parth-Gala" class="hover:underline">
                Parth Gala™
              </a>
              . All Rights Reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
