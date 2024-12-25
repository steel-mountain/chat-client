import { FC, memo, useRef } from "react";
import styles from "./styles.module.scss";
import img from "../../shared/images/icons/icon-img.svg";

interface MenuProps {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Menu: FC<MenuProps> = memo((props) => {
  const { setFile, setOpenModal, setOpenMenu } = props;

  const photoRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setOpenModal(true);
      setOpenMenu(false);
    }
  };

  return (
    <>
      <ul className={styles.items}>
        <li className={styles.item} onClick={() => photoRef.current?.click()}>
          <img className={styles.img} src={img} alt="icon" />
          <span>Photo</span>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            ref={photoRef}
            onChange={handleFileChange}
            className={styles.fileInput}
          />
        </li>
      </ul>
    </>
  );
});
