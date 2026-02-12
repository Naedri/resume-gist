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
  return (
    <section className="contacts-container">
      <h3 className="section-title">{t("section.contact")}</h3>
      <SkeletonLoader loading={loading} lines={4}>
        <ul className="contact-list">
          {age && (
            <li className="contact-item">
              <Icon type="user" />
              <span>{t("basics.age", { age })}</span>
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
          {phone && (
            <li className="contact-item">
              <Icon type="phone" />
              <a href={`tel:${phone}`}>
                <span>{phone}</span>
              </a>
            </li>
          )}
          {email && (
            <li className="contact-item">
              <Icon type="mail" />
              <a href={`mailto:${email}`}>
                <span>{email}</span>
              </a>
            </li>
          )}
          {github && (
            <li className="contact-item">
              <Icon type="github" />
              <a href={github.url} target="_blank" rel="noopener noreferrer">
                <span>{github.username}</span>
              </a>
            </li>
          )}
        </ul>
      </SkeletonLoader>
    </section>
  );
};
