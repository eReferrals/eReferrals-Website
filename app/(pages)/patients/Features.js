import React from "react";
import styles from "./Features.module.css";
import Image from "next/image";
import { urlForImage } from "../../../sanity/lib/image";
import { PortableText } from "@portabletext/react";


const Features = ({ data, benefits }) => {
  return (
    <div className={styles.featuresContainer}>
      <div className={styles.textContainer}>
        <h2 className={styles.title}>
          {/* {data.title} */}
          <PortableText value={data.title} />
          </h2>
        <p className={styles.description}>
          {/* {data.description} */}
          <PortableText value={data.description} />
          </p>
      </div>
      <div className={styles.imageContainer}>
        <Image
          src={"/patient/app-features.svg"}
          fill
          alt=""
          className={styles.featuresImage}
        />
      </div>
      <div className={styles.featuresSection}>
        {benefits.map((benefit, index) => (
          <div key={index} className={styles.feature}>
            <Image
              width={30}
              height={30}
              // src="/icons/dashboard.svg"
              src={urlForImage(benefit?.icon)}
              alt="Easy management"
            />
            <PortableText value={benefit.title} />
            {/* <p>{benefit.title}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
