import s from "./index.module.scss";

export const Footer: React.FC = () => {
  return (
    <div className={`${s.footer} footer`}>
      <p className={s.footerCopy}>© 2025 Spa Групп. Все права защищены.</p>
    </div>
  );
};
