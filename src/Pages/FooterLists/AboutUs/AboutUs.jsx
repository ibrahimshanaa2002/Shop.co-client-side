import React from "react";
import "./AboutUs.css";
import fashionimg from "../../../assets/Footer/fashion.jpg";
import { MdHighQuality } from "react-icons/md";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { MdLocalConvenienceStore } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="responsive-container-block bigContainer">
      <div className="responsive-container-block Container">
        <div className="imgContainer">
          <img
            className="blueDots"
            src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/aw3.svg"
            alt=""
          />
          <img alt="" className="mainImg" src={fashionimg} />
        </div>
        <div className="responsive-container-block textSide">
          <p className="text-blk heading">About Us</p>
          <p className="text-blk subHeading text-justify">
            Welcome to SHOP.CO, where fashion meets convenience! We offer a
            carefully curated collection of trendy, stylish, and affordable
            clothing, bringing the latest fashion trends straight from the
            runway to your wardrobe. Our mission is to make shopping enjoyable
            and effortless, with user-friendly navigation, secure payment
            options, and fast shipping. Whether you're seeking the perfect
            outfit for a casual day out or a special occasion, we've got you
            covered. With competitive prices and a commitment to quality, we
            believe everyone deserves to look and feel their best without
            breaking the bank. Join our fashion-forward community today and
            discover the joy of shopping online with SHOP.CO. Your style journey
            starts here!
          </p>
          <div className="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
            <div className="cardImgContainer">
              <MdHighQuality className="text-3xl" />
            </div>
            <div className="cardText">
              <p className="text-blk cardHeading">Quality</p>
              <p className="text-blk cardSubHeading">
                We prioritize top-notch materials and craftsmanship to ensure
                your wardrobe stands the test of time.
              </p>
            </div>
          </div>
          <div className="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
            <div className="cardImgContainer">
              <GiClothes className="text-3xl" />
            </div>
            <div className="cardText">
              <p className="text-blk cardHeading">Affordability</p>
              <p className="text-blk cardSubHeading">
                Offering trendy styles at accessible prices, we believe fashion
                should be accessible to all.
              </p>
            </div>
          </div>
          <div className="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
            <div className="cardImgContainer">
              <MdLocalConvenienceStore className="text-3xl" />
            </div>
            <div className="cardText">
              <p className="text-blk cardHeading">Convenience</p>
              <p className="text-blk cardSubHeading">
                With easy navigation and seamless transactions, we strive to
                make your shopping experience hassle-free.
              </p>
            </div>
          </div>
          <div className="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
            <div className="cardImgContainer">
              <SiHomeassistantcommunitystore className="text-3xl" />
            </div>
            <div className="cardText">
              <p className="text-blk cardHeading">Community</p>
              <p className="text-blk cardSubHeading">
                Join our fashion-forward community where creativity and
                individuality are celebrated, creating a vibrant space for style
                enthusiasts.
              </p>
            </div>
          </div>
          <Link to={"/"}>
            <button className="explore bg-black text-white p-3 hover:bg-orange-500 duration-300 transition ease-in-out rounded-3xl">
              Explore our Services
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
