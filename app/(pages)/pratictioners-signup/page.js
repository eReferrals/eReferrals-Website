"use client";
import styles from "./practictioner-signup.module.css";
import Image from "next/image";
import {
  ChevronRightIcon,
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import RecommendationSection from "../../../views/practictioner/RecommendationSection";
// import Faq from "../../../components/Faq";
import Faq from "../../../components/faq/Faq";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { fetchHomeFAQs, fetchTestimonials } from "../../../lib/fetchData";

const PratictionersPage = () => {
  const [activeTab, setActiveTab] = useState("practitioners");
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm();

  const [faqs, setFaqs] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const getTestimonials = async () => {
      const fetchedTestimonials = await fetchTestimonials();
      setTestimonials(fetchedTestimonials);
    };

    getTestimonials();
  }, []);

  useEffect(() => {
    const getFAQs = async () => {
      const fetchedFAQs = await fetchHomeFAQs();
      setFaqs(fetchedFAQs);
    };

    getFAQs();
  }, []);

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  const onSubmit = async (formData) => {
    try {
      const data = {
        ...formData,
        "signup-as": activeTab,
      };

      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Form successfully submitted!");
        reset({
          name: "",
          phone: "",
          email: "",
          "signup-consent": false,
        });
        // router.push("/success");
      } else {
        toast.error("Error submitting form");
      }
    } catch (error) {
      toast.error("Submission failed");
    }
  };

  return (
    <>
      <section className={styles.signupContainer}>
        <div className={styles.signupContent}>
          <div className={styles.header}>
            <div className={styles.branding}>
              <Image
                width={316}
                height={67}
                src="/logo.svg"
                alt="eReferrals Logo"
              />
            </div>
            <div className={styles.signupSection}>
              <p>Sign up for</p>
              <p>BETA VERSION</p>
            </div>
          </div>
          <div className={styles.toggleButtons}>
            <button
              className={`${styles.toggleBtn} ${
                activeTab === "practitioners" ? styles.active : ""
              }`}
              aria-pressed={activeTab === "practitioners"}
              onClick={() => toggleTab("practitioners")}
            >
              For Practitioners
            </button>
            <button
              className={`${styles.toggleBtn} ${
                activeTab === "patients" ? styles.active : ""
              }`}
              aria-pressed={activeTab === "patients"}
              onClick={() => toggleTab("patients")}
            >
              For Patients
            </button>
          </div>
          <div className={styles.container}>
            <form
              className={styles.signupForm}
              name="signup-for-beta-version"
              method="POST"
              data-netlify="true"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                type="hidden"
                name="signup-for-beta-version"
                value="signup-for-beta-version"
              />
              <input
                type="hidden"
                name="signup-as"
                value={activeTab}
                {...register("signup-as", { required: true })}
              />
              <div className={styles.inputGroup}>
                <div className={styles.inputContainer}>
                  <UserIcon className={styles.inputIcon} />
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    className={styles.inputField}
                    required
                    {...register("name", { required: true })}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <PhoneIcon className={styles.inputIcon} />
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    className={styles.inputField}
                    required
                    {...register("phone", { required: true })}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <EnvelopeIcon className={styles.inputIcon} />
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    className={styles.inputField}
                    required
                    {...register("email", { required: true })}
                  />
                </div>
              </div>
              <div className={styles.formFooter}>
                <div className={styles.consent}>
                  <input
                    type="checkbox"
                    id="signup-consent"
                    name="signup-consent"
                    value="Agree"
                    {...register("signup-consent", { required: true })}
                    required
                  />
                  <label htmlFor="signup-consent">
                    I agree with the storage & processing of my personal data
                  </label>
                </div>
                <div className={styles.links}>
                  <Link className={styles.link} href="/">
                    Terms
                  </Link>
                  <span>|</span>
                  <Link className={styles.link} href="/privacy">
                    Privacy
                  </Link>
                </div>
                <button
                  type="submit"
                  className={`${styles.submitButton}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Get Started"}
                  <ChevronRightIcon className="btn-icon" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <RecommendationSection testimonials={testimonials} />

      <Faq faqs={faqs} />
    </>
  );
};

export default PratictionersPage;
