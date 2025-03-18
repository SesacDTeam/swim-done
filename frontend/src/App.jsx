import imagePath from './utils/staticImagePath';

function App() {
  return (
    <>
      {Object.keys(imagePath).map((key) => {
        <img src={imagePath[key]} alt="" />;
      })}
    </>
  );
}

export default App;
