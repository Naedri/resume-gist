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
    <section className="contacts-container flow">
      <h3 className="section-title">
        {age || location ? t("section.personal") : t("section.contact")}
      </h3>
      <SkeletonLoader loading={loading} lines={4}>
        <ul className="contact-list stack stack-s">
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
              <div>
                <Icon type="location" />
                <span>
                  {location.city ?? location.postalCode ?? location.region}
                </span>
              </div>
            </li>
          )}
          {age && (
            <li className="contact-item">
              <div>
                <Icon type="user" />
                <span>{t("basics.age", { age })}</span>
              </div>
            </li>
          )}
        </ul>
      </SkeletonLoader>
    </section>
  );
};
