import styles from "./Menu.module.scss";
import img from "../../images/icons/icon-img.svg";
import doc from "../../images/icons/icon-doc.svg";
import { memo, useRef } from "react";

interface IMenuProps {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu: React.FC<IMenuProps> = memo(
  ({ setFile, setOpenModal, setOpenMenu }) => {
    const photoRef = useRef<HTMLInputElement>(null);
    const documentRef = useRef<HTMLInputElement>(null);

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
          <li
            className={styles.item}
            // onClick={() => documentRef.current?.click()}
          >
            <img className={styles.img} src={doc} alt="icon" />
            <span>File</span>
            <input
              type="file"
              ref={documentRef}
              onChange={handleFileChange}
              className={styles.fileInput}
            />
          </li>
        </ul>
      </>
    );
  }
);

export default Menu;
