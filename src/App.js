function Header() {
  return (
  <div class="page-header">
      <div class="head1">
        <button id="sidenav">&#9776;</button>
      </div>
      <div class="head2">
        <h1>Lotion</h1>
        <p style={{color:'#660f66'}}>Like Notion, but worse.</p>
      </div>
      <div class="head3"></div>
  </div>
  );
}

function Column1() {
  return (
    <div class="note-head">
      <h1>Notes</h1>
      <button id="sidenav">&#43;</button>
    </div>
  );
}

function Column2() {
  return <p>Col2</p>
}

function Main() {
  return (
    <main>
      <div class="column1">
        <Column1 />
      </div>
      <div class="column2">
        <Column2 />
      </div>
    </main>
  );
}

function App() {
  return (
    <div className="App">
    <Header />
    <Main />
    </div>
  );
}

export default App;
