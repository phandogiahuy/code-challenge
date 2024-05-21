import FormComponent from "./components/Form";

function App() {
  return (
    <div className="bg-gradient-to-r from-fuchsia-600 to-pink-600 h-screen flex items-center flex-col">
      <p className="mt-28 text-slate-100 text-6xl font-serif">
        Swap anytime, anywhere, anycurrency
      </p>
      <FormComponent/>
    </div>
  );
}

export default App;
