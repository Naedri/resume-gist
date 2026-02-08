import type { ContactType } from "@/types";
import { useTranslation } from "react-i18next";
import { Icon, SkeletonLoader } from "@/components";

export interface ContactListProps extends ContactType {
  age?: number;
  loading: boolean;
}

export const ContactList = ({
  age,
  location,
  phone,
  email,
  github,
  loading
}: ContactListProps) => {
  const { t } = useTranslation();
  return (
    <section>
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
              <span>{location}</span>
            </li>
          )}
          {phone && (
            <li className="contact-item">
              <a href={`tel:${phone}`}>
                <Icon type="phone" />
                <span>{phone}</span>
              </a>
            </li>
          )}
          {email && (
            <li className="contact-item">
              <a href={`mailto:${email}`}>
                <Icon type="mail" />
                <span>{email}</span>
              </a>
            </li>
          )}
          {github && (
            <li className="contact-item">
              <a
                href={`https://github.com/${github}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon type="github" />
                <span>{github}</span>
              </a>
            </li>
          )}
        </ul>
      </SkeletonLoader>
    </section>
  );
};
