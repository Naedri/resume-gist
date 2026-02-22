import type { BasicType } from "@/types";
import { useTranslation } from "react-i18next";
import { Icon, SkeletonLoader } from "@/components";

export interface ContactListProps extends BasicType {
  loading: boolean;
}

export const ContactList = ({
  age,
  location,
  phone,
  email,
  profiles,
  loading
}: ContactListProps) => {
  const { t } = useTranslation();
  const github = profiles?.find((p) => p.network == "GitHub");
  const linkedin = profiles?.find((p) => p.network == "LinkedIn");
  return (
    <section className="contacts-container">
      <h3 className="section-title">{t("section.contact")}</h3>
      <SkeletonLoader loading={loading} lines={4}>
        <ul className="contact-list">
          {email && (
            <li className="contact-item">
              <a href={`mailto:${email}`}>
                <Icon type="mail" />
                <span>{email}</span>
              </a>
            </li>
          )}
          {phone && (
            <li className="contact-item">
              <a href={`tel:${phone.replaceAll(" ", "")}`}>
                <Icon type="phone" />
                <span>{phone}</span>
              </a>
            </li>
          )}
          {linkedin && (
            <li className="contact-item">
              <a href={linkedin.url} target="_blank" rel="noopener noreferrer">
                <Icon type="redirection" />
                <span>{linkedin.username}</span>
              </a>
            </li>
          )}
          {github && (
            <li className="contact-item">
              <a href={github.url} target="_blank" rel="noopener noreferrer">
                <Icon type="redirection" />
                <span>{github.username}</span>
              </a>
            </li>
          )}
          {location && (
            <li className="contact-item">
              <Icon type="location" />
              <span>
                {location.city ?? location.postalCode ?? location.region}
              </span>
            </li>
          )}
          {age && (
            <li className="contact-item">
              <Icon type="user" />
              <span>{t("basics.age", { age })}</span>
            </li>
          )}
        </ul>
      </SkeletonLoader>
    </section>
  );
};
