import FormComponent from "./components/Form";

function App() {
  return (
    <div className=" h-screen flex items-center flex-col" style={{background:"url(/public/bg.jpg)",backgroundSize:"cover"}}>
      <p className="mt-28 text-slate-100 text-6xl font-serif ">
        Swap anytime, anywhere, anycurrency
      </p>
      <FormComponent/>
    </div>
  );
}

export default App;

//bg-gradient-to-r from-fuchsia-600 to-pink-600
