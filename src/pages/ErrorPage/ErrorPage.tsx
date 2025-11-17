import styles from "./styles.module.scss"

export const ErrorPage = () => {
  const reloadPage = () => {
    window.location.reload()
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <p>Произошла непредвиденная ошибка</p>
        <button onClick={reloadPage}>Обновить страницу</button>
      </div>
    </div>
  )
}
