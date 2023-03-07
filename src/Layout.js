import Header from "./Header";
import Main from "./Main";

function Layout({sideButton, toggleColumn1}) {
  return (
    <>
        <div>
            <Header sideButton={sideButton}/>
            <div>
                <Main toggleColumn1={toggleColumn1}/>
            </div>
        </div>
    </>
  );
}

export default Layout;