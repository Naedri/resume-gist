import type { ContactType } from "@/types";
import { useTranslation } from "react-i18next";
import { Icon } from "@/components";

export interface ContactListProps extends ContactType {
  age?: number;
}

export const ContactList = ({
  age,
  location,
  phone,
  email,
  github
}: ContactListProps) => {
  const { t } = useTranslation();
  return (
    <section>
      <h3 className="section-title">{t("section.contact")}</h3>
      <ul className="contact-list">
        {age && (
          <li className="contact-item">
            <Icon type="user" />
            <span>{t("basics.age", { age })}</span>
          </li>
        )}
        <li className="contact-item">
          <Icon type="location" />
          <span>{location}</span>
        </li>
        <li className="contact-item">
          <a href={`tel:${phone}`}>
            <Icon type="phone" />
            <span>{phone}</span>
          </a>
        </li>
        <li className="contact-item">
          <a href={`mailto:${email}`}>
            <Icon type="mail" />
            <span>{email}</span>
          </a>
        </li>
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
      </ul>
    </section>
  );
};
