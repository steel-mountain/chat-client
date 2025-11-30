import { useNavigate } from "react-router-dom"
import { Button } from "../../shared/ui"
import styles from "./styles.module.scss"

export const Notfound = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Page not found</h1>
      <Button onClick={() => navigate("/")}>Go to main page </Button>
    </div>
  )
}
