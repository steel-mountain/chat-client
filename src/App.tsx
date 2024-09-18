import Pages from "./pages";
import "./styles/index.scss";
import { useTheme } from "./theme/useTheme";

function App(): JSX.Element {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <Pages />
    </div>
  );
}

export default App;
